import express from 'express';
import { getAllProducts, addProduct } from '../controllers/productController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const productRouter = express.Router();

productRouter.get('/', getAllProducts);           // Public route
productRouter.post('/', authenticate, addProduct); // Admin-protected route

export default productRouter;
