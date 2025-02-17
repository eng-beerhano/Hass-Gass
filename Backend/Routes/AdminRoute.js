import express from 'express';
import { signUp, signIn, logout } from '../controllers/AdminController.js';

const router = express.Router();

router.post('/signUpAdmin', signUp);
router.post('/signInAdmin', signIn);
router.post('/logoutAdmin',  logout);

export default router;