import prisma from '../prisma/prismaClient.js';

import prisma from '../prisma/prismaClient.js';

export const placeOrderInDB = async (req, res) => {
  const userId = req.user?.id; // Ensure `userId` is retrieved from `req.user`
  const { items, total } = req.body;

  if (!items || !total) {
    return res.status(400).json({ message: 'Items and total are required' });
  }

  try {
    // Create the order and associated items
    const order = await prisma.order.create({
      data: {
        userId,
        total,
        dateOfPurchase: new Date(),
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
    console.error('Error placing order:', error.message);
    res.status(500).json({ message: 'Error placing order', error: error.message });
  }
};


export const getOrderHistoryFromDB = async (userId) => {
  return prisma.order.findMany({
    where: { userId },
    include: { product: true },
  });
};