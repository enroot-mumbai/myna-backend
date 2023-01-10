import { NotFoundError } from '../../utils/error-handler';
import { mapDataToModel } from '../../utils/mapModelKeys';
import dbConn from './../../models';

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

export async function createUserWithEmail(email: string, password: string): Promise<typeof User> {
    const user = await User.create({
        email,
        password,
        emailVerified: false,
        loginMethod: 'email'
    });
    return user;
}

export async function createUserWithPhone(phone: string, password: string): Promise<typeof User> {
    const user = await User.create({
        phone,
        password,
        phoneVerified: false,
        loginMethod: 'phone',
    });
    return user;
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

export async function getLargestToken(): Promise<Number>{
    return new Promise(async (resolve, reject) => {
        try {
            let data:Number = await User.max("userToken");
            resolve(null == data ? 0 : data);
        } catch (error) {
            reject(error);
        }
    });
};

export async function getUserByToken(userToken:Number, transaction:any): Promise<typeof User> {
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