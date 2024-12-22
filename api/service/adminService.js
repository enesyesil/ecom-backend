import prisma from '../prisma/prismaClient.js';

// Get sales history
export const getSalesHistory = async () => {
  return prisma.order.findMany({
    include: { user: true, product: true },
  });
};

// Update inventory
export const updateInventory = async (productId, updates) => {
  return prisma.product.update({
    where: { id: parseInt(productId, 10) },
    data: updates,
  });
};
