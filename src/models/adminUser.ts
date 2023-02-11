"use strict";

import { nanoid } from "nanoid";
import { CreateOptions, Model, UUIDV4 } from "sequelize";
import { getLargestToken } from "../microservices/user/user.repository";

interface AdminUserAttributes {
  uuid: string;
  name: string;
  phone: string;
  password: string;
  createdBy: string;
  updatedBy: string;
  role: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class AdminUser
    extends Model<AdminUserAttributes>
    implements AdminUserAttributes
  {
    uuid!: string;
    phone!: string;
    createdBy!: string;
    updatedBy!: string;
    name!: string;
    password!: string;
    role!: string;

    static associate(models: any) {
      AdminUser.hasMany(models.Availabilities, {
        foreignKey: "doctorId",
        as: "availabilities",
      });
    }
  }
  AdminUser.init(
    {
      uuid: {
        type: DataTypes.STRING,
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
    },
    {
      sequelize,
      modelName: "AdminUser",
    }
  );

  AdminUser.beforeCreate(
    async (
      adminUser: AdminUser,
      _: CreateOptions<AdminUserAttributes>
    ): Promise<any> => {
      adminUser.uuid = `adminUser_${nanoid(10)}`;
      return adminUser;
    }
  );

  return AdminUser;
};
