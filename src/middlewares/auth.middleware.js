import jwt from 'jsonwebtoken';

export default function authMid(req, res, next) {
  const JWT_SECRET = process.env.JWT_SECRET || '$any_jwt_secret$';

  if (!req.headers?.authorization) return res.sendStatus(401);

  const authorization = req.headers.authorization.split(' ');
  if (authorization[0].toUpperCase() !== 'BEARER') return res.sendStatus(401);

  const token = authorization[1];
  const user = jwt.verify(token, JWT_SECRET);
  res.locals.user = user;

  next();
}
