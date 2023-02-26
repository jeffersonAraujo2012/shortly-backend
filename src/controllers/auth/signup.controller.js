import bcrypt from 'bcrypt';
import db from '../../database/database.js';

export default async function signup(req, res) {
  const PEPPER = process.env.PEPPER || '$any_pepper$';
  const newUser = req.body;

  newUser.password = bcrypt.hashSync(newUser.password + PEPPER, 10);

  try {
    const resultQuery = await db.query('SELECT * FROM users WHERE email = $1', [
      newUser.email,
    ]);
    if (resultQuery.rowCount > 0) {
      return res.sendStatus(409);
    }

    const resultSignup = await db.query(
      `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
    `,
      [newUser.name, newUser.email, newUser.password]
    );
  } catch (error) {
    return res.status(500).send('Algo de errado no processo de cadastro.');
  }

  res.sendStatus(201);
}
