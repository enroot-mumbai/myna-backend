'use strict';

import {
  Model, UUIDV4
} from 'sequelize';

interface UserAttributes {
  id: string;
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
  // readonly createdAt: Date;
  // readonly updatedAt: Date;
  loginMethod: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  emailOTP: string;
  phoneOTP: string;
  resetPasswordOTP: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> 
  implements UserAttributes {
    phone!: string;
    address!: string;
    city!: string;
    state!: string;
    country!: string;
    dateOfBirth!: Date;
    createdBy!: string;
    updatedBy!: string;
    // createdAt!: Date;
    // updatedAt!: Date;
    loginMethod!: string;
    emailVerified!: boolean;
    phoneVerified!: boolean;
    emailOTP!: string;
    phoneOTP!: string;
    resetPasswordOTP!: string;
    id!: string;
    name!: string;
    email!: string;
    password!: string;
  };
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
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
      type: DataTypes.UUID,
      allowNull: true,
    },
    updatedBy: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    loginMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    phoneVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

