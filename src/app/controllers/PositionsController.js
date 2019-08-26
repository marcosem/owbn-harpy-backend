import * as Yup from 'yup';
import Positions from '../models/Positions';

class PositionsController {
  async index(req, res) {
    const { sort } = req.query;
    const where = req.params.id ? { id: `${req.params.id}` } : {};

    const sortOrder = sort === 'pt' ? 'position_pt' : 'position_en';

    const positions = await Positions.findAll({
      where,
      order: [sortOrder],
      attributes: ['id', 'position_en', 'position_pt'],
    });

    return res.json(positions);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      position_en: Yup.string().required(),
      position_pt: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const { position_en, position_pt } = req.body;

    const position = await Positions.create({
      position_en,
      position_pt,
    });

    return res.json(position);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      position_en: Yup.string(),
      position_pt: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const position = await Positions.findByPk(req.params.id);

    if (!position) {
      return res.status(400).json({ error: 'Position not found!' });
    }

    const { position_en, position_pt } = req.body;

    await position.update({
      position_en: !position_en ? position.position_en : position_en,
      position_pt: !position_pt ? position.position_pt : position_pt,
    });

    return res.json(position);
  }

  async delete(req, res) {
    const position = await Positions.findByPk(req.params.id);

    if (!position) {
      return res.status(400).json({ error: 'Position not found!' });
    }

    await Positions.destroy({ where: { id: req.params.id } }).then(
      deletedRecord => {
        if (deletedRecord === 1) {
          return res.status(200).json({ message: 'Deleted successfully' });
        }
        return res.status(404).json({ error: 'Position not found' });
      }
    );

    return res.status(200);
  }
}

export default new PositionsController();
