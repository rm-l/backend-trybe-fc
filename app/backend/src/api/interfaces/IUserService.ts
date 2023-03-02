import IUser from './IUser';
import IToken from './IToken';

interface IUserService {
  // userLogin(user: IUser): Promise<IToken>
  accValidation(email: string, password: string): Promise<IToken | null>;
  getRole(email: string): Promise<IUser | null>;
  // passwordValidation(password: string, user: IUser): Promise<null | string>
}

export default IUserService;
