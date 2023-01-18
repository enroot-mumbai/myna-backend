import { validateRules } from "../../common/functions/validation";
import { NextFunction, Request, Response } from 'express';

export const updateUserValidation = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const validationRule = {
            name:"string",
            address:"string",
            email: "string|email",
            phone: "string",
            city: "string",
            state: "string",
            country: "string",
            dob: "date"
        };
        await validateRules(req.body, validationRule);
        next();
    } catch (error) {
        next(error);
    }
};