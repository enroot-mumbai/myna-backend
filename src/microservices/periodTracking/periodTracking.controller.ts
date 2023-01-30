import { NextFunction, Request, Response } from 'express';
import * as periodTrackingRepository from './periodTracking.repository';

export async function createPeriodByUser(req: Request, res: Response, next: NextFunction) {
  const data = req.body;
  const id = res.locals.user.dataValues.id;

  try {
    const period = await periodTrackingRepository.createPeriodByUser(id, data);
    res.send(period);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}
export async function updatePeriodByUser(req: Request, res: Response, next: NextFunction) {
  // const data = req.body;
  // const id = res.locals.user.dataValues.id;

  // try {
  //   const user = await periodTrackingRepository.updatePeriodByUser(id, data);
  //   res.send(user);
  // } catch (error: any) {
  //   res.status(400).send(error.message);
  // }
}

export async function getPeriodsByUser(req: Request, res: Response, next: NextFunction) {
  // const id = Object.keys(res.locals).includes("user") ? res.locals.user.id : null;
  // try {
  //   const user = await userService.getUser(id);
  //   res.send(user);
  // } catch (error: any) {
  //   res.status(400).send(error.message)
  // }
}