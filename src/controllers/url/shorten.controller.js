import { nanoid } from 'nanoid';

import db from '../../database/database.js';

export default async function shorten(req, res) {
  const userId = res.locals.user.id;
  const url = req.body.url;
  const shortUrl = nanoid(8);

  try {
    const resultInsertShortUrl = await db.query(
      `
      INSERT INTO urls (url, "shortUrl", owner)
      VALUES ($1, $2, $3)
      RETURNING *
    `,
      [url, shortUrl, userId]
    );

    const newShortLinkId = resultInsertShortUrl.rows[0].id;
    return res.status(201).send({
      id: newShortLinkId,
      shortUrl: shortUrl
    })
  } catch (error) {
    return res
      .status(500)
      .send('Internal Error has been occurred:' + error.message);
  }
}
