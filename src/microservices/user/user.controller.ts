import { NextFunction, Request, Response } from 'express';
import * as userService from './user.service';

export async function updateUser(req: Request, res: Response, next: NextFunction) {
  const { id, data } = req.body;
  try {
    const user = await userService.updateUserService(id, data);
    res.send(user);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}

export async function getUserByUser(req:Request, res:Response, next:NextFunction) {
  const id = Object.keys(res.locals).includes("user") ? res.locals.user.id : null;
  try{
    const user = await userService.getUser(id);
    res.send(user);
  } catch (error:any){
    res.status(400).send(error.message)
  }
}