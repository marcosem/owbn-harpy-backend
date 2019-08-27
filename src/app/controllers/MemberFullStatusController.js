// import { Op } from 'sequelize';
import StatusMember from '../models/StatusMember';
import StatusPosition from '../models/StatusPosition';
import Positions from '../models/Positions';
import Members from '../models/Members';
import Status from '../models/Status';

class MemberFullStatusController {
  async index(req, res) {
    // const where = req.params.id ? { member_id: `${req.params.id}` } : {};
    const member_id = req.params.id;

    const member = await Members.findByPk(member_id);
    if (!member) {
      return res.status(400).json({ error: 'Member not found!' });
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
      attributes: [
        'id',
        'member_id',
        'status_id',
        'giver',
        'reason',
        'date',
        'is_removed',
        'date_removed',
        'reason_removed',
      ],
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
      attributes: [
        'id',
        'member_id',
        'status_id',
        'giver',
        'reason',
        'date',
        'is_removed',
        'date_removed',
        'reason_removed',
      ],
      include: [
        {
          model: Status,
          as: 'status',
          where: { is_negative: true },
          attributes: ['title_en', 'title_pt', 'is_negative', 'notes'],
        },
      ],
    });

    /*
    const statusPenaulty = await StatusMember.findAll({
      where: {
        member_id,
        is_removed: false,
        status_id: { [Op.in]: [48, 55] },
      },
      attributes: ['id', 'member_id', 'status_id'],
      include: [
        {
          model: Status,
          as: 'status',
          where: { is_negative: true },
          attributes: ['id'],
        },
      ],
    });

    const positionPenaulty = await StatusMember.findAll({
      where: {
        member_id,
        is_removed: false,
        status_id: { [Op.in]: [50, 54] },
      },
      attributes: ['id', 'member_id', 'status_id'],
      include: [
        {
          model: Status,
          as: 'status',
          where: { is_negative: true },
          attributes: ['id'],
        },
      ],
    });
   */

    const memberFullStatus = {
      member,
      personalStatus: {
        total: statusMember.length,
        // penaulty: statusPenaulty.length,
        titles: statusMember,
      },
      positionalStatus: {
        total: statusPosition.length,
        // penaulty: positionPenaulty.length > 0 ? statusPosition.length : 0,
        titles: statusPosition,
      },
      negativeStatus: {
        total: statusMemberNegative.length,
        titles: statusMemberNegative,
      },
    };

    return res.json(memberFullStatus);
  }
}

export default new MemberFullStatusController();
