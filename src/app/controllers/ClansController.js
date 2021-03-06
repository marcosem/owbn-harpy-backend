import * as Yup from 'yup';
import fs from 'fs';
import path from 'path';
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

    if (!req.superUser) {
      return res.status(401).json({ error: 'Permission Denied!' });
    }

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

    if (!req.superUser) {
      return res.status(401).json({ error: 'Permission Denied!' });
    }

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

    // manage picture deletation
    if (clan.clan_logo > 18 && clan.clan_logo !== clan_logo) {
      const picture = await Files.findByPk(clan.clan_logo);
      const filePath = picture
        ? path.resolve(
            __dirname,
            '..',
            '..',
            '..',
            'tmp',
            'uploads',
            'clan',
            picture.path
          )
        : null;

      if (picture && filePath !== null) {
        fs.unlinkSync(filePath);
        Files.destroy({ where: { id: clan.clan_logo } });
      }
    }

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
    if (!req.superUser) {
      return res.status(401).json({ error: 'Permission Denied!' });
    }

    const clan = await Clans.findByPk(req.params.id);

    if (!clan) {
      return res.status(400).json({ error: 'Clan not found!' });
    }

    // manage picture deletation
    if (clan.clan_logo > 18) {
      const picture = await Files.findByPk(clan.clan_logo);
      const filePath = picture
        ? path.resolve(
            __dirname,
            '..',
            '..',
            '..',
            'tmp',
            'uploads',
            'clan',
            picture.path
          )
        : null;

      if (picture && filePath !== null) {
        fs.unlinkSync(filePath);
        Files.destroy({ where: { id: clan.clan_logo } });
      }
    }

    await Clans.destroy({ where: { id: req.params.id } }).then(
      deletedRecord => {
        if (deletedRecord === 1) {
          return res.status(200).json({ message: 'Deleted successfully' });
        }
        return res.status(404).json({ error: 'Clan not found' });
      }
    );

    return res.status(200);
  }
}

export default new ClansController();
