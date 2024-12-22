import express from 'express';
import { viewSalesHistory, manageInventory } from '../controllers/adminController.js';
import { isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/sales', isAdmin, viewSalesHistory);
router.put('/inventory/:productId', isAdmin, manageInventory);



export default router;
