import { NotFoundError } from '../../utils/error-handler';
import { mapDataToModel } from '../../utils/mapModelKeys';
import dbConn from './../../models';
import { Op } from 'sequelize'

const User = dbConn.User;


export async function getUserByEmail(email: string): Promise<typeof User | null> {
    try {
        const user = await User.findOne({ where: { email } });
        return user || null;
    } catch (error) {
        throw new NotFoundError(`Error finding user with email ${email}: ${error}`);
    }
}

export async function getUserByPhone(phone: string): Promise<typeof User | null> {
    try {
        const user = await User.findOne({ where: { phone } });
        return user || null;
    } catch (error) {
        throw new NotFoundError(`Error finding user with phone ${phone}: ${error}`);
    }
}

export async function createUserWithEmail(email: string, password: string, otp: string): Promise<typeof User> {
    const user = await User.create({
        email,
        password,
        emailVerified: false,
        phoneVerified: false,
        loginMethod: 'email',
        emailOTP: otp
    });

    const userData = {
        ...user,
        dataValues: {
            id: user.dataValues.id,
            email: user.dataValues.email,
            emailVerified: user.dataValues.emailVerified,
        },
        userToken: user.dataValues.userToken
    }

    return userData;
}

export async function createUserWithPhone(phone: string, password: string, otp: string): Promise<typeof User> {
    const user = await User.create({
        phone,
        password,
        phoneVerified: false,
        emailVerified: false,
        loginMethod: 'phone',
        phoneOTP: otp
    });

    const userData = {
        ...user,
        dataValues: {
            id: user.dataValues.id,
            phone: user.dataValues.phone,
            phoneVerified: user.dataValues.phoneVerified,
        },
        userToken: user.dataValues.userToken
    }

    return userData;
}

export async function updateUserByID(userId: string, data: { [key: string]: any }): Promise<typeof User> {

    const { mappedData, extraData } = mapDataToModel(data, User);

    const user = await User.findByPk(userId);

    if (!user) {
        throw new NotFoundError(`User with id ${userId} not found`);
    }

    if (Object.keys(extraData).length > 0) {
        throw new Error(`Invalid keys: ${Object.keys(extraData).join(', ')}`);
    }

    try {
        const result = await user.update(mappedData, { where: { id: userId } });
        return result
    } catch (err) {
        throw new Error(`Couldn't update the user, Error ${err}`);
    }
}

export async function getLargestToken(): Promise<Number> {
    return new Promise(async (resolve, reject) => {
        try {
            let data: Number = await User.max("userToken");
            resolve(null == data ? 0 : data);
        } catch (error) {
            reject(error);
        }
    });
};

export async function getUserByToken(userToken: Number, transaction: any): Promise<typeof User> {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await User.findOne({
                where: { userToken },
                transaction,
            });
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};


export async function getUserById(id: string, transaction: any): Promise<typeof User> {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await User.findOne({
                where: { id },
                transaction,
            });
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};

export async function getAllUsers(limit = 10, page = 1, filters: any): Promise<typeof User | null> {
    return new Promise(async (resolve, reject) => {
        try {
            let { q, startDate, endDate, sortBy, orderBy } = filters;
            let whereCondition = {};
            let orderCondition = [];
            if (undefined !== startDate) {
                whereCondition = {
                    ...whereCondition,
                    ...{
                        created: {
                            [Op.gte]: startDate,
                        },
                    },
                };
            }

            if (undefined !== endDate) {
                whereCondition = {
                    ...whereCondition,
                    ...{
                        created: {
                            [Op.gte]: endDate,
                        },
                    },
                };
            }

            if (undefined !== q) {
                whereCondition = {
                    ...whereCondition,
                    [Op.or]: [
                        {
                            email: { [Op.like]: `%${q}%` },
                        },
                        {
                            phone: { [Op.like]: `%${q}%` },
                        },
                        {
                            name: { [Op.like]: `%${q}%` },
                        },
                        {
                            userToken: { [Op.like]: `%${q}%` },
                        },
                    ],
                };
            }

            if (undefined !== sortBy && undefined !== orderBy) {
                orderCondition.push([sortBy, orderBy]);
            }

            let data = await User.findAndCountAll({
                attributes: [
                    "name",
                    "userToken",
                    "email",
                    "phone",
                ],
                limit,
                offset: limit * (page - 1),
                where: whereCondition,
                order: orderCondition,
            });
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
}