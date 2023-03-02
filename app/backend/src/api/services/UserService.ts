import { ModelStatic } from 'sequelize';
import User from '../../database/models/UserModel';
import IUser from '../interfaces/IUser';
import IToken from '../interfaces/IToken';
import AuthToken from '../authenticator/AuthToken';
import IUserService from '../interfaces/IUserService';

export default class UserService implements IUserService {
  protected model: ModelStatic<User> = User;
  private _jwt: AuthToken = new AuthToken();

  async userLogin(user: IUser): Promise<IToken> {
    const token = this._jwt.createToken({ email: user.email });

    return { token };
  }
}
