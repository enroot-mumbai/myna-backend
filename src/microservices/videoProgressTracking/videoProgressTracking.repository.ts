import { NotFoundError, UnauthorizedError } from '../../utils/error-handler';
import { mapDataToModel } from '../../utils/mapModelKeys';
import dbConn from '../../models';

const User = dbConn.User;
const VideoProgressTracking = dbConn.VideoProgressTracking;

export async function updateVideoProgressByUser(userId: string, videoProgressId: string, data: { [key: string]: any }): Promise<typeof VideoProgressTracking> {

    return new Promise(async (resolve, reject) => {
        const { mappedData, extraData } = mapDataToModel(data, VideoProgressTracking);

        const user = await User.findByPk(userId);
        if (!user) {
            throw new NotFoundError(`User with id ${userId} not found`);
        }

        mappedData.userId = userId;
        mappedData.videoId = videoProgressId;
        try {
            const videoProgress = await VideoProgressTracking.findOne({
                where: { userId, videoId: videoProgressId }
            });

            if (Object.keys(extraData).length > 0) {
                throw new Error(`Invalid keys: ${Object.keys(extraData).join(', ')}`);
            }

            if (videoProgress && videoProgress.id) {
                if (videoProgress.userId !== user.id) {
                    throw new UnauthorizedError(`User doesn't have access to videoProgress`);
                }
                try {
                    const result = await VideoProgressTracking.update(mappedData, { where: { videoId: videoProgressId, userId } });
                    resolve(result);
                } catch (err) {
                    throw new Error(`Couldn't update the progress, Error ${err}`);
                }
            } else {
                try {
                    const result = await VideoProgressTracking.create(mappedData);
                    resolve(result);
                } catch (err) {
                    throw new Error(`Couldn't add the progress, Error ${err}`);
                }
            }
        } catch (error) {
            reject(error);
        }
    });

}

export async function getvideoProgressByUser(userId: string, transaction: any): Promise<typeof User> {

    return new Promise(async (resolve, reject) => {
        try {
            let data = await VideoProgressTracking.findAll({
                where: { userId },
                order: [
                    ['videoId', 'ASC'],
                ],
                transaction,
            });
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
}



export async function getvideoProgressByID(userId: string, videoProgressId: string, transaction: any): Promise<typeof User> {

    const user = await User.findByPk(userId);
    if (!user) {
        throw new NotFoundError(`User with id ${userId} not found`);
    }

    return new Promise(async (resolve, reject) => {
        try {
            let data = await VideoProgressTracking.findOne({
                where: {
                    userId,
                    videoId: videoProgressId
                },
                transaction,
            });
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
}
