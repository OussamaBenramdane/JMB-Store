import express from 'express';
const router = express.Router();
import {
  authUser,
  getUserProfile,
  registerUser,
  registerUserProd,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser);
router.route('/pro').post(registerUserProd);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile);

export default router;
