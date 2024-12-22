import { placeOrderInDB, getOrderHistoryFromDB } from '../service/orderService.js';

export const placeOrder = async (req, res) => {
  const userId = req.user.id;
  const { items, total } = req.body;

  if (!items || !total) {
    return res.status(400).json({ message: 'Items and total are required' });
  }

  try {
    const order = await prisma.order.create({
      data: {
        userId,
        total,
        items: {
          createMany: {
            data: items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
            })),
          },
        },
      },
    });

    res.status(200).json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Failed to place order', error: error.message });
  }
};


export const getOrderHistory = async (req, res) => {
  const userId = req.user.id;

  try {
    const orders = await prisma.order.findMany({
      where: { userId },
      include: { items: true },
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching order history:', error);
    res.status(500).json({ message: 'Failed to fetch order history', error: error.message });
  }
};
