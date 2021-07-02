import express from 'express';

const router = express.Router();
import {
  createStockItem,
  getStock,
  deleteStock,
} from '../controllers/stockController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

router
  .route('/')
  .post(protect, admin, createStockItem)
  .get(protect, admin, getStock);
router.route('/:id').delete(protect, admin, deleteStock);

export default router;
