import { validateRules } from "../../common/functions/validation";
import { NextFunction, Request, Response } from 'express';

export const updateUserValidation = async (req: Request, res: Response, next: NextFunction) => {

    // TODO: Check if the user is authorized or not
    
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
        await validateRules(req.body.data, validationRule);
        next();
    } catch (error) {
        next(error);
    }
};