import express from 'express';
import getUrlById from '../controllers/url/getUrlById.controller.js';
import shorten from '../controllers/url/shorten.controller.js';

import authMid from '../middlewares/auth.middleware.js';
import validate from '../middlewares/validate.middleware.js';
import urlSchema from '../schemas/url.schema.js';

const urlRoutes = express.Router();

urlRoutes.post('/shorten', authMid, validate(urlSchema), shorten);
urlRoutes.get('/:id', getUrlById);

export default urlRoutes;
