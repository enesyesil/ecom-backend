import prisma from '../prisma/prismaClient.js';

// Get products with filtering, sorting, and pagination
export const getProducts = async ({ category, brand, sortBy, order, page, limit }) => {
  const skip = (page - 1) * limit;

  const where = {};
  if (category) where.category = category;
  if (brand) where.brand = brand;

  const orderBy = {};
  if (sortBy) orderBy[sortBy] = order;

  return prisma.product.findMany({
    where,
    orderBy,
    skip,
    take: parseInt(limit, 10),
  });
};

// Get product by ID
export const getProductById = async (id) => {
  return prisma.product.findUnique({ where: { id: parseInt(id, 10) } });
};

// Create a new product (for admins)
export const createProduct = async (productData) => {
  return prisma.product.create({ data: productData });
};

// Update product inventory or details (for admins)
export const updateProduct = async (productId, updates) => {
  return prisma.product.update({
    where: { id: productId },
    data: updates,
  });
};
