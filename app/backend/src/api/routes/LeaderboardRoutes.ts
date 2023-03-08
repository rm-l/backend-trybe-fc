import { Router, Request, Response } from 'express';
import TeamService from '../services/TeamService';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRoutes = Router();
const teamService = new TeamService();
const leaderboardController = new LeaderboardController(teamService);

leaderboardRoutes.get(
  '/leaderboard/home',
  (req: Request, res: Response) => leaderboardController.leaderboard(req, res),
);

leaderboardRoutes.get(
  '/leaderboard/away',
  (req: Request, res: Response) => leaderboardController.leaderboard(req, res),
);

export default leaderboardRoutes;
