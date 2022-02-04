import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const { SECRET_TOKEN: secretToken } = process.env;

export const verifyAuthToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];

    jwt.verify(token, secretToken as string);
    next();
  } catch (error) {
    res.status(401);
    res.json('Access denied, invalid token');
  }
};
