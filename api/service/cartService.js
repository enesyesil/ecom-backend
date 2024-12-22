import prisma from '../prisma/prismaClient.js';

// Add item to cart
export const addCartItem = async (userId, productId, quantity) => {
  const existingCartItem = await prisma.cart.findFirst({
    where: { userId, productId },
  });

  if (existingCartItem) {
    // Update quantity if the item already exists in the cart
    return prisma.cart.update({
      where: { id: existingCartItem.id },
      data: { quantity: existingCartItem.quantity + quantity },
    });
  }

  // Add new item to the cart
  return prisma.cart.create({
    data: { userId, productId, quantity },
  });
};

// Update a cart item's quantity
export const updateCartItem = async (cartItemId, quantity, userId) => {
  const cartItem = await prisma.cart.findUnique({
    where: { id: parseInt(cartItemId, 10) },
  });

  if (!cartItem || cartItem.userId !== userId) {
    throw new Error('You are not authorized to update this cart item');
  }

  return prisma.cart.update({
    where: { id: parseInt(cartItemId, 10) },
    data: { quantity },
  });
};

// Remove item from cart
export const removeCartItem = async (cartItemId) => {
  return prisma.cart.delete({ where: { id: parseInt(cartItemId, 10) } });
};

// Get all items in a user's cart
export const getCartItems = async (userId) => {
  return prisma.cart.findMany({
    where: { userId },
    include: { product: true },
  });
};
