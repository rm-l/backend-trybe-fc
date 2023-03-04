import { Request, Response } from 'express';
import IServiceMatch from '../interfaces/IServiceMatch';

export default class MatchController {
  private _service: IServiceMatch;

  constructor(service: IServiceMatch) {
    this._service = service;
  }

  async findAll(req: Request, res: Response) {
    const result = await this._service.findAll();

    if (req.query.inProgress) {
      const queryResult = result.filter((m) => m.inProgress.toString() === req.query.inProgress);
      return res.status(200).json(queryResult);
    }

    return res.status(200).json(result);
  }

  async findFinished(req: Request, res: Response) {
    const { id } = req.params;

    await this._service.findFinished(Number(id));

    return res.status(200).json({ message: 'Finished' });
  }

  async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    await this._service.updateMatch(Number(id), homeTeamGoals, awayTeamGoals);

    return res.status(200).json({ message: 'Match updated' });
  }

  async createMatch(req: Request, res: Response) {
    const { homeTeamId, awayTeamId, awayTeamGoals, homeTeamGoals } = req.body;

    const result = await this._service.createMatch(
      homeTeamId,
      awayTeamId,
      awayTeamGoals,
      homeTeamGoals,
    );

    return res.status(201).json(result);
  }
}
