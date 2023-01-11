import { NextFunction, Request, Response } from 'express';
import * as authService from './auth.service';

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

  try {
    const user = await authService.signup(email, phone, password);
    res.send(user);
  } catch (error: any) {
    console.log('error', error)
    res.status(400).send(error.message);
  }
}

export async function verifyOTP(req: Request, res: Response) {
  const { id, otp } = req.body;

  try {
    await authService.verifyOTP(id, otp);
    res.status(200).send('Verification successful');
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}

export async function forgotPassword(req: Request, res: Response) {
  const { email, phone } = req.body;

  try {
    const otp = await authService.forgotPassword(email, phone);
    // TODO: Just send message not the otp
    res.send('OTP sent for verification');
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}

export async function resetVerifyOTP(req: Request, res: Response) {
  const { email, phone, otp } = req.body;

  try {
    await authService.resetPasswordVerifyOTP(email, phone, otp);
    res.status(200).send('Verification successful');
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}

export async function resetPassword(req: Request, res: Response) {
  const { email, phone, password } = req.body;
  try {
    await authService.resetPassword(email, phone, password);
    res.send('Password reset successful');
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}