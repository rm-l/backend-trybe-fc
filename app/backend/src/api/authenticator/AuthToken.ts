import * as jwt from 'jsonwebtoken';
import ITokenPayload from '../interfaces/ITokenPayload';

class AuthToken {
  private secret = 'ngmsabe';

  createToken(payload: ITokenPayload): string {
    const token = jwt.sign(payload, this.secret);
    return token;
  }

  authToken(token: string): ITokenPayload {
    const payload = jwt.verify(token, this.secret) as ITokenPayload;
    return payload;
  }
}

export default AuthToken;
