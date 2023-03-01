import { NextFunction, Request, Response } from 'express';
import * as videoProgressTrackingRepository from './videoProgressTracking.repository';


export async function updateVideoProgressByUser(req: Request, res: Response, next: NextFunction) {
  const data = req.body;
  const id = res.locals.user.dataValues.id;
  const videoProgressId = req.params.videoProgressId;
  try {
    const videoProgress = await videoProgressTrackingRepository.updateVideoProgressByUser(id, videoProgressId, data);
    res.send(videoProgress);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}

export async function getvideoProgressByUser(req: Request, res: Response, next: NextFunction) {
  const id = res.locals.user.dataValues.id;
  try {
    const videoProgress = await videoProgressTrackingRepository.getvideoProgressByUser(id, null);
    res.send(videoProgress);
  } catch (error: any) {
    res.status(400).send(error.message)
  }
}



export async function getvideoProgressByID(req: Request, res: Response, next: NextFunction) {
  const id = res.locals.user.dataValues.id;
  const videoProgressId = req.params.videoProgressId;
  try {
    const videoProgress = await videoProgressTrackingRepository.getvideoProgressByID(id, videoProgressId, null);
    res.send(videoProgress);
  } catch (error: any) {
    res.status(400).send(error.message)
  }
}