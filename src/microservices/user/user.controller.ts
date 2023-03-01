import { NextFunction, Request, Response } from 'express';
import * as userService from './user.service';
import * as periodTrackingRepository from './../periodTracking/periodTracking.repository';
import * as videoProgressTrackingRepository from './../videoProgressTracking/videoProgressTracking.repository';

export async function updateUser(req: Request, res: Response, next: NextFunction) {
  const data = req.body;
  const id = res.locals.user.dataValues.id;

  try {
    const user = await userService.updateUserService(id, data);
    res.send(user);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}

export async function getUserByUser(req: Request, res: Response, next: NextFunction) {
  const id = Object.keys(res.locals).includes("user") ? res.locals.user.id : null;
  try {
    const user = await userService.getUser(id);
    res.send(user);
  } catch (error: any) {
    res.status(400).send(error.message)
  }
}

export async function getUserProgressByUser(req: Request, res: Response, next: NextFunction) {
  const id = Object.keys(res.locals).includes("user") ? res.locals.user.id : null;
  try {
    const periods = await periodTrackingRepository.getPeriodsByUser(id, null);
    const videoProgress = await videoProgressTrackingRepository.getvideoProgressByUser(id, null);
    const progress = {
      periods: periods?.length > 0 ? true : false,
      videoProgress: videoProgress?.length > 0 ? true : false,
    }
    res.send(progress);
  } catch (error: any) {
    res.status(400).send(error.message)
  }
}