import { getProducts, getProductById } from '../service/productService.js';

// List items with filters, sorting, and pagination
export const listItems = async (req, res) => {
  const { category, brand, sortBy, order = 'asc', page = 1, limit = 30 } = req.query;

  try {
    const products = await getProducts({ category, brand, sortBy, order, page, limit });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch catalog items' });
  }
};

// Get item details by ID
export const getItemDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await getProductById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product details' });
  }
};
