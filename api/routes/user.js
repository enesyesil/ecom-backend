import express from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware.js';
import { fetchUserProfile, updateUserAddressController } from '../controllers/userController.js';

const router = express.Router();

// Route to fetch user profile
router.get('/profile', authenticateJWT, fetchUserProfile);

// Route to update user address
router.put('/address', authenticateJWT, updateUserAddressController);

export default router;
