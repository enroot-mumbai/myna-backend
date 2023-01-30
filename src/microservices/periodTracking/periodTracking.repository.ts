import { NotFoundError, UnauthorizedError } from '../../utils/error-handler';
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


export async function updatePeriodByUser(userId:string, periodId: string, data: { [key: string]: any }): Promise<typeof PeriodTracking> {

    const { mappedData, extraData } = mapDataToModel(data, PeriodTracking);

    const user = await User.findByPk(userId);
    if (!user) {
        throw new NotFoundError(`User with id ${userId} not found`);
    }
   
    const period = await PeriodTracking.findOne({
        where: {id:periodId}
    })

    if (!period) {
        throw new NotFoundError(`Period with id ${periodId} not found`);
    }

    if(period.userId !== user.id){
        throw new UnauthorizedError(`User doesn't have access to period`);
    }

    if (Object.keys(extraData).length > 0) {
        throw new Error(`Invalid keys: ${Object.keys(extraData).join(', ')}`);
    }

    try {
        const result = await period.update(mappedData, { where: { id: periodId } });
        return result
    } catch (err) {
        throw new Error(`Couldn't update the user, Error ${err}`);
    }
}