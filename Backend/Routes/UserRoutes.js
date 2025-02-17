import express from 'express';
import { signUp, login, getUsers, getUserById, updateUser, deleteUser, logout } from '../controllers/Usercont.js';

const userRouter = express.Router();

userRouter.post('/signup', signUp);
userRouter.post('/login', login);
userRouter.post('/logout', logout);
userRouter.get('/users', getUsers);
userRouter.get('/users/:id', getUserById);
userRouter.put('/users/:id', updateUser);
userRouter.delete('/users/:id', deleteUser);

export default userRouter;