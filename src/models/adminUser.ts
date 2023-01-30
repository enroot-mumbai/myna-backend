'use strict';

import {
  CreateOptions,
  Model, UUIDV4
} from 'sequelize';
import { getLargestToken } from '../microservices/user/user.repository';

interface AdminUserAttributes {
  id: string;
  name: string;
  phone: string;
  password: string;
  userToken: number;
  createdBy: string;
  updatedBy: string;
  role:string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class AdminUser extends Model<AdminUserAttributes>
    implements AdminUserAttributes {
    phone!: string;
    createdBy!: string;
    updatedBy!: string;
    id!: string;
    userToken!: number;
    name!: string;
    password!: string;
    role!:string;
  };
  AdminUser.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    userToken: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    updatedBy: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'AdminUser',
  });

  AdminUser.beforeCreate(async (user: AdminUser, _: CreateOptions<AdminUserAttributes>): Promise<any> => {
    let userToken = await getLargestToken();
    user.userToken = Number(userToken) + Math.floor(Number(Math.random().toFixed(2)) * 100);
    return user;
  });

  return AdminUser;
};

