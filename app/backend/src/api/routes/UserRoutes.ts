import { Router, Request, Response } from 'express';
import TokenValidation from '../../middlewares/TokenValidation';
import loginValidation from '../../middlewares/LoginValidation';
import UserService from '../services/UserService';
import UserController from '../controllers/UserController';

const userRoutes = Router();
const userService = new UserService();
const userController = new UserController(userService);

userRoutes.post(
  '/login',
  loginValidation.fieldValidation,
  (req: Request, res: Response) => userController.userLogin(req, res),
);

userRoutes.get(
  '/login/role',
  TokenValidation.validateToken,
  userController.getRole,
);

export default userRoutes;
