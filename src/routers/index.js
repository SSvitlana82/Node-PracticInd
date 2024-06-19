import { Router } from 'express';
import studentsRouter from './students.js';
import userRouter from './auth.js';

const router = Router();
router.use('/students', studentsRouter);
router.use('/auth', userRouter);
export default router;
