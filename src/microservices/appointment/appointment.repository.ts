import dbConn from "./../../models";

const Availabilities = dbConn.Availabilities;
const Doctor = dbConn.Doctor;

export async function getAllAvailableSlots(): Promise<
  typeof Availabilities | null
> {
  try {
    const availabilites = await Availabilities.findAll({
      include: {
        model: Doctor,
        as: "doctor",
      },
    });
    return availabilites || null;
  } catch (error) {
    throw error;
    // throw new NotFoundError(`Error finding availabilites with email ${email}: ${error}`);
  }
}

export async function getAvailableSlotsByDoctorId(
  doctorId: number
): Promise<typeof Availabilities | null> {
  try {
    const availabilites = await Availabilities.findOne({
      where: {
        doctorId,
      },
    });
    return availabilites || null;
  } catch (error) {
    throw error;
    // throw new NotFoundError(`Error finding availabilites with email ${email}: ${error}`);
  }
}

export interface IAddSlotByDoctorId {
  weeklyAvailability?: {
    Monday: object;
    Tuesday: object;
    Wednesday: object;
    Thursday: object;
    Friday: object;
    Saturday: object;
    Sunday: object;
  };
  duration: number;
  intervalBetweenSlots: number;
  doctorId: number;
}

export async function addSlotByDoctorId(
  data: IAddSlotByDoctorId,
  transaction: any = null
): Promise<typeof Availabilities | null> {
  try {
    const availabilites = await Availabilities.create(data, { transaction });
    return availabilites || null;
  } catch (error) {
    throw error;
    // throw new NotFoundError(`Error finding availabilites with email ${email}: ${error}`);
  }
}

export async function updateSlotByDoctorId(
  availabilityId: number,
  data: IAddSlotByDoctorId,
  transaction: any = null
): Promise<typeof Availabilities | null> {
  try {
    console.log(availabilityId, data);

    const availabilites = await Availabilities.update(data, {
      where: {
        id: availabilityId,
      },
      transaction,
      returning: true,
      plain: true,
    });
    return availabilites || null;
  } catch (error) {
    throw error;
    // throw new NotFoundError(`Error finding availabilites with email ${email}: ${error}`);
  }
}
