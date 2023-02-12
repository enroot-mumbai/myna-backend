import { NotFoundError } from "../../utils/error-handler";
import dbConn from "../../models";
import * as appointmentRepository from "../appointment/appointment.repository";
import {
  DEFAULT_DURATION,
  DEFAULT_SLOT_INTERVAL,
} from "../../common/constants/appointment";

const AdminUser = dbConn.AdminUser;

const weeklySlotsInitialState = {
  Monday: [],
  Tuesday: [],
  Wednesday: [],
  Thursday: [],
  Friday: [],
  Saturday: [],
  Sunday: [],
};

// Allowed roles are - superadmin, admin, doctor
export async function createAdminUserWithPhone(
  phone: string,
  password: string,
  role: string,
  name: string
): Promise<typeof AdminUser> {
  const { sequelize } = await dbConn;

  const transaction = await sequelize.transaction();
  try {
    const user = await AdminUser.create(
      {
        phone,
        password,
        role,
        name,
      },
      { transaction }
    );

    if (role === "doctor") {
      // add slot by id
      weeklySlotsInitialState;
      const data: appointmentRepository.IAddSlotByDoctorId = {
        duration: DEFAULT_DURATION,
        intervalBetweenSlots: DEFAULT_SLOT_INTERVAL,
        doctorId: user.dataValues.id,
      };

      await appointmentRepository.addSlotByDoctorId(data, transaction);
    }

    const userData = {
      ...user,
      dataValues: {
        id: user.dataValues.id,
        phone: user.dataValues.phone,
        role: user.dataValues.role,
        name: user.dataValues.name,
      },
      userToken: user.dataValues.userToken,
    };

    transaction.commit();

    return userData;
  } catch (err) {
    transaction.rollback();
  }
}

export async function getUserByPhone(
  phone: string
): Promise<typeof AdminUser | null> {
  try {
    const user = await AdminUser.findOne({ where: { phone } });
    return user || null;
  } catch (error) {
    throw new NotFoundError(`Error finding user with phone ${phone}: ${error}`);
  }
}

export async function getAllDoctors(): Promise<typeof AdminUser | null> {
  try {
    const users = await AdminUser.findAll({
      where: { role: "doctor" },
      attributes: ["uuid", "name", "phone", "role"],
      raw: true,
    });

    return users || null;
  } catch (error) {
    throw new NotFoundError(`Error finding all doctors: ${error}`);
  }
}

export async function getAdminByUuid(
  id: string
): Promise<typeof AdminUser | null> {
  try {
    const user = await AdminUser.findOne({
      where: { uuid: id },
      attributes: ["id", "uuid", "name", "phone", "role"],
      raw: true,
    });

    return user || null;
  } catch (error) {
    throw new NotFoundError(`Error finding admin user by id ${id}: ${error}`);
  }
}
