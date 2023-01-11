import { validateRules } from "../../common/functions/validation";
import { NextFunction, Request, Response } from 'express';

export const signInValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.body.email) {
            const validationRule = {
                email: "required|string|email",
                password: "required|string",
            };
            await validateRules(req.body, validationRule);
            next();
        }
        else if (req.body.phone) {
            const validationRule = {
                phone: "required|string|min:10",
                password: "required|string",
            };
            await validateRules(req.body, validationRule);
            next();
        }

    } catch (error) {
        next(error);
    }
};

export const signUpValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.body.email) {
            const validationRule = {
                email: "required|string|email",
                password: [
                    "required",
                    "string",
                ],
            };
            await validateRules(req.body, validationRule);
            next();
        }
        else if (req.body.phone) {
            const validationRule = {
                phone: "required|string|min:10",
                password: [
                    "required",
                    "string",
                ],
            };
            await validateRules(req.body, validationRule);
            next();
        }

    } catch (error) {
        next(error);
    }
};

export const verifyOTPValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validationRule = {
            id: "required|string",
            otp: "required|string",
        };
        await validateRules(req.body, validationRule);
        next();

    } catch (error) {
        next(error);
    }
};