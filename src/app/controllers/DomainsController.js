import * as Yup from 'yup';
import Domains from '../models/Domains';
import Files from '../models/Files';

class DomainsController {
  async index(req, res) {
    const { sort } = req.query;
    const where = req.params.id ? { id: `${req.params.id}` } : {};

    const sortOrder = sort === 'city' ? 'main_city' : 'name';

    const domains = await Domains.findAll({
      where,
      order: [sortOrder],
      attributes: ['id', 'name', 'main_city'],
      include: [
        {
          model: Files,
          as: 'picture',
          attributes: ['id', 'type', 'path', 'url'],
        },
      ],
    });

    return res.json(domains);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      main_city: Yup.string().required(),
      picture: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const { name, main_city, picture } = req.body;

    const domain = await Domains.create({
      name,
      main_city,
      domain_picture: picture || 1,
    });

    return res.json(domain);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      main_city: Yup.string(),
      picture: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const domain = await Domains.findByPk(req.params.id);

    if (!domain) {
      return res.status(400).json({ error: 'Clan not found!' });
    }

    const { name, main_city, picture } = req.body;

    await domain.update({
      name: !name ? domain.name : name,
      main_city: !main_city ? domain.main_city : main_city,
      domain_picture: !picture ? domain.domain_picture : picture,
    });

    return res.json(domain);
  }

  async delete(req, res) {
    const domain = await Domains.findByPk(req.params.id);

    if (!domain) {
      return res.status(400).json({ error: 'Status not found!' });
    }

    await Domains.destroy({ where: { id: req.params.id } }).then(
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

export default new DomainsController();
