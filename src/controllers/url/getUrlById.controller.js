import db from '../../database/database.js';

export default async function getUrlById(req, res) {
  const id = req.params.id;
  if (isNaN(id)) return res.sendStatus(404);

  try {
    const resultQueryUrl = await db.query(
      'SELECT id, "shortUrl", url FROM urls WHERE id = $1',
      [id]
    );

    if (resultQueryUrl.rowCount === 0) {
      return res.sendStatus(404);
    }

    return res.status(200).send(resultQueryUrl.rows[0]);
  } catch (error) {
    return res.status(500).send('Internal Error: ' + error.message);
  }
}
