import { validateRules } from "../../common/functions/validation";
import { NextFunction, Request, Response } from 'express';


export const createPeriodValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validationRule = {
            startDate: "required|date",
            endDate: "date",
            notes:"string",
            symptoms:"string"
        };
        await validateRules(req.body, validationRule);
        next();
    } catch (error) {
        next(error);
    }
};

export const updatePeriodValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validationRule = {
            startDate: "date",
            endDate: "date",
            notes:"string",
            symptoms:"string"
        };
        await validateRules(req.body, validationRule);
        next();
    } catch (error) {
        next(error);
    }
};