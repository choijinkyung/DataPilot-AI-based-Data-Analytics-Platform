import { Router } from 'express';
import { register,login,logout,me } from './user.controller.ts';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/me', me);

export default router;