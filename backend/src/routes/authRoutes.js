import express from 'express';
import { register, login, verifyMobile, verifyEmailWebhook } from '../controllers/authController.js';
import { registerValidation, loginValidation } from '../middleware/validators.js';
const router = express.Router();

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.post('/verify-mobile', verifyMobile);
router.get('/verify-email', verifyEmailWebhook);

export default router;
