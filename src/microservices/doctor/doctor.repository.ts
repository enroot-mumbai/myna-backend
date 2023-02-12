import dbConn from "./../../models";
import { NotFoundError } from "../../utils/error-handler";

const AdminUser = dbConn.AdminUser;

export const getDoctorByUuid = (uuid: string) => {
  try {
    const doctor = AdminUser.findOne({
      where: {
        uuid,
      },
      exclude: ["id"],
    });
    return doctor;
  } catch (error) {
    throw new NotFoundError(`Error finding doctor with uuid ${uuid}: ${error}`);
  }
};

export const getDoctorByEmail = (email: string) => {
  try {
    const doctor = AdminUser.findOne({
      where: {
        email,
      },
      exclude: ["id"],
    });
    return doctor;
  } catch (error) {
    throw new NotFoundError(
      `Error finding doctor with email ${email}: ${error}`
    );
  }
};

export const addDoctor = (
  data: { name: string; email: string },
  transaction: any = null
) => {
  try {
    const doctor = AdminUser.create(
      { ...data, role: "doctor" },
      { transaction }
    );
    return doctor;
  } catch (error) {
    throw error;
  }
};
