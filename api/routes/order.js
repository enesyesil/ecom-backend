import express from 'express';
import { placeOrder, getOrderHistory } from '../controllers/orderController.js';

const router = express.Router();

// Route to place an order
router.post('/', placeOrder);

// Route to get order history
router.get('/:userId', getOrderHistory);

export default router;