import express from 'express';
import { verifyToken } from '../../middleware/authentication';
import { updatePeriodByUser,getPeriodsByUser,createPeriodByUser } from './periodTracking.controller';
import { createPeriodValidation, updatePeriodValidation } from './periodTracking.validations';

const router = express.Router();

// Route to create new period by a user
router.post('/',verifyToken,createPeriodValidation, createPeriodByUser)

// Route to get all the periods of a user which is logged in
router.get('/',verifyToken, getPeriodsByUser);

// Route to update a period by a user which is logged in
router.put('/:periodId/update',verifyToken, updatePeriodValidation, updatePeriodByUser);

export default router;