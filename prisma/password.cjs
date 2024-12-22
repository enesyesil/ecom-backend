const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

(async () => {
  try {
    const users = [
      { email: 'jon.snow@example.com', password: 'castle_black' },
      { email: 'harry.potter@example.com', password: 'abrakadabra' },
      { email: 'pep_guardiola@example.com', password: 'tiki_taka45' },
      { email: 'ruben.amorim@example.com', password: 'portugalbest' },
    ];

    for (const user of users) {
      user.password = await bcrypt.hash(user.password, 10);
      await prisma.user.upsert({
        where: { email: user.email },
        update: { password: user.password },
        create: user,
      });
    }

    console.log('Users seeded successfully with upsert!');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await prisma.$disconnect();
  }
})();
