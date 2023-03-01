"use strict";

import { CreateOptions, Model, UUIDV4 } from "sequelize";
import { getLargestToken } from "../microservices/user/user.repository";

interface UserAttributes {
  name: string;
  email: string;
  phone: string;
  password: string;
  address: string;
  city: string;
  state: string;
  country: string;
  dateOfBirth: Date;
  createdBy: string;
  updatedBy: string;
  loginMethod: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  emailOTP: string;
  phoneOTP: string;
  resetPasswordOTP: string;
  resetPasswordVerified: string;
  userToken: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    phone!: string;
    address!: string;
    city!: string;
    state!: string;
    country!: string;
    dateOfBirth!: Date;
    createdBy!: string;
    updatedBy!: string;
    loginMethod!: string;
    emailVerified!: boolean;
    phoneVerified!: boolean;
    emailOTP!: string;
    phoneOTP!: string;
    resetPasswordOTP!: string;
    userToken!: number;
    name!: string;
    email!: string;
    password!: string;
    resetPasswordVerified!: string;
    static associate(models: any) {
      User.hasMany(models.PeriodTracking, {
        foreignKey: "userId",
        as: "periodTracking",
        sourceKey: "id",
      });
    }
  }
  User.init(
    {
      userToken: {
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
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
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      createdBy: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      updatedBy: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      loginMethod: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      emailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      phoneVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      emailOTP: {
        type: DataTypes.STRING,
      },
      phoneOTP: {
        type: DataTypes.STRING,
      },
      resetPasswordOTP: {
        type: DataTypes.STRING,
      },
      resetPasswordVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate(
    async (user: User, _: CreateOptions<UserAttributes>): Promise<any> => {
      let userToken = await getLargestToken();
      userToken = Number(userToken) + Math.floor(Number(Math.random().toFixed(2)) * 100);
      user.userToken = Number(userToken);
      return user;
    }
  );

  return User;
};
