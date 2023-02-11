import { NextFunction, Request, Response } from "express";
import moment from "moment-timezone";
import { RRule, RRuleSet, Weekday } from "rrule";
import { getHours, getMinutes } from "../../common/functions/time";
import { ConflictError, NotFoundError } from "../../utils/error-handler";
import * as doctorRepository from "../doctor/doctor.repository";
import * as appointmentRepository from "./appointment.repository";
import {
  DEFAULT_DURATION,
  DEFAULT_SLOT_INTERVAL,
} from "../../common/constants/appointment";

const RRuleWeekdayAnnotationMapper: {
  [key: string]: Weekday;
} = {
  Monday: RRule.MO,
  Tuesday: RRule.TU,
  Wednesday: RRule.WE,
  Thursday: RRule.TH,
  Friday: RRule.FR,
  Saturday: RRule.SA,
  Sunday: RRule.SU,
};

export const getAllAvailableSlots = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { startDate, endDate } = req.body;
    startDate = startDate ? moment(startDate) : moment();
    endDate = endDate ? moment(endDate) : startDate.clone().add(10, "days");

    const availabilites = await appointmentRepository.getAllAvailableSlots();

    const rruleSet = new RRuleSet();

    for (let availability of availabilites) {
      for (let [weekday, value] of Object.entries(
        availability.dataValues.weeklyAvailability as any
      )) {
        // @ts-ignore
        for (let v of value) {
          rruleSet.rrule(
            new RRule({
              freq: RRule.DAILY,
              dtstart: startDate.toDate(),
              until: endDate.toDate(),
              byweekday: [RRuleWeekdayAnnotationMapper[weekday]],
              byhour: getHours(v.from, v.to),
              byminute: getMinutes(DEFAULT_DURATION),
              bysecond: 0,
            })
          );
        }
      }
    }

    console.log(rruleSet.all());

    res.send([]);
  } catch (error) {
    next(error);
  }
};

export const addSlotByDoctorId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { duration, intervalBetweenSlots, weeklyAvailability } = req.body;
    const { doctorId } = req.params;

    const doctor = await doctorRepository.getDoctorByUuid(doctorId as string);

    if (!doctor) {
      throw new NotFoundError(`Error finding doctor with uuid ${doctorId}`);
    }

    const doctorAvailability =
      await appointmentRepository.getAvailableSlotsByDoctorId(doctor.id);

    if (doctorAvailability) {
      throw new ConflictError(
        `Slot already exist for doctor with uuid ${doctorId}`
      );
    }

    const data: appointmentRepository.IAddSlotByDoctorId = {
      duration,
      intervalBetweenSlots,
      weeklyAvailability,
      doctorId: doctor.id,
    };

    const availabilites = await appointmentRepository.addSlotByDoctorId(data);

    delete availabilites.dataValues.id;
    delete availabilites.dataValues.doctorId;

    res.send(availabilites.dataValues);
  } catch (error) {
    next(error);
  }
};

export const updateSlotByDoctorId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { duration, intervalBetweenSlots, weeklyAvailability } = req.body;
    const { doctorId } = req.params;

    // default duration is 20 minutes
    duration = duration || DEFAULT_DURATION;

    // default intervalBetweenSlots is 10 minutes
    intervalBetweenSlots = intervalBetweenSlots || DEFAULT_SLOT_INTERVAL;

    // checks if doctor exists in DB or not
    const doctor = await doctorRepository.getDoctorByUuid(doctorId as string);
    if (!doctor) {
      throw new NotFoundError(`Error finding doctor with uuid ${doctorId}`);
    }

    // checks if doctor's availability exists in DB or not
    const doctorAvailability =
      await appointmentRepository.getAvailableSlotsByDoctorId(doctor.id);
    if (!doctorAvailability) {
      throw new ConflictError(
        `Cannot find availability of doctor with uuid ${doctorId} to update`
      );
    }

    const data: appointmentRepository.IAddSlotByDoctorId = {
      duration,
      intervalBetweenSlots,
      weeklyAvailability,
      doctorId: doctor.id,
    };

    const transformed = [];

    for (let [weekday, value] of Object.entries(weeklyAvailability)) {
    }

    return;

    const availabilites = await appointmentRepository.updateSlotByDoctorId(
      doctorAvailability.id,
      data
    );

    delete availabilites[1].dataValues.id;
    delete availabilites[1].dataValues.doctorId;

    res.send(availabilites[1].dataValues);
  } catch (error) {
    next(error);
  }
};
