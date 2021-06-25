import express from 'express';
const router = express.Router();
import {
  authUser,
  getUserProfile,
  registerUser,
  registerUserProd,
  updateUserProfile,
  updateProdProfile,
  getUsers,
  deleteUser,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser).get(protect, admin, getUsers);

router.route('/pro').post(registerUserProd);
router.post('/login', authUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route('/profilepro')
  .get(protect, getUserProfile)
  .put(protect, updateProdProfile);

router.route('/:id').delete(protect, admin, deleteUser);

export default router;
