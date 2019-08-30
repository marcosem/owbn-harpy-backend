import jwt from 'jsonwebtoken';
import * as Yup from 'yup'; // Yup doesn't have an export default
import Logins from '../models/Logins';
import authConfig from '../../config/ConfigAuth';

import Members from '../models/Members';
import Positions from '../models/Positions';
import Domains from '../models/Domains';
import Files from '../models/Files';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, password } = req.body;

    const user = await Logins.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User not found!' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match!' });
    }

    const { id, login, is_st, member_id, domain_id, super_user } = user;

    const member =
      member_id && !is_st
        ? await Members.findOne({
            where: { id: member_id },
            attributes: ['kindred_name'],
            include: [
              {
                model: Positions,
                as: 'position',
                attributes: ['position_en', 'position_pt'],
              },
              {
                model: Domains,
                as: 'domain',
                attributes: ['name', 'main_city'],
              },
              {
                model: Files,
                as: 'picture',
                attributes: ['id', 'type', 'path', 'url'],
              },
            ],
          })
        : null;

    const stDomain =
      is_st && domain_id ? await Domains.findByPk(domain_id) : null;

    let nameAndTitles;
    if (is_st) {
      nameAndTitles = stDomain ? `${login}, ST of ${stDomain.name}` : login;
    } else if (member) {
      nameAndTitles = member.position
        ? `${login}, ${member.position.position_en}`
        : login;
      nameAndTitles = member.domain
        ? `${nameAndTitles} from ${member.domain.name}`
        : nameAndTitles;
    }

    // domain = member ? member.domain && member.domain.name : null;

    return res.json({
      user: {
        id,
        name: nameAndTitles,
        avatar: member ? member.picture && member.picture.url : null,
        is_st,
        email,
      },
      token: jwt.sign({ id, super_user, domain_id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
