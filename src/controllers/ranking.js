import db from '../database/database.js';

export default async function ranking(req, res) {
  const resultRanking = await db.query(/*SQL*/ `
    SELECT users.id, users.name, COUNT(urls.id) AS "linkCount", SUM(urls."visitCount") AS "visitCount"
    FROM users
    JOIN urls ON urls.owner = users.id
    GROUP BY users.id
    ORDER BY "visitCount" DESC
    LIMIT 10;`);

  res.status(200).send(resultRanking.rows);
}
