import db from '../../database/database.js';

export default async function openShortLink(req, res) {
  const shortUrl = req.params.shortUrl;

  try {
    const resultQueryUrl = await db.query(
      'SELECT * FROM urls WHERE "shortUrl" = $1',
      [shortUrl]
    );

    if (resultQueryUrl.rowCount === 0) {
      return res.sendStatus(404);
    }

    await db.query('UPDATE urls SET "visitCount" = $1, "accessedAt" = now() WHERE id = $2', [
      resultQueryUrl.rows[0].visitCount + 1,
      resultQueryUrl.rows[0].id
    ]);

    return res.status(300).redirect(resultQueryUrl.rows[0].url);
  } catch (error) {
    return res.status(500).send('Internal Error: ' + error.message);
  }
}
