import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';
import urlRoutes from './routes/url.routes.js';
import userRoutes from './routes/user.routes.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', authRoutes);
app.use('/url', urlRoutes);
app.use('/users', userRoutes);

app.listen(5000, (err) => {
  if (err) {
    return console.log('Unable to initialize the server.');
  }
  console.log('Server is listening on PORT 5000');
});
