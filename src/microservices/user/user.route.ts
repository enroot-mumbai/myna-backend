import express from 'express';
import { verifyToken } from '../../middleware/authentication';
import { updateUser } from './user.controller';
import { updateUserValidation } from './user.validations';

const router = express.Router();

router.put('/update', updateUserValidation, updateUser);

export default router;