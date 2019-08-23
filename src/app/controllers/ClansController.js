import * as Yup from 'yup';
import Clans from '../models/Clans';
import Files from '../models/Files';

class ClansController {
  async index(req, res) {
    const { sort } = req.query;
    const where = req.params.id ? { id: `${req.params.id}` } : {};

    const sortOrder = sort === 'pt' ? 'clan_pt' : 'clan_en';

    const clans = await Clans.findAll({
      where,
      order: [sortOrder],
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
    });

    return res.json(clans);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      clan_en: Yup.string().required(),
      clan_pt: Yup.string().required(),
      clan_short_name_en: Yup.string(),
      clan_short_name_pt: Yup.string(),
      clan_logo: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const {
      clan_en,
      clan_pt,
      clan_short_name_en,
      clan_short_name_pt,
      clan_logo,
    } = req.body;

    const clan = await Clans.create({
      clan_en,
      clan_pt,
      clan_short_name_en: clan_short_name_en || '',
      clan_short_name_pt: clan_short_name_pt || '',
      clan_logo: clan_logo || null,
    });

    return res.json(clan);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      clan_en: Yup.string(),
      clan_pt: Yup.string(),
      clan_short_name_en: Yup.string(),
      clan_short_name_pt: Yup.string(),
      clan_logo: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const clan = await Clans.findByPk(req.params.id);

    if (!clan) {
      return res.status(400).json({ error: 'Clan not found!' });
    }

    const {
      clan_en,
      clan_pt,
      clan_short_name_en,
      clan_short_name_pt,
      clan_logo,
    } = req.body;

    await clan.update({
      clan_en: !clan_en ? clan.clan_en : clan_en,
      clan_pt: !clan_pt ? clan.clan_pt : clan_pt,
      clan_short_name_en: !clan_short_name_en
        ? clan.clan_short_name_en
        : clan_short_name_en,
      clan_short_name_pt: !clan_short_name_pt
        ? clan.clan_short_name_pt
        : clan_short_name_pt,
      clan_logo: !clan_logo ? clan.clan_logo : clan_logo,
    });

    return res.json(clan);
  }

  async delete(req, res) {
    const clan = await Clans.findByPk(req.params.id);

    if (!clan) {
      return res.status(400).json({ error: 'Status not found!' });
    }

    await Clans.destroy({ where: { id: req.params.id } }).then(
      deletedRecord => {
        if (deletedRecord === 1) {
          return res.status(200).json({ message: 'Deleted successfully' });
        }
        return res.status(404).json({ error: 'Status not found' });
      }
    );

    return res.status(200);
  }
}

export default new ClansController();
