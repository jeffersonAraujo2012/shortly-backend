import express from 'express';

import authMid from '../middlewares/auth.middleware.js';
import getMe from '../controllers/user/me.js';

const userRoutes = express.Router();

userRoutes.get('/me', authMid, getMe);

export default userRoutes;
