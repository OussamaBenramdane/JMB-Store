import asyncHandler from 'express-async-handler';
import Stock from '../models/stockModel.js';

// @desc    Create a stock item
// @route   POST /api/stock
// @access  Private/Admin
const createStockItem = asyncHandler(async (req, res) => {
  const { name, price, qty, lequdationDate, receptionDate } = req.body;

  if (name && price.length === 0) {
    res.status(400);
    throw new Error('No items');
    return;
  } else {
    const item = new Stock({
      user: req.user._id,
      name,
      price,
      qty,
      lequdationDate,
      receptionDate,
    });

    const createdItem = await item.save();

    res.status(201).json(createdItem);
  }
});

//@decs Fetch All stock
//@route Fetch GET /api/stock
//@access Public

const getStock = asyncHandler(async (req, res) => {
  const stocks = await Stock.find({});
  res.json(stocks);
});

// @desc    Delete a stock item
// @route   DELETE /api/stock/:id
// @access  Private/Admin
const deleteStock = asyncHandler(async (req, res) => {
  const item = await Stock.findById(req.params.id);

  if (item) {
    await item.remove();
    res.json({ message: 'Stock removed' });
  } else {
    res.status(404);
    throw new Error('Stock not found');
  }
});

export { createStockItem, getStock, deleteStock };
