// import { Op } from 'sequelize';
import StatusMember from '../models/StatusMember';
import StatusPosition from '../models/StatusPosition';
import Positions from '../models/Positions';
import Files from '../models/Files';
import Members from '../models/Members';
import Status from '../models/Status';
import Clans from '../models/Clans';
import Domains from '../models/Domains';
import Situations from '../models/Situations';

class MemberFullStatusController {
  async index(req, res) {
    // const where = req.params.id ? { member_id: `${req.params.id}` } : {};
    // const { domain_id, clan_id, situation_id } = req.query;
    const member_id = req.params.id;

    const where = member_id ? { id: member_id } : {};

    const member = await Members.findOne({
      where,
      order: ['kindred_name'],
      attributes: [
        'id',
        'kindred_name',
        'mortal_name',
        'genre',
        'genre_en',
        'genre_pt',
        'position_id',
        'domain_id',
        'clan_id',
        'email',
        'note',
      ],
      include: [
        {
          model: Clans,
          as: 'clan',
          attributes: [
            'id',
            'clan_en',
            'clan_pt',
            'clan_short_name_en',
            'clan_short_name_pt',
          ],
          include: [
            {
              model: Files,
              as: 'clan_logo_file',
              attributes: ['id', 'type', 'path', 'url'],
            },
          ],
        },
        {
          model: Members,
          as: 'sire',
          attributes: ['id', 'kindred_name'],
        },
        {
          model: Positions,
          as: 'position',
          attributes: ['id', 'position_en', 'position_pt'],
        },
        {
          model: Domains,
          as: 'domain',
          attributes: ['id', 'name', 'main_city'],
          include: [
            {
              model: Files,
              as: 'picture',
              attributes: ['id', 'type', 'path', 'url'],
            },
          ],
        },
        {
          model: Situations,
          as: 'situation',
          attributes: ['id', 'situation_en', 'situation_pt'],
        },
        {
          model: Files,
          as: 'picture',
          attributes: ['id', 'type', 'path', 'url'],
        },
      ],
    });

    if (!member) {
      return res.json([]);
    }

    const statusPosition = member.position_id
      ? await StatusPosition.findAll({
          where: { position_id: `${member.position_id}` },
          attributes: ['id', 'position_id', 'status_id'],
          include: [
            {
              model: Positions,
              as: 'position',
              attributes: ['position_en', 'position_pt'],
            },
            {
              model: Status,
              as: 'status',
              attributes: ['title_en', 'title_pt'],
            },
          ],
        })
      : null;

    const statusMember = await StatusMember.findAll({
      where: { member_id, is_removed: false },
      attributes: ['id', 'member_id', 'status_id', 'giver', 'reason', 'date'],
      include: [
        {
          model: Status,
          as: 'status',
          where: { is_negative: false },
          attributes: ['title_en', 'title_pt', 'is_negative'],
        },
      ],
    });

    const statusMemberNegative = await StatusMember.findAll({
      where: { member_id, is_removed: false },
      attributes: ['id', 'member_id', 'status_id', 'giver', 'reason', 'date'],
      include: [
        {
          model: Status,
          as: 'status',
          where: { is_negative: true },
          attributes: ['title_en', 'title_pt', 'is_negative', 'notes'],
        },
      ],
    });

    const membersFullStatus = {
      member,
      personalStatus: {
        total: statusMember.length,
        status: statusMember,
      },
      positionalStatus: {
        total: statusPosition.length,
        status: statusPosition,
      },
      negativeStatus: {
        total: statusMemberNegative.length,
        status: statusMemberNegative,
      },
    };

    return res.json(membersFullStatus);
  }
}

export default new MemberFullStatusController();
