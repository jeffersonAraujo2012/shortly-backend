import db from '../../database/database.js';

export default async function deleteUrlById(req, res) {
  const id = req.params.id;
  if (isNaN(id)) return res.sendStatus(404);

  try {
    const resultQueryUrl = await db.query('SELECT * FROM urls WHERE id = $1', [
      id,
    ]);

    if (resultQueryUrl.rowCount === 0) {
      return res.sendStatus(404);
    }
    if (resultQueryUrl.rows[0].owner !== res.locals.user.id) {
      return res.sendStatus(401);
    }

    const deleteResult = await db.query('DELETE FROM urls WHERE id = $1', [id]);

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).send('Internal Error: ' + error.message);
  }
}
