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