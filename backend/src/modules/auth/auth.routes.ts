import { Router } from 'express';
import { register,login,logout,me,refresh } from './auth.controller.ts';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/me', me);
router.post('/refresh',refresh)
export default router;