import express from 'express';
import multer from 'multer';
import { requireAuth } from '../middleware/authMiddleware.js';
import { companyValidation } from '../middleware/validators.js';
import { registerCompany, getProfile, updateProfile, uploadImage } from '../controllers/companyController.js';

const router = express.Router();
const upload = multer({ dest: '/tmp/uploads' });

router.post('/register', requireAuth, companyValidation, registerCompany);
router.get('/profile', requireAuth, getProfile);
router.put('/profile', requireAuth, updateProfile);
router.post('/upload-logo', requireAuth, upload.single('file'), uploadImage);
router.post('/upload-banner', requireAuth, upload.single('file'), uploadImage);

export default router;
