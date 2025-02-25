import express from 'express';
import conn from './conn.js';
import dotenv from 'dotenv';
import BranchRouter from './Routes/BranchRoute.js';
import subAdminRouter from './Routes/SubAdminRoute.js';
import packageRouter from './Routes/PackageRoute.js';
import userRouter from './Routes/UserRoutes.js';
import trackOrderRouter from './Routes/TrackOrderRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './Routes/contactRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();

// Middleware to connect to MongoDB
conn();

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

// Middleware for CORS

app.use(cors());

// Serve static files from the "public" directory
app.use('/Uploads', express.static(path.join(__dirname, 'public', 'Uploads')));

// app.post('/api/signUpAdmin', signUp);
app.use('/api', BranchRouter);
app.use('/api', subAdminRouter);
app.use('/api', packageRouter);
app.use('/api/users', userRouter);
app.use('/api', trackOrderRouter);
app.use('/api', router);


const port = 3001;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});