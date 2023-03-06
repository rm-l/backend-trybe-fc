import IUser from './IUser';
import IToken from './IToken';

interface IUserService {
  accValidation(email: string, password: string): Promise<IToken | null>;
  getRole(email: string): Promise<IUser | null>;
}

export default IUserService;
