import prisma from '../prisma/prismaClient.js';


// Register a new user
export const registerUser = async (userData) => {
  return prisma.user.create({ data: userData });
};

// Get user by email
export const getUserByEmail = async (email) => {
  return prisma.user.findUnique({ where: { email } });
};

// Update user profile
export const updateUserProfile = async (userId, updates) => {
  return prisma.user.update({
    where: { id: userId },
    data: updates,
  });
};

export const getUserProfileById = async (userId) => {
  return prisma.user.findUnique({
    where: { id: userId },
  });
};

// Update user address
export const updateUserAddress = async (req, res) => {
  const { address } = req.body;
  const userId = req.user.id; // Ensure req.user is populated by the middleware

  if (!address) {
    return res.status(400).json({ message: 'Address is required' });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { address },
    });

    res.status(200).json({ message: 'Address updated successfully', address: updatedUser.address });
  } catch (error) {
    console.error('Error updating address:', error);
    res.status(500).json({ message: 'Failed to update address', error: error.message });
  }
};
