"use strict";

import moment from "moment-timezone";
import { nanoid } from "nanoid";
import { CreateOptions, Model, Sequelize } from "sequelize";

interface AvailabilitiesAttributes {
  uuid: string;
  weeklyAvailability: any;
  // to be stored in seconds
  duration: number;
  // to be stored in seconds
  intervalBetweenSlots: number;
  doctorId: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Availabilities
    extends Model<AvailabilitiesAttributes>
    implements AvailabilitiesAttributes
  {
    uuid!: string;
    weeklyAvailability!: any;
    duration!: number;
    intervalBetweenSlots!: number;
    doctorId!: number;

    static associate(models: any) {
      Availabilities.belongsTo(models.Doctor, {
        foreignKey: "doctorId",
        as: "doctor",
      });
    }
  }

  Availabilities.init(
    {
      uuid: {
        type: DataTypes.STRING,
      },
      weeklyAvailability: {
        // shows on which time period the trainer is available and for which sessions (pt,zumba,yoga)
        type: DataTypes.JSONB,
        defaultValue: {
          Monday: [],
          Tuesday: [],
          Wednesday: [],
          Thursday: [],
          Friday: [],
          Saturday: [],
          Sunday: [],
        },
        get() {
          let data = this.getDataValue("weeklyAvailability");
          if ([null, undefined].includes(data)) {
            return {
              Monday: [],
              Tuesday: [],
              Wednesday: [],
              Thursday: [],
              Friday: [],
              Saturday: [],
              Sunday: [],
            };
          }
          return typeof data === "string" ? JSON.parse(data) : data;
        },
      },
      // to be stored in seconds
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // to be stored in seconds
      intervalBetweenSlots: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      doctorId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Availabilities",
    }
  );

  Availabilities.beforeCreate(
    (
      availabilities: Availabilities,
      _: CreateOptions<AvailabilitiesAttributes>
    ): any => {
      availabilities.uuid = `availability_${nanoid(10)}`;
      return availabilities;
    }
  );

  return Availabilities;
};
