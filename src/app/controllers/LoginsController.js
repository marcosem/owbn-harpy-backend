import * as Yup from 'yup'; // Yup doesn't have an export default
import Logins from '../models/Logins';

class LoginsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      login: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
      is_st: Yup.boolean().required(),
      member_id: Yup.number(),
      domain_id: Yup.number(),
      super_user: Yup.boolean(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await Logins.findOne({
      where: { email: req.body.email },
    });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const {
      login,
      email,
      password,
      is_st,
      member_id,
      domain_id,
      super_user,
    } = req.body;

    const { id } = await Logins.create({
      login,
      email,
      password,
      is_st,
      member_id: member_id || null,
      domain_id: domain_id || null,
      super_user: super_user || false,
    });

    // const user = await User.create(req.body);
    // const { id, name, email } = await Logins.create(req.body);

    return res.json({
      id,
      login,
      email,
      is_st,
      member_id,
      domain_id,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      login: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
      is_st: Yup.boolean(),
      member_id: Yup.number(),
      domain_id: Yup.number(),
      super_user: Yup.boolean(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, oldPassword, password } = req.body;

    const user = await Logins.findByPk(req.userId);

    // Update email
    if (email) {
      if (email !== user.email) {
        const userExists = await Logins.findOne({ where: { email } });

        if (userExists) {
          return res.status(400).json({ error: 'User already exists' });
        }
      }
    }

    // Verifying old password
    if (password && !oldPassword) {
      return res.status(401).json({ error: 'Must enter old password' });
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    // const { id, name } = await user.update(req.body);

    const {
      login,
      // email,
      // password,
      is_st,
      member_id,
      domain_id,
      super_user,
    } = req.body;

    const { id } = await user.update({
      login: login || user.login,
      email: email || user.email,
      password: password || user.password,
      is_st: is_st || user.is_st,
      member_id: member_id || user.member_id,
      domain_id: domain_id || user.domain_id,
      super_user: super_user !== undefined ? super_user : user.super_user,
    });

    return res.json({
      id,
      login: user.login,
      email: user.email,
      is_st: user.is_st,
      member_id: user.member_id,
      domain_id: user.domain_id,
    });
  }
}

export default new LoginsController();
