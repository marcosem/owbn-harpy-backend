import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfing from '../../config/ConfigAuth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided!' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfing.secret);

    req.userId = decoded.id;
    req.superUser = decoded.super_user;
    req.domainId = decoded.domain_id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid Token!' });
  }
};
