import { Router } from "express";
import user from './user.js';
import task from './task.js';
import label from './label.js';
import bucket from './bucket.js';
import auth from './auth.js';

const router = Router();

router.use('/user', user);
router.use('/task', task);
router.use('/label', label);
router.use('/bucket', bucket);
router.use('/auth', auth);

export default router