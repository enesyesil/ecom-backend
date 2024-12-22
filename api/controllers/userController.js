import { getUserProfileById, updateUserAddress } from 'file:///Users/enesyesil/Documents/GitHub/my-commerce/my-commerce-backend/api/service/userService.js';

export const fetchUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from JWT
    const user = await getUserProfileById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      id: user.id,
      email: user.email,
      address: user.address,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
};

export const updateUserAddressController = async (req, res) => {
  const { address } = req.body;

  try {
    const userId = req.user.id; // Extracted from JWT
    const updatedUser = await updateUserAddress(userId, address);

    res.status(200).json({
      message: 'Address updated successfully',
      address: updatedUser.address,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update address' });
  }
};
