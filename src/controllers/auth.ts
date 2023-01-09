import { NextFunction, Request, Response } from 'express';
import * as authService from '../services/auth';

export async function login(req: Request, res: Response, next: NextFunction) {
  const { email, phone, password } = req.body;

  try {
    const user = await authService.login(email, phone, password);
    res.send(user);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}

export async function signup(req: Request, res: Response, next: NextFunction) {
  const { email, phone, password } = await req.body;

  // console.log('req', req)
  console.log('req.body', req.body)

  try {
    const user = await authService.signup(email, phone, password);
    res.send(user);
  } catch (error: any) {
    console.log('error', error)
    res.status(400).send(error.message);
  }
}

export async function verifyOTP(req: Request, res: Response) {
  const { email, phone, otp } = req.body;

  // try {
  //   await authService.verifyOTP(email, phone, otp);
  //   res.send('Verification successful');
  // } catch (error: any) {
  //   res.status(400).send(error.message);
  // }
}

export async function forgotPassword(req: Request, res: Response) {
  const { email, phone } = req.body;

  // try {
  //   const otp = await authService.forgotPassword(email, phone);
  //   // TODO: Just send message not the otp
  //   res.send({ otp });
  // } catch (error: any) {
  //   res.status(400).send(error.message);
  // }
}

export async function resetPassword(req: Request, res: Response) {
  const { email, phone, otp, password } = req.body;

  // try {
  //   await authService.resetPassword(email, phone, otp, password);
  //   res.send('Password reset successful');
  // } catch (error: any) {
  //   res.status(400).send(error.message);
  // }
}