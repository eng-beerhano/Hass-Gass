import express from 'express';
import { deletePackage, getPackageById, getPackages, registerPackage, updatePackage } from '../controllers/PackageCont.js';
import { upload } from '../middlewares/multer.js';

const packageRouter = express.Router();

packageRouter.post('/register', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'images', maxCount: 5 }]), registerPackage);
packageRouter.get('/getPackages', getPackages);
packageRouter.get('/getPackage/:id', getPackageById);
packageRouter.put('/updatePackage/:id', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'images', maxCount: 5 }]), updatePackage);
packageRouter.delete('/deletePackage/:id', deletePackage);

export default packageRouter;