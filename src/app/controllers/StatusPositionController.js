import * as Yup from 'yup';
import StatusPosition from '../models/StatusPosition';
import Positions from '../models/Positions';
import Status from '../models/Status';

class StatusPositionController {
  async index(req, res) {
    const { position_id, formatted } = req.query;
    const where = req.params.id ? { id: `${req.params.id}` } : {};

    const position = await Positions.findByPk(position_id);
    if (!position) {
      return res.status(400).json({ error: 'Position not found!' });
    }

    if (position_id) {
      where.position_id = position_id;
    }

    const statusPosition = await StatusPosition.findAll({
      where,
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
    });

    // Return the position status list formatted and ready to use
    if (formatted && position_id) {
      const statusList = statusPosition.map(stpos => {
        return {
          status_id: stpos.status_id,
          title_en: stpos.status.title_en,
          title_pt: stpos.status.title_pt,
        };
      });

      const statusPositionFormmated = {
        position_id: position.id,
        position_en: position.position_en,
        position_pt: position.position_pt,
        statusList,
      };

      return res.json(statusPositionFormmated);
    }

    return res.json(statusPosition);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      position_id: Yup.number().required(),
      status_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    // Only superuser can execute this command
    if (!req.superUser) {
      return res.status(401).json({ error: 'Permission Denied!' });
    }

    const { position_id, status_id } = req.body;

    // Verify if the position exist
    const position = await Positions.findByPk(position_id);
    if (!position) {
      return res.status(400).json({ error: 'Position not found!' });
    }

    // Verify if the status exist
    const status = await Status.findByPk(status_id);
    if (!status) {
      return res.status(400).json({ error: 'Status not found!' });
    }

    // Verify if the this combination already exist
    const verifyDuplicatedCombo = await StatusPosition.findOne({
      where: {
        position_id,
        status_id,
      },
      attributes: ['id', 'position_id', 'status_id'],
    });

    if (verifyDuplicatedCombo) {
      return res
        .status(400)
        .json({ error: 'This combination Status-Position already exist!' });
    }

    // Add it
    const statusPosition = await StatusPosition.create({
      position_id,
      status_id,
    });

    const statusPositionData = {
      position: {
        position_en: position.position_en,
        position_pt: position.position_pt,
      },
      status: {
        title_en: status.title_en,
        title_pt: status.title_pt,
      },
    };

    const statusPositionResult = [statusPosition, statusPositionData];

    return res.json(statusPositionResult);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      position_id: Yup.number(),
      status_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    // Only superuser can execute this command
    if (!req.superUser) {
      return res.status(401).json({ error: 'Permission Denied!' });
    }

    const statusPosition = await StatusPosition.findByPk(req.params.id);

    if (!statusPosition) {
      return res
        .status(400)
        .json({ error: 'Combination Status-Position not found!' });
    }

    let { position_id, status_id } = req.body;

    if (!position_id) {
      position_id = statusPosition.position_id;
    }

    if (!status_id) {
      status_id = statusPosition.status_id;
    }

    // Verify if the position exist
    const position = await Positions.findByPk(position_id);
    if (!position) {
      return res.status(400).json({ error: 'Position not found!' });
    }

    // Verify if the status exist
    const status = await Status.findByPk(status_id);
    if (!status) {
      return res.status(400).json({ error: 'Status not found!' });
    }

    // Verify if the this combination already exist
    const verifyDuplicatedCombo = await StatusPosition.findOne({
      where: {
        position_id,
        status_id,
      },
      attributes: ['id', 'position_id', 'status_id'],
    });

    if (verifyDuplicatedCombo) {
      return res
        .status(400)
        .json({ error: 'This combination Status-Position already exist!' });
    }

    await statusPosition.update({
      position_id,
      status_id,
    });

    const statusPositionData = {
      position: {
        position_en: position.position_en,
        position_pt: position.position_pt,
      },
      status: {
        title_en: status.title_en,
        title_pt: status.title_pt,
      },
    };

    const statusPositionResult = [statusPosition, statusPositionData];

    return res.json(statusPositionResult);
  }

  async delete(req, res) {
    // Only superuser can execute this command
    if (!req.superUser) {
      return res.status(401).json({ error: 'Permission Denied!' });
    }

    const statusPosition = await StatusPosition.findByPk(req.params.id);

    if (!statusPosition) {
      return res
        .status(400)
        .json({ error: 'Combination Status-Position not found!' });
    }

    await StatusPosition.destroy({ where: { id: req.params.id } }).then(
      deletedRecord => {
        if (deletedRecord === 1) {
          return res.status(200).json({ message: 'Deleted successfully' });
        }
        return res
          .status(404)
          .json({ error: 'Combination Status-Position not found' });
      }
    );

    return res.status(200);
  }
}

export default new StatusPositionController();
