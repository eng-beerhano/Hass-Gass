import express from 'express';
import { registerSubAdmin, loginSubAdmin, getSubAdmins, Updatesubadmin, Deletesubadmin } from '../controllers/SubAdminCont.js';
// import { isAdmin } from '../middlewares/auth.js';

const subAdminRouter = express.Router();

subAdminRouter.post('/registerSubAdmin',  registerSubAdmin);
subAdminRouter.post('/loginSubAdmin', loginSubAdmin);
subAdminRouter.get('/getSubAdmin', getSubAdmins );
subAdminRouter.put('/updateSubAdmin/:id',  Updatesubadmin);
subAdminRouter.delete('/deleteSubAdmin/:id', Deletesubadmin);
export default subAdminRouter;