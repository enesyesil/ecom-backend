import express from 'express';
import { listItems, getItemDetails } from '../controllers/catalogController.js';

const router = express.Router();

// List all items with filters
router.get('/', listItems);

// Get item details by ID
router.get('/:id', getItemDetails);

export default router;
