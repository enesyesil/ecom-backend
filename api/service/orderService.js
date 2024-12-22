import prisma from '../prisma/prismaClient.js';

export const placeOrderInDB = async (userId, items) => {
  const orderData = items.map((item) => ({
    userId,
    productId: item.productId,
    quantity: item.quantity,
    dateOfPurchase: new Date(),
  }));

  const orders = await prisma.$transaction([
    prisma.order.createMany({ data: orderData }),
    ...items.map((item) =>
      prisma.product.update({
        where: { id: item.productId },
        data: { quantity: { decrement: item.quantity } },
      })
    ),
  ]);

  return orders;
};

export const getOrderHistoryFromDB = async (userId) => {
  return prisma.order.findMany({
    where: { userId },
    include: { product: true },
  });
};