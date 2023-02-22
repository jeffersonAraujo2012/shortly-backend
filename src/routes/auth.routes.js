import express from 'express';

import signinSchema from '../schemas/signin.schema.js';
import userSchema from '../schemas/user.schema.js';

import validate from '../middlewares/validate.middleware.js';
import signin from '../controllers/auth/signin.controller.js';
import signup from '../controllers/auth/signup.controller.js';

const authRoutes = express.Router();

authRoutes.post('/signin', validate(signinSchema), signin);
authRoutes.post('/signup', validate(userSchema), signup);

export default authRoutes;