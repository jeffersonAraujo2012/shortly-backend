import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import db from '../../database/database.js';

export default async function signin(req, res) {
  const PEPPER = process.env.PEPPER || '$any_pepper$';
  const JWT_SECRET = process.env.JWT_SECRET || '$any_jwt_secret$';
  const user = req.body;

  try {
    const resultSearchUser = await db.query(
      'SELECT * FROM users WHERE email = $1',
      [user.email]
    );
    if (resultSearchUser.rowCount === 0) {
      return res.sendStatus(401);
    }

    const correctPassword = bcrypt.compareSync(
      user.password + PEPPER,
      resultSearchUser.rows[0].password
    );
    if (!correctPassword) {
      return res.sendStatus(401);
    }

    const { id, name, email } = resultSearchUser.rows[0];
    const token = jwt.sign(
      {
        id: id,
        name: name,
        email: email,
      },
      JWT_SECRET
    );

    return res.status(200).send({ token: token });
  } catch (error) {
    return res
      .status(500)
      .send('Internal Error - Login failed.' + error.message);
  }
}
