import { Router } from 'express';
import authController from "../controller/auth.js"

const { signUp, signIn } = authController;
const router = Router();

router.post('/signin', signIn);
router.post('/signup', signUp);

export default router;