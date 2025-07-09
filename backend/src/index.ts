import express from 'express';
import { connectDB } from './config/db.ts';
import dotenv from 'dotenv';
import apiRoutes from './routes/index.ts';

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use('/api', apiRoutes);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});