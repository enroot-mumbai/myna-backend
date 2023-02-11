"use strict";

import { nanoid } from "nanoid";
import { CreateOptions, Model } from "sequelize";

interface DoctorAttributes {
  uuid: string;
  name: string;
  email: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Doctor extends Model<DoctorAttributes> implements DoctorAttributes {
    uuid!: string;
    name!: string;
    email!: string;

    static associate(models: any) {
      Doctor.hasMany(models.Availabilities, {
        foreignKey: "doctorId",
        as: "availabilities",
      });
    }
  }
  Doctor.init(
    {
      uuid: {
        type: DataTypes.STRING,
        // allowNull: false,
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
    },
    {
      sequelize,
      modelName: "Doctor",
    }
  );

  Doctor.beforeCreate(
    (doctor: Doctor, _: CreateOptions<DoctorAttributes>): any => {
      doctor.uuid = `doctor_${nanoid(10)}`;
      return doctor;
    }
  );

  return Doctor;
};
