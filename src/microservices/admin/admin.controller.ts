import { NextFunction, Request, Response } from 'express';
import { BadRequestError, ConflictError, UnauthorizedError } from '../../utils/error-handler';
import * as adminModel from './admin.repository';
import { jwtSign } from '../../common/functions/jwt';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

export async function login(req: Request, res: Response, next: NextFunction) {
  const { phone, password } = req.body;
  try {

    let adminUser;
    adminUser = await adminModel.getUserByPhone(phone);

    // If no adminUser found, throw error
    if (!adminUser) {
      throw new BadRequestError('Invalid email or phone');
    }

    // Check if password is correct or not
    const isValid = await bcrypt.compare(password, adminUser.password);

    if (!isValid) {
      throw new UnauthorizedError('Invalid password');
    }

    // If password is correct return adminUser and token
    const token = jwtSign(adminUser);
    adminUser.dataValues.token = token;

    res.send(adminUser);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}

export async function signup(req: Request, res: Response, next: NextFunction) {
  const { phone, password, masterkey, role, name } = await req.body;

  if (role === 'superadmin') {
    if (masterkey !== process.env.MASTER_KEY) {
      throw new UnauthorizedError(`You're not allowed on this route`)
    }
    // Else check if the user which is logged in has superadmin rights
    // Also do that for other roles in else
  }

  try {
    let adminUser;
    const hashedPassword = await bcrypt.hash(password, 10);

    adminUser = await adminModel.getUserByPhone(phone);
    if (adminUser) {
      throw new ConflictError('Phone number already in use');
    }

    adminUser = await adminModel.createAdminUserWithPhone(
      phone,
      hashedPassword,
      role,
      name
    );

    const token = jwtSign(adminUser);
    adminUser.dataValues.token = token;

    res.send(adminUser);
  } catch (error: any) {
    console.log('error', error)
    res.status(400).send(error.message);
  }
}