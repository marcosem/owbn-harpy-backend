import * as Yup from 'yup';
import Status from '../models/Status';

class StatusController {
  async index(req, res) {
    const { type, sort } = req.query;
    const where = req.params.id ? { id: `${req.params.id}` } : {};

    if (type) {
      switch (type) {
        case 'negative': {
          where.is_negative = true;
          break;
        }
        case 'positive': {
          where.is_negative = false;
          break;
        }
        default:
      }
    }

    const sortOrder = sort === 'pt' ? 'title_pt' : 'title_en';

    const status = await Status.findAll({
      where,
      order: [sortOrder],
      attributes: ['id', 'title_en', 'title_pt', 'is_negative', 'notes'],
    });

    return res.json(status);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title_en: Yup.string().required(),
      title_pt: Yup.string().required(),
      is_negative: Yup.boolean(),
      notes: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const { title_en, title_pt, is_negative, notes } = req.body;

    const status = await Status.create({
      title_en,
      title_pt,
      is_negative: is_negative || false,
      notes: notes || '',
    });

    return res.json(status);
  }

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

    // Only superuser can execute this command
    if (!req.superUser) {
      if (status.id <= 60) {
        return res.status(401).json({ error: 'Permission Denied!' });
      }
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

    // Only superuser can execute this command
    if (!req.superUser) {
      if (status.id <= 60) {
        return res.status(401).json({ error: 'Permission Denied!' });
      }
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
}

export default new StatusController();
