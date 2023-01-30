import express from 'express';
import { login,signup } from './admin.controller';
import { signInValidation,signUpValidation } from './admin.validations';

const router = express.Router();

router.post('/signup', signUpValidation, signup);
router.post('/login', signInValidation, login);

export default router;