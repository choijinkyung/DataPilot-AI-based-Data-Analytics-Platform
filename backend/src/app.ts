import express from 'express';

import dotenv from 'dotenv';
import fileUpload from 'express-fileupload'
import cors from 'cors';

import authRoutes from './modules/auth/auth.routes.ts';
import uploadRoutes from './modules/upload/upload.routes.ts';
// import analysisRoutes from './modules/analysis/analysis.routes.ts';
// import resultRoutes from './modules/result/result.routes.ts';


dotenv.config();

const app = express();
app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
// app.use('/api/analysis',analysisRoutes);
// app.use('/api/result',resultRoutes);

export default app;