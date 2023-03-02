import { Router, Request, Response } from 'express';
import MatchService from '../services/MatchService';
import MatchController from '../controllers/MatchController';

const matchRoutes = Router();
const matchService = new MatchService();
const matchController = new MatchController(matchService);

matchRoutes.get('/matches', (req: Request, res: Response) => matchController.findAll(req, res));
// teamRoutes.get('/teams/:id', (req: Request, res: Response) => teamController.findById(req, res));

export default matchRoutes;
