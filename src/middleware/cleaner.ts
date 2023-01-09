import { Request, Response, NextFunction } from 'express';
import { clean } from '../common/functions/clean';

/**
 * Middleware function that cleans the request payload.
 * @param req Express request object
 * @param res Express response object
 * @param next Express next middleware function
 */
export const cleaner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = clean(req.body);
    next();
  } catch (error) {
    next(error);
  }
};