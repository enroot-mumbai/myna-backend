'use strict';

import {
  Model, UUIDV4
} from 'sequelize';


interface PeriodTrackingAttributes {
  id: string;
  createdBy: string;
  updatedBy: string;
  startDate: Date;
  endDate: Date;
  symptoms: string;
  notes: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class PeriodTracking extends Model<PeriodTrackingAttributes>
    implements PeriodTrackingAttributes {
    id!: string;
    createdBy!: string;
    updatedBy!: string;
    startDate!: Date;
    endDate!: Date;
    symptoms!: string;
    notes!: string;
    static associate(models: any) {
      PeriodTracking.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey: 'id',
        as: 'UserId',
      })
    }
  };

  PeriodTracking.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    updatedBy: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    symptoms: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'PeriodTracking',
  });

  return PeriodTracking;
};