import express from 'express';
import { login, signup, verifyOTP, forgotPassword, resetPassword, resetVerifyOTP } from './auth.controller';
import { signInValidation, signUpValidation, verifyOTPValidation, forgotPasswordValidation, resetVerifyOTPValidation } from './auth.validations';

const router = express.Router();

router.post('/signup', signUpValidation, signup);
router.post('/login', signInValidation, login);
router.post('/verify-otp', verifyOTPValidation, verifyOTP);
router.post('/forgot-password', forgotPasswordValidation, forgotPassword);

router.post('/reset-verify-otp', resetVerifyOTPValidation, resetVerifyOTP);

router.post('/reset-password', resetPassword);

export default router;