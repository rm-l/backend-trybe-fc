import { Request, Response, NextFunction } from 'express';

class loginValidation {
  public static fieldValidation(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    if (!password || !email) {
      return res.status(400).send({ message: 'All fields must be filled' });
    }

    next();
  }
}

export default loginValidation;
