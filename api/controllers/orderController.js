import { placeOrderInDB, getOrderHistoryFromDB } from '../service/orderService.js';

export const placeOrder = async (req, res) => {
  try {
    const { userId, items } = req.body;
    const order = await placeOrderInDB(userId, items);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error placing order', error: error.message });
  }
};

export const getOrderHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const orderHistory = await getOrderHistoryFromDB(userId);
    res.status(200).json(orderHistory);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order history', error: error.message });
  }
};