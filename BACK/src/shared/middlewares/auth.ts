import jwt, { type JwtPayload } from "jsonwebtoken";
import { type Request, type Response, type NextFunction } from "express";
import { CustomError } from "../types/errors";
import { config } from "../config";

interface IExtendedJwtPayload extends JwtPayload {
  username: string;
}

interface IRequestWithUser extends Request {
  user?: IExtendedJwtPayload;
}

export class AuthMiddleware {
  verify(req: IRequestWithUser, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new MissingAuthHeaderError();
    }
    try {
      const verified = jwt.verify(
        token,
        config.jwtSecret
      ) as IExtendedJwtPayload;
      req.user = verified;
      next();
    } catch (error: any) {
      next(error);
    }
  }
}

class MissingAuthHeaderError extends CustomError {
  constructor() {
    super("Missing auth headers", 400);
  }
}
