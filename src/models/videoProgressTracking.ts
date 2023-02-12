'use strict';

import {
  Model, UUIDV4
} from 'sequelize';

interface VideoProgressTrackingAttributes {
  id: string;
  createdBy: string;
  updatedBy: string;
  videoId: string;
  courseSlug: string;
  progressPercentage: number;
  timeOfUpdate: Date;
  isCompleted: boolean;
  secondsPlayed: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class VideoProgressTracking extends Model<VideoProgressTrackingAttributes>
    implements VideoProgressTrackingAttributes {
    id!: string;
    createdBy!: string;
    updatedBy!: string;
    videoId!: string;
    courseSlug!: string;
    progressPercentage!: number;
    timeOfUpdate!: Date;
    isCompleted!: boolean;
    secondsPlayed!: number;
    static associate(models: any) {
      VideoProgressTracking.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey: 'id',
        as: 'UserId',
      })
    }
  };

  VideoProgressTracking.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    videoId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    courseSlug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    progressPercentage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    timeOfUpdate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    secondsPlayed: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    updatedBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'VideoProgressTracking',
  });

  return VideoProgressTracking;
};