import { NextFunction, Request, Response } from "express";
import dbConn from "../../models";
import { BadRequestError } from "../../utils/error-handler";
import * as appointmentRepository from "../appointment/appointment.repository";
import * as doctorRepository from "./doctor.repository";

export const addDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { sequelize } = await dbConn;

  const transaction = await sequelize.transaction();
  try {
    const { name, email } = req.body;

    const doctor = await doctorRepository.getDoctorByEmail(email);
    console.log(doctor);

    if (doctor) {
      throw new BadRequestError(
        `A doctor account already existing with the email ${email}`
      );
    }

    const doctorResult = await doctorRepository.addDoctor(
      { name, email },
      transaction
    );

    console.log(doctorResult, "doctorResult");

    const data: appointmentRepository.IAddSlotByDoctorId = {
      duration: 20,
      intervalBetweenSlots: 10,
      doctorId: doctorResult.dataValues.id,
    };

    const result = await appointmentRepository.addSlotByDoctorId(
      data,
      transaction
    );

    console.log(result, "result");

    transaction.commit();

    delete doctorResult.dataValues.id;
    res.status(200).send(doctorResult.dataValues);
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};
