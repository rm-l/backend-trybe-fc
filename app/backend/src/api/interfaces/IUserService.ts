import IUser from './IUser';
import IToken from './IToken';

interface IUserService {
  userLogin(user: IUser): Promise<IToken>
}

export default IUserService;
