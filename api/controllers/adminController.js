// File: controllers/adminController.js
import { getSalesHistory, updateInventory } from '../service/adminService.js';


export const viewSalesHistory = async (req, res) => {
  try {
    const salesHistory = await getSalesHistory();
    res.status(200).json(salesHistory);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sales history', error: error.message });
  }
};

export const manageInventory = async (req, res) => {
  try {
    const { productId } = req.params;
    const updates = req.body;
    const updatedProduct = await updateInventory(productId, updates);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error managing inventory', error: error.message });
  }
};

