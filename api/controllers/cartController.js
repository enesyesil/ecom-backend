import { addCartItem, updateCartItem, removeCartItem, getCartItems } from '../service/cartService.js';

export const addToCart = async (req, res) => {
  const userId = req.user.id; // Extracted from JWT
  const { productId, quantity } = req.body;

  try {
    const cartItem = await addCartItem(userId, productId, quantity);
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCart = async (req, res) => {
  const userId = req.user.id; // Extracted from JWT
  const { id } = req.params; // Cart item ID
  const { quantity } = req.body;

  try {
    // Ensure the cart item belongs to the authenticated user
    const updatedItem = await updateCartItem(id, quantity, userId);
    res.status(200).json({ message: 'Cart updated successfully', updatedItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  const { id } = req.params;

  try {
    await removeCartItem(id);
    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const viewCart = async (req, res) => {
  const userId = req.user.id; // Extracted from JWT

  try {
    const cartItems = await getCartItems(userId);
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
