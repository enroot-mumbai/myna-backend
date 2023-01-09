import express from 'express';
import { login, signup, verifyOTP, forgotPassword, resetPassword } from './auth.controller';
import { signInValidation,signUpValidation } from './auth.validations';

const router = express.Router();

router.post('/login',signInValidation,login);
router.post('/signup',signUpValidation, signup);
router.post('/verify-otp', verifyOTP);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;