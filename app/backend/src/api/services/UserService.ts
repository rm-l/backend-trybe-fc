import { ModelStatic } from 'sequelize';
import bcrypt = require('bcryptjs');
import User from '../../database/models/UserModel';
import IUser from '../interfaces/IUser';
import IToken from '../interfaces/IToken';
import AuthToken from '../authenticator/AuthToken';
import IUserService from '../interfaces/IUserService';

export default class UserService implements IUserService {
  protected model: ModelStatic<User> = User;
  private _jwt: AuthToken = new AuthToken();

  static passwordValidation(password: string, user: IUser) {
    const pass = bcrypt.compareSync(password, user.password);

    if (!pass || password.length < 6) {
      return null;
    }

    return pass;
  }

  async accValidation(email: string, password: string): Promise<IToken | null> {
    const regex = /^\S+@\S+\.\S+$/;

    const user = await this.model.findOne({
      where: { email },
    });

    if (!user || !regex.test(email)) {
      return null;
    }

    const verifyPass = UserService.passwordValidation(password, user);

    if (!verifyPass) {
      return null;
    }

    const token = this._jwt.createToken({ email });

    return { token };
  }

  async getRole(email: string): Promise<IUser | null> {
    const role = await this.model.findOne({ where: { email } });
    return role;
  }
}
