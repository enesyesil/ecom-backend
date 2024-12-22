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
export const updateUserAddress = async (userId, address) => {
  return prisma.user.update({
    where: { id: userId },
    data: { address },
  });
};