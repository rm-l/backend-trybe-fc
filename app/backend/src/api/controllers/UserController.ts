import { Request, Response } from 'express';
import IUserService from '../interfaces/IUserService';

class UserController {
  private _service: IUserService;

  constructor(service: IUserService) {
    this._service = service;
  }

  async userLogin(req: Request, res: Response) {
    const result = await this._service.userLogin(req.body);

    return res.status(200).json(result);
  }
}

export default UserController;
