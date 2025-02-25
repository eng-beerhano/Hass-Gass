import express from 'express';
import { registerBranch, updateBranch, deleteBranch, getTruckOrders } from '../controllers/BranchController.js';
import { getBranches } from '../controllers/BranchController.js';
const BranchRouter = express.Router();

BranchRouter.post('/registerBranch', registerBranch);
BranchRouter.get('/getBranches', getBranches);
BranchRouter.put('/updateBranch/:id', updateBranch);
BranchRouter.delete('/deleteBranch/:id', deleteBranch);
BranchRouter.get('/branchtracker/:id', getTruckOrders);
export default BranchRouter;