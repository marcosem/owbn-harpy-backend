import * as Yup from 'yup';
import fs from 'fs';
import path from 'path';
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

    // User can change only his only domain, unless he is a super user
    if (!req.superUser) {
      return res.status(401).json({ error: 'Permission Denied!' });
    }

    const { name, main_city, picture } = req.body;

    const domain = await Domains.create({
      name,
      main_city,
      domain_picture: picture || 16,
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
      return res.status(400).json({ error: 'Domain not found!' });
    }

    // User can change only his only domain, unless he is a super user
    if (!req.superUser) {
      if (req.domainId !== domain.domain_id) {
        return res.status(401).json({ error: 'Permission Denied!' });
      }
    }

    const { name, main_city, picture } = req.body;

    // manage picture deletation
    if (domain.domain_picture > 18 && domain.domain_picture !== picture) {
      const pic = await Files.findByPk(domain.domain_picture);
      const filePath = pic
        ? path.resolve(
            __dirname,
            '..',
            '..',
            '..',
            'tmp',
            'uploads',
            'domains',
            pic.path
          )
        : null;

      if (pic && filePath !== null) {
        fs.unlinkSync(filePath);
        Files.destroy({ where: { id: domain.domain_picture } });
      }
    }

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
      return res.status(400).json({ error: 'Domain not found!' });
    }

    // User can delete only his only domain, unless he is a super user
    if (!req.superUser) {
      if (req.domainId !== domain.domain_id) {
        return res.status(401).json({ error: 'Permission Denied!' });
      }
    }

    // manage picture deletation
    if (domain.domain_picture > 18) {
      const picture = await Files.findByPk(domain.domain_picture);
      const filePath = picture
        ? path.resolve(
            __dirname,
            '..',
            '..',
            '..',
            'tmp',
            'uploads',
            'domains',
            picture.path
          )
        : null;

      if (picture && filePath !== null) {
        fs.unlinkSync(filePath);
        Files.destroy({ where: { id: domain.domain_picture } });
      }
    }

    await Domains.destroy({ where: { id: req.params.id } }).then(
      deletedRecord => {
        if (deletedRecord === 1) {
          return res.status(200).json({ message: 'Deleted successfully' });
        }
        return res.status(404).json({ error: 'Domain not found' });
      }
    );

    return res.status(200);
  }
}

export default new DomainsController();
