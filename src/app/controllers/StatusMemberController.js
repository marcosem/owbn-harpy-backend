import * as Yup from 'yup';
import { Op } from 'sequelize';
import { isAfter, parseISO, subMonths } from 'date-fns';
import StatusMember from '../models/StatusMember';
import Members from '../models/Members';
import Status from '../models/Status';

class StatusMemberController {
  async index(req, res) {
    const { member_id, activeOnly } = req.query;
    const where = req.params.id ? { id: `${req.params.id}` } : {};

    if (member_id) {
      const member = await Members.findByPk(member_id);
      if (!member) {
        return res.status(400).json({ error: 'Member not found!' });
      }

      where.member_id = member_id;
    }

    if (activeOnly) {
      where.is_removed = activeOnly !== true;
    }

    const statusMember = await StatusMember.findAll({
      where,
      attributes: [
        'id',
        'member_id',
        'status_id',
        'giver',
        'reason',
        'date',
        'is_removed',
        'date_removed',
        'reason_removed',
      ],
      include: [
        {
          model: Members,
          as: 'member',
          attributes: ['kindred_name'],
        },
        {
          model: Status,
          as: 'status',
          attributes: ['title_en', 'title_pt', 'is_negative'],
        },
      ],
    });

    return res.json(statusMember);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      member_id: Yup.number().required(),
      status_id: Yup.number().required(),
      giver: Yup.string(),
      reason: Yup.string(),
      date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const { member_id, status_id, giver, reason, date } = req.body;

    // Verify if the member exist
    const member = await Members.findByPk(member_id);
    if (!member) {
      return res.status(400).json({ error: 'Member not found!' });
    }

    // Verify if the status exist
    const status = await Status.findByPk(status_id);
    if (!status) {
      return res.status(400).json({ error: 'Status not found!' });
    }

    const where = { member_id: `${member_id}` };

    if (date) {
      // Future dates are now allowed, verify it.
      if (isAfter(parseISO(date), new Date())) {
        return res.status(400).json({ error: 'Future dates are not allowed!' });
      }

      if (!status.is_negative) {
        // Verify if there is any status granted less than 6 months ago
        // Only positive status has this restriction
        where.date = {
          [Op.between]: [subMonths(parseISO(date), 6), new Date()],
        };

        const statusMemberDate = await StatusMember.findAll({
          where,
          attributes: ['id', 'member_id', 'status_id', 'date'],
        });

        if (statusMemberDate.length > 0) {
          return res.status(400).json({
            error:
              'The member has received another status trait in the last six months!',
          });
        }
      }
    }

    // Verify if there isn't any negative status that prohibits the member to receive status
    if (!status.is_negative) {
      delete where.date;

      if (status.title_en === 'Loyal') {
        where.status_id = { [Op.in]: [50, 51, 52, 56] };
      } else {
        where.status_id = { [Op.in]: [50, 52, 56] };
      }

      const statusMemberNegative = await StatusMember.findAll({
        where,
        attributes: ['id', 'member_id', 'status_id', 'date'],
      });

      if (statusMemberNegative.length > 0) {
        return res.status(400).json({
          error:
            'The member has negative status that prohibits to receive status!',
        });
      }
    }

    // Add it
    // member_id, status_id, giver, reason, date
    const statusMember = await StatusMember.create({
      member_id,
      status_id,
      giver: giver || '',
      reason: reason || '',
      date: date || null,
      is_removed: false,
      reason_removed: null,
      date_removed: null,
    });

    return res.json(statusMember);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      status_id: Yup.number(),
      giver: Yup.string(),
      reason: Yup.string(),
      date: Yup.date(),
      is_removed: Yup.boolean(),
      reason_removed: Yup.string(),
      date_removed: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const statusMember = await StatusMember.findByPk(req.params.id);

    if (!statusMember) {
      return res
        .status(400)
        .json({ error: 'Combination Status-Member not found!' });
    }

    const {
      status_id,
      giver,
      reason,
      date,
      is_removed,
      reason_removed,
      date_removed,
    } = req.body;

    // Verify if the status exist
    const status = await Status.findByPk(status_id || statusMember.status_id);
    if (!status) {
      return res.status(400).json({ error: 'Status not found!' });
    }

    await statusMember.update({
      member_id: statusMember.member_id,
      status_id: status_id || statusMember.status_id,
      giver: giver || statusMember.giver,
      reason: reason || statusMember.reason,
      date: date || statusMember.date,
      is_removed: is_removed || statusMember.is_removed,
      reason_removed: reason_removed || statusMember.reason_removed,
      date_removed: date_removed || statusMember.date_removed,
    });

    return res.json(statusMember);
  }

  async delete(req, res) {
    const statusMember = await StatusMember.findByPk(req.params.id);

    if (!statusMember) {
      return res
        .status(400)
        .json({ error: 'Combination Status-Member not found!' });
    }

    await StatusMember.destroy({ where: { id: req.params.id } }).then(
      deletedRecord => {
        if (deletedRecord === 1) {
          return res.status(200).json({ message: 'Deleted successfully' });
        }
        return res
          .status(404)
          .json({ error: 'Combination Status-Member not found' });
      }
    );

    return res.status(200);
  }
}

export default new StatusMemberController();
