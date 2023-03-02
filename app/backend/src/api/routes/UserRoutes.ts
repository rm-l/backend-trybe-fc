import { Router, Request, Response } from 'express';
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
// teamRoutes.get('/teams/:id', (req: Request, res: Response) => teamController.findById(req, res));

export default userRoutes;
