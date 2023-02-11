import { Request, Response, NextFunction } from "express";
import { validateRules } from "../../common/functions/validation";

export const addDoctorValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const rule = {
      name: "required|string",
      email: "required|string|email",
    };
    await validateRules(req.body, rule);
    next();
  } catch (error) {
    next(error);
  }
};
