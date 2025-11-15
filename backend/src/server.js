import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import createError from 'http-errors';
import authRoutes from './routes/authRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import { errorHandler } from './utils/errorHandler.js';
dotenv.config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.json({ ok: true, message: 'Company backend running' }));

app.use('/api/auth', authRoutes);
app.use('/api/company', companyRoutes);

// 404
app.use((req, res, next) => next(createError(404, 'Not Found')));

// error handler
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export default app;
