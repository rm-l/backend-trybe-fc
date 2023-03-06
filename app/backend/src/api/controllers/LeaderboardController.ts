import { Request, Response } from 'express';
import ITeam from '../interfaces/ITeam';
import IMatch from '../interfaces/IMatch';
import IServiceTeam from '../interfaces/IServiceTeam';
import MatchService from '../services/MatchService';
import TeamService from '../services/TeamService';

class LeaderboardController {
  private _service: IServiceTeam;

  constructor(service: IServiceTeam) {
    this._service = service;
  }

  static totalPoints(id: number, matches: IMatch[]): number[] {
    let points = 0;
    let victories = 0;
    matches.forEach((m) => {
      if (m.victories === id) {
        points += 3;
        victories += 1;
      }
    });
    return [points, victories];
  }

  static totalGames(id: number, matches: IMatch[]): number {
    let count = 0;
    matches.forEach((m) => {
      if (m.homeTeamId === id || m.awayTeamId === id) {
        count += 1;
      }
    });
    return count;
  }

  static totalDraws(id: number, matches: IMatch[]): number {
    const filteredMatches = matches
      .filter((m) => m.homeTeamId === id || m.awayTeamId === id);

    let draws = 0;
    filteredMatches.forEach((m) => {
      if (m.victories === 0) {
        draws += 1;
      }
    });
    return draws;
  }

  static totalLosses(id: number, matches: IMatch[]): number {
    const home = matches.filter((m) => m.homeTeamId === id);
    const away = matches.filter((m) => m.awayTeamId === id);
    let losses = 0;

    home.forEach((m) => {
      if (m.victories === m.awayTeamId) {
        losses += 1;
      }
    });

    away.forEach((m) => {
      if (m.victories === m.homeTeamId) {
        losses += 1;
      }
    });

    return losses;
  }

  static goalsHome(id: number, matches: IMatch[]): number {
    let goals = 0;
    matches.forEach((m) => {
      if (m.homeTeamId === id) {
        goals += m.homeTeamGoals;
      }
      if (m.awayTeamId === id) {
        goals += m.awayTeamGoals;
      }
    });
    return goals;
  }

  static goalsAway(id: number, matches: IMatch[]): number {
    let goals = 0;
    matches.forEach((m) => {
      if (m.homeTeamId === id) {
        goals += m.awayTeamGoals;
      }
      if (m.awayTeamId === id) {
        goals += m.homeTeamGoals;
      }
    });
    return goals;
  }

  static getPoints(teams: ITeam[], matches: IMatch[]) {
    const result = teams.map((t) => {
      const totalPoints = LeaderboardController.totalPoints(t.id as number, matches);
      const totalLosses = LeaderboardController.totalLosses(t.id as number, matches);
      const totalDraws = LeaderboardController.totalDraws(t.id as number, matches);
      const totalGames = LeaderboardController.totalGames(t.id as number, matches);
      const goalsFavor = LeaderboardController.goalsHome(t.id as number, matches);
      const goalsOwn = LeaderboardController.goalsAway(t.id as number, matches);
      return { name: t.teamName,
        totalPoints: totalPoints[0],
        totalGames,
        totalVictories: totalPoints[1],
        totalDraws,
        totalLosses,
        goalsFavor,
        goalsOwn,
      };
    });
    return result;
  }

  leaderboard = async (req: Request, res: Response) => {
    const matchService = new MatchService();
    const teamService = new TeamService();
    const matches = await matchService.findAll();
    const teams = await teamService.findAll();
    const victories = matches.map((m) => {
      if (m.homeTeamGoals > m.awayTeamGoals) {
        return { ...m, victories: m.homeTeamId };
      }
      if (m.awayTeamGoals > m.homeTeamGoals) {
        return { ...m, victories: m.awayTeamId };
      }
      return { ...m, victories: 0 };
    });

    const leaderboard = LeaderboardController.getPoints(teams, victories);
    return res.status(200).json(leaderboard);
  };
}

export default LeaderboardController;
