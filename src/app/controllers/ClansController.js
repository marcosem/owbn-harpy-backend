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

  /*
  async update(req, res) {
    const schema = Yup.object().shape({
      title_en: Yup.string(),
      title_pt: Yup.string(),
      is_negative: Yup.boolean(),
      notes: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const status = await Status.findByPk(req.params.id);

    if (!status) {
      return res.status(400).json({ error: 'Status not found!' });
    }

    const { title_en, title_pt, is_negative, notes } = req.body;

    await status.update({
      title_en: !title_en ? status.title_en : title_en,
      title_pt: !title_pt ? status.title_pt : title_pt,
      is_negative: !is_negative ? status.is_negative : is_negative,
      notes: !notes ? status.notes : notes,
    });

    return res.json(status);
  }

  async delete(req, res) {
    const status = await Status.findByPk(req.params.id);

    if (!status) {
      return res.status(400).json({ error: 'Status not found!' });
    }

    await Status.destroy({ where: { id: req.params.id } }).then(
      deletedRecord => {
        if (deletedRecord === 1) {
          return res.status(200).json({ message: 'Deleted successfully' });
        }
        return res.status(404).json({ error: 'Status not found' });
      }
    );

    return res.status(200);
  }
  */
}

export default new ClansController();
