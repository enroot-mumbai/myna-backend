import express from 'express';
import { verifyToken } from '../../middleware/authentication';
import { updateUser, getUserByUser, getUserProgressByUser } from './user.controller';
import { updateUserValidation } from './user.validations';

const router = express.Router();

router.get('/', verifyToken, getUserByUser);

router.get('/profile-progress', verifyToken, getUserProgressByUser);

router.put('/update', verifyToken, updateUserValidation, updateUser);

export default router;