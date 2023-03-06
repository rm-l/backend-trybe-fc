import { Router, Request, Response } from 'express';
import MatchService from '../services/MatchService';
import MatchController from '../controllers/MatchController';
import TokenValidation from '../../middlewares/TokenValidation';

const matchRoutes = Router();
const matchService = new MatchService();
const matchController = new MatchController(matchService);

matchRoutes.get('/matches', (req: Request, res: Response) => matchController.findAll(req, res));
matchRoutes.patch(
  '/matches/:id/finish',
  TokenValidation.validateToken,
  (req: Request, res: Response) => matchController.findFinished(req, res),
);
matchRoutes.patch(
  '/matches/:id',
  TokenValidation.validateToken,
  (req: Request, res: Response) => matchController.updateMatch(req, res),
);
matchRoutes.post(
  '/matches/',
  TokenValidation.validateToken,
  (req: Request, res: Response) => matchController.createMatch(req, res),
);

export default matchRoutes;
