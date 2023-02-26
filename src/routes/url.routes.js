import express from 'express';
import shorten from '../controllers/url/shorten.controller.js';

import authMid from '../middlewares/auth.middleware.js';
import validate from '../middlewares/validate.middleware.js';
import urlSchema from '../schemas/url.schema.js';

const urlRoutes = express.Router();

urlRoutes.post('/shorten', authMid, validate(urlSchema), shorten);

export default urlRoutes;
