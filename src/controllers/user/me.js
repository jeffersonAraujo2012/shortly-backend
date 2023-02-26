import db from '../../database/database.js';

export default async function getMe(req, res) {
  const myId = res.locals.user.id;

  try {
    const meResult = await db.query(
      /*SQL*/ `
      SELECT 
        users.id,
        users.name,
        SUM(urls."visitCount") AS "visitCount",
        json_agg(
          json_build_object(
            'id', urls.id,
            'shortUrl', urls."shortUrl",
            'url', urls.url,
            'visitCount', urls."visitCount"
          )
        ) AS "shortenedUrls"
      FROM users
      JOIN urls ON urls.owner = users.id
      WHERE users.id = $1
      GROUP BY users.id;`,
      [myId]
    );

    return res.status(200).send(meResult.rows[0]);
  } catch (error) {
    return res.status(500).send('Internal Error: ' + error.message);
  }
}
