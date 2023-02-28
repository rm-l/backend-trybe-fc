import { Request, Response } from 'express';
import IServiceTeam from '../interfaces/IServiceTeam';

export default class TeamController {
  private _service: IServiceTeam;

  constructor(service: IServiceTeam) {
    this._service = service;
  }

  async findAll(req: Request, res: Response) {
    const result = await this._service.findAll();
    return res.status(200).json(result);
  }

  findById = async (req: Request, res: Response) => {
    const result = await this._service.findById(Number(req.params.id));

    if (result) return res.status(200).json(result);
  };
}
