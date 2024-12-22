import express from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware.js';
import { addToCart, updateCart, removeFromCart, viewCart } from '../controllers/cartController.js';

const router = express.Router();

// Add item to cart
router.post('/add', authenticateJWT, addToCart);

// Update cart item
router.put('/:id', authenticateJWT, updateCart);

// Remove item from cart
router.delete('/remove/:id', authenticateJWT, removeFromCart);

// View cart
router.get('/', authenticateJWT, viewCart);

export default router;
