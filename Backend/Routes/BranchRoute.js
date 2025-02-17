import express from 'express';
import { registerBranch, updateBranch, deleteBranch } from '../controllers/BranchController.js';
import { getBranches } from '../controllers/BranchController.js';
const BranchRouter = express.Router();

BranchRouter.post('/registerBranch', registerBranch);
BranchRouter.get('/getBranches', getBranches);
BranchRouter.put('/updateBranch/:id', updateBranch);
BranchRouter.delete('/deleteBranch/:id', deleteBranch);
export default BranchRouter;