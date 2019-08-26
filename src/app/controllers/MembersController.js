import * as Yup from 'yup';
import Members from '../models/Members';
import Clans from '../models/Clans';
import Positions from '../models/Positions';
import Domains from '../models/Domains';
import Situations from '../models/Situations';

import Files from '../models/Files';

class MembersController {
  async index(req, res) {
    // const { sort } = req.query;
    const where = req.params.id ? { id: `${req.params.id}` } : {};

    // const sortOrder = sort === 'pt' ? 'clan_pt' : 'clan_en';

    const members = await Members.findAll({
      where,
      // order: [sortOrder],
      attributes: [
        'id',
        'kindred_name',
        'mortal_name',
        'genre_en',
        'genre_pt',
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

    return res.json(members);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      kindred_name: Yup.string().required(),
      mortal_name: Yup.string(),
      genre: Yup.number(),
      clan_id: Yup.number(),
      sire_id: Yup.number(),
      position_id: Yup.number(),
      situation_id: Yup.number(),
      domain_id: Yup.number(),
      email: Yup.string().email(),
      note: Yup.string(),
      member_picture: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const {
      kindred_name,
      mortal_name,
      genre,
      clan_id,
      sire_id,
      position_id,
      situation_id,
      domain_id,
      email,
      note,
      member_picture,
    } = req.body;

    const members = await Members.create({
      kindred_name,
      mortal_name: mortal_name || '',
      genre: genre || null,
      clan_id: clan_id || null,
      sire_id: sire_id || null,
      position_id: position_id || null,
      situation_id: situation_id || 2, // Situation Unknow as default
      domain_id: domain_id || null,
      email: email || '',
      note: note || '',
      member_picture: member_picture || (genre === 2 ? 17 : 18),
    });

    return res.json(members);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      kindred_name: Yup.string(),
      mortal_name: Yup.string(),
      genre: Yup.number(),
      clan_id: Yup.number(),
      sire_id: Yup.number(),
      position_id: Yup.number(),
      situation_id: Yup.number(),
      domain_id: Yup.number(),
      email: Yup.string().email(),
      note: Yup.string(),
      member_picture: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const member = await Members.findByPk(req.params.id);

    if (!member) {
      return res.status(400).json({ error: 'Member not found!' });
    }

    const {
      kindred_name,
      mortal_name,
      genre,
      clan_id,
      sire_id,
      position_id,
      situation_id,
      domain_id,
      email,
      note,
      member_picture,
    } = req.body;

    await member.update({
      kindred_name: !kindred_name ? member.kindred_name : kindred_name,
      mortal_name: !mortal_name ? member.mortal_name : mortal_name,
      genre: !genre ? member.genre : genre,
      clan_id: !clan_id ? member.clan_id : clan_id,
      sire_id: !sire_id ? member.sire_id : sire_id,
      position_id: !position_id ? member.position_id : position_id,
      situation_id: !situation_id ? member.situation_id : situation_id,
      domain_id: !domain_id ? member.domain_id : domain_id,
      email: !email ? member.email : email,
      note: !note ? member.note : note,
      member_picture: !member_picture ? member.member_picture : member_picture,
    });

    return res.json(member);
  }

  async delete(req, res) {
    const member = await Members.findByPk(req.params.id);

    if (!member) {
      return res.status(400).json({ error: 'Member not found!' });
    }

    await Members.destroy({ where: { id: req.params.id } }).then(
      deletedRecord => {
        if (deletedRecord === 1) {
          return res.status(200).json({ message: 'Deleted successfully' });
        }
        return res.status(404).json({ error: 'Member not found' });
      }
    );

    return res.status(200);
  }
}

export default new MembersController();
