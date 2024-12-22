import prisma from '../prisma/prismaClient.js'; // Adjust relative path as needed


// Get All Products
export const getAllProducts = async (_, res) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Add a New Product
export const addProduct = async (req, res) => {
  const { name, description, price, image } = req.body;

  // Check if the user has the admin role
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'You are not authorized to add products.' });
  }

  // Validation checks
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ message: 'Invalid product name.' });
  }
  if (!description || typeof description !== 'string' || description.trim() === '') {
    return res.status(400).json({ message: 'Invalid product description.' });
  }
  if (!price || typeof price !== 'number' || price <= 0) {
    return res.status(400).json({ message: 'Invalid product price.' });
  }
  if (!image || typeof image !== 'string' || image.trim() === '') {
    return res.status(400).json({ message: 'Invalid product image.' });
  }

  // Proceed if validation and role checks pass
  try {
    const product = await prisma.product.create({
      data: { name, description, price, image },
    });
    res.status(201).json(product);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
