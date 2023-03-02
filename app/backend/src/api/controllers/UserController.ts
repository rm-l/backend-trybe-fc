import { Request, Response } from 'express';
import IUserService from '../interfaces/IUserService';

class UserController {
  private _service: IUserService;

  constructor(service: IUserService) {
    this._service = service;
  }

  async userLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    const result = await this._service.accValidation(email, password);

    if (!result) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    return res.status(200).json(result);
  }

  getRole = async (req: Request, res: Response) => {
    const { role } = req.body;
    const result = await this._service.getRole(role.email);
    res.status(200).json({ role: result?.role });
  };
}

export default UserController;
