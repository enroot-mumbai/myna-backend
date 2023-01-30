import { validateRules } from "../../common/functions/validation";
import { NextFunction, Request, Response } from 'express';

export const signInValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validationRule = {
            phone: "required|string|min:10",
            password: "required|string",
        };
        await validateRules(req.body, validationRule);
        next();

    } catch (error) {
        next(error);
    }
};

export const signUpValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validationRule = {
            phone: "required|string|min:10",
            password: [
                "required",
                "string",
            ],
            masterkey:"required|string",
            role:"required|string",
            name:"required|string"
        };
        await validateRules(req.body, validationRule);
        next();
    } catch (error) {
        next(error);
    }
};