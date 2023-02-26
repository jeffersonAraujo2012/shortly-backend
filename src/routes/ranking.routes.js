import express from 'express';

import ranking from '../controllers/ranking.js';

const rankingRoutes = express.Router();

rankingRoutes.get('/', ranking);

export default rankingRoutes;