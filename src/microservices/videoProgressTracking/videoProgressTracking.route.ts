import express from 'express';
import { verifyToken } from '../../middleware/authentication';
import { getvideoProgresssByUser, updateVideoProgressByUser, getvideoProgressByID } from './videoProgressTracking.controller';
import { createVideoProgressValidation } from './videoProgressTracking.validations';

const router = express.Router();

// Route to upsert video progress by a user
router.put('/:videoProgressId', verifyToken, createVideoProgressValidation, updateVideoProgressByUser);

// Route to get all the video progress of a user which is logged in
router.get('/', verifyToken, getvideoProgresssByUser);

// Route to get the video progress with an id
router.get('/:videoProgressId', verifyToken, getvideoProgressByID);


export default router;