import express from 'express';
import userRoutes from './modules/user/user.routes.ts';
import uploadRoutes from './modules/upload/upload.routes.ts';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload'
import cors from 'cors';
dotenv.config();

const app = express();
app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);



export default app;