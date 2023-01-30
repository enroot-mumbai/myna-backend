import { NotFoundError } from '../../utils/error-handler';
import dbConn from '../../models';

const AdminUser = dbConn.AdminUser;

// Allowed roles are - superadmin, admin, doctor

export async function createAdminUserWithPhone(phone: string, password: string, role: string,name:string): Promise<typeof AdminUser> {
    const user = await AdminUser.create({
        phone,
        password,
        role,
        name
    });

    const userData = {
        ...user,
        dataValues: {
            id: user.dataValues.id,
            phone: user.dataValues.phone,
            role: user.dataValues.role,
            name: user.dataValues.name
        },
        userToken: user.dataValues.userToken
    }

    return userData;
}

export async function getUserByPhone(phone: string): Promise<typeof AdminUser | null> {
    try {
        const user = await AdminUser.findOne({ where: { phone } });
        return user || null;
    } catch (error) {
        throw new NotFoundError(`Error finding user with phone ${phone}: ${error}`);
    }
}
