import { validateRules } from "../../common/functions/validation";
import { NextFunction, Request, Response } from 'express';


export const createVideoProgressValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validationRule = {
            courseSlug: "required|string",
            progressPercentage: "required|integer",
            timeOfUpdate: "required|date",
            isCompleted: "boolean",
            secondsPlayed: "required|integer"
        };
        await validateRules(req.body, validationRule);
        next();
    } catch (error) {
        next(error);
    }
};