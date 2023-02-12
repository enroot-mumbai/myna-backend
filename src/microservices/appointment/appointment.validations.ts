import { validateRules } from "../../common/functions/validation";
import { NextFunction, Request, Response } from "express";
import moment from "moment-timezone";
import { getTimeObjectFromString } from "../../common/functions/time";

export const getAvailabilityValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const rule = {
      startDate: "date",
      endDate: "date",
    };
    await validateRules(req.body, rule);
    next();
  } catch (error) {
    next(error);
  }
};

export const availableSlotValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const rule = {
      duration: "required|integer",
      intervalBetweenSlots: "required|integer",
      weeklyAvailability: {
        Monday: "array",
        Tuesday: "array",
        Wednesday: "array",
        Thursday: "array",
        Friday: "array",
        Saturday: "array",
        Sunday: "array",
      },
    };

    await validateRules(req.body, rule);
    await validateRules(req.params, {
      doctorId: "required|string",
    });

    next();
  } catch (error) {
    next(error);
  }
};
