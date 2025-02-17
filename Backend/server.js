import express from 'express';
import conn from './conn.js';
import dotenv from 'dotenv';
import BranchRouter from './Routes/BranchRoute.js';
import subAdminRouter from './Routes/SubAdminRoute.js';
import packageRouter from './Routes/PackageRoute.js';
import userRouter from './Routes/UserRoutes.js';
import trackOrderRouter from './Routes/TrackOrderRoutes.js';

dotenv.config();

const app = express();

// Middleware to connect to MongoDB
conn();


// Connect to MongoDB



app.use(express.json());

// app.post('/api/signUpAdmin', signUp);
app.use('/api', BranchRouter);
app.use('/api', subAdminRouter);
app.use('/api', packageRouter);
app.use('/api/users', userRouter);
app.use('/api', trackOrderRouter);



    const port = 3001;

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});