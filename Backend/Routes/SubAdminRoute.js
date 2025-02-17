import express from 'express';
import { registerSubAdmin, loginSubAdmin } from '../controllers/SubAdminCont.js';
import { isAdmin } from '../middlewares/auth.js';

const subAdminRouter = express.Router();

subAdminRouter.post('/registerSubAdmin', isAdmin, registerSubAdmin);
subAdminRouter.post('/loginSubAdmin', loginSubAdmin);

export default subAdminRouter;