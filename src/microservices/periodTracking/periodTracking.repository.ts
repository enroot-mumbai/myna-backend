import { NotFoundError } from '../../utils/error-handler';
import { mapDataToModel } from '../../utils/mapModelKeys';
import dbConn from '../../models';

const User = dbConn.User;
const PeriodTracking = dbConn.PeriodTracking;

interface PeriodProps {
    startDate: Date;
    endDate: Date;
    notes: string;
    symptoms: string;
}

export async function createPeriodByUser(userId: string, data: PeriodProps): Promise<typeof User> {
    const period = await PeriodTracking.create({
        startDate: data.startDate,
        endDate: data.endDate,
        symptoms: data.symptoms,
        notes: data.notes,
        userId
    });
    return period;
}

export async function getPeriodsByUser(userId: string,transaction: any): Promise<typeof User> {

    return new Promise(async (resolve, reject) => {
        try {
            let data = await PeriodTracking.findAll({
                where: { userId },
                transaction,
            });
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
}