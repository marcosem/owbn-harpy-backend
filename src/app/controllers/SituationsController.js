import * as Yup from 'yup';
import Situations from '../models/Situations';

class SituationsController {
  async index(req, res) {
    const { sort } = req.query;
    const where = req.params.id ? { id: `${req.params.id}` } : {};

    const sortOrder = sort === 'pt' ? 'situation_pt' : 'situation_en';

    const situations = await Situations.findAll({
      where,
      order: [sortOrder],
      attributes: ['id', 'situation_en', 'situation_pt'],
    });

    return res.json(situations);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      situation_en: Yup.string().required(),
      situation_pt: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const { situation_en, situation_pt } = req.body;

    const situation = await Situations.create({
      situation_en,
      situation_pt,
    });

    return res.json(situation);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      situation_en: Yup.string(),
      situation_pt: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const situation = await Situations.findByPk(req.params.id);

    if (!situation) {
      return res.status(400).json({ error: 'Situation not found!' });
    }

    const { situation_en, situation_pt } = req.body;

    await situation.update({
      situation_en: !situation_en ? situation.situation_en : situation_en,
      situation_pt: !situation_pt ? situation.situation_pt : situation_pt,
    });

    return res.json(situation);
  }

  async delete(req, res) {
    const situation = await Situations.findByPk(req.params.id);

    if (!situation) {
      return res.status(400).json({ error: 'Situation not found!' });
    }

    await Situations.destroy({ where: { id: req.params.id } }).then(
      deletedRecord => {
        if (deletedRecord === 1) {
          return res.status(200).json({ message: 'Deleted successfully' });
        }
        return res.status(404).json({ error: 'Situation not found' });
      }
    );

    return res.status(200);
  }
}

export default new SituationsController();
