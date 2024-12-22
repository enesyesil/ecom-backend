require('dotenv').config(); // Load environment variables
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const seedData = async () => {
  try {
    console.log('Seeding started...');

    // Users
    const users = [
      { email: 'pep.guardiola@example.com', password: 'password_pep', role: 'admin' },
      { email: 'jurgen.klopp@example.com', password: 'password_klopp', role: 'user' },
      { email: 'kylian.mbappe@example.com', password: 'password_mbappe', role: 'user' },
      { email: 'erling.haaland@example.com', password: 'password_haaland', role: 'user' },
      { email: 'lionel.messi@example.com', password: 'password_messi', role: 'user' },
    ];

    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await prisma.user.upsert({
        where: { email: user.email },
        update: {}, // Do nothing if the user exists
        create: {
          email: user.email,
          password: hashedPassword,
          role: user.role,
        },
      });
    }

    console.log('Users seeded successfully!');

    // Products
    const products = [
      { name: 'AI-Powered Drone', description: 'Advanced drone with AI.', price: 1500, image: '/images/ai_drone.jpg', quantity: 25 },
      { name: 'AR Smart Glasses', description: 'Augmented reality glasses.', price: 1200, image: '/images/ar_glasses.jpg', quantity: 15 },
      { name: 'Quantum Computer', description: 'High-performance quantum computing.', price: 100000, image: '/images/quantum_computer.jpg', quantity: 5 },
      { name: 'AI Football Analytics Tool', description: 'Football tactics analyzer.', price: 500, image: '/images/football_analytics.jpg', quantity: 50 },
      { name: 'Wireless Earbuds Pro', description: 'Noise-cancelling earbuds.', price: 250, image: '/images/wireless_earbuds.jpg', quantity: 40 },
      { name: '4K Ultra HD Camera', description: 'Professional-grade camera.', price: 2000, image: '/images/4k_camera.jpg', quantity: 10 },
      { name: 'Virtual Reality Headset', description: 'Immersive VR headset.', price: 800, image: '/images/vr_headset.jpg', quantity: 20 },
      { name: 'Portable Solar Charger', description: 'Eco-friendly charger.', price: 150, image: '/images/solar_charger.jpg', quantity: 35 },
      { name: 'Smartwatch Series X', description: 'AI-driven smartwatch.', price: 500, image: '/images/smartwatch.jpg', quantity: 50 },
      { name: 'Smart Ring', description: 'Wearable fitness tracker.', price: 300, image: '/images/smart_ring.jpg', quantity: 25 },
      { name: 'Gaming Laptop Xtreme', description: 'High-end gaming laptop.', price: 2500, image: '/images/gaming_laptop.jpg', quantity: 20 },
      { name: 'Electric Scooter Pro', description: 'Portable electric scooter.', price: 900, image: '/images/electric_scooter.jpg', quantity: 15 },
      { name: 'Smart Thermostat', description: 'Control home temperature.', price: 250, image: '/images/smart_thermostat.jpg', quantity: 40 },
      { name: 'Robot Vacuum Cleaner', description: 'Smart vacuum cleaner.', price: 400, image: '/images/robot_vacuum.jpg', quantity: 20 },
      { name: 'Smart Speaker Hub', description: 'Voice-controlled speaker.', price: 150, image: '/images/smart_speaker.jpg', quantity: 35 },
      { name: 'Mechanical Keyboard Pro', description: 'Tactile keyboard.', price: 200, image: '/images/mechanical_keyboard.jpg', quantity: 50 },
      { name: 'AI Personal Assistant', description: 'Voice-controlled AI assistant.', price: 700, image: '/images/ai_assistant.jpg', quantity: 10 },
      { name: 'Smart Doorbell', description: 'Video-enabled doorbell.', price: 180, image: '/images/smart_doorbell.jpg', quantity: 25 },
      { name: 'Streaming Stick 4K', description: 'Stream your favorite shows.', price: 50, image: '/images/streaming_stick.jpg', quantity: 60 },
      { name: 'Fitness Tracker Band', description: 'Monitor your workouts.', price: 100, image: '/images/fitness_tracker.jpg', quantity: 40 },
      { name: 'Bluetooth Tracker', description: 'Locate lost items.', price: 40, image: '/images/bluetooth_tracker.jpg', quantity: 100 },
      { name: 'Portable Projector', description: 'Compact projector.', price: 350, image: '/images/portable_projector.jpg', quantity: 25 },
      { name: 'Smart Coffee Maker', description: 'Voice-controlled coffee machine.', price: 300, image: '/images/smart_coffee_maker.jpg', quantity: 15 },
      { name: 'Drone with 4K Camera', description: 'Drone with advanced video.', price: 1200, image: '/images/drone_4k.jpg', quantity: 10 },
      { name: 'Robot Dog Companion', description: 'AI-driven robot dog.', price: 4000, image: '/images/robot_dog.jpg', quantity: 5 },
      { name: 'AI Music Generator', description: 'AI-based music creator.', price: 100, image: '/images/ai_music.jpg', quantity: 30 },
      { name: 'Smart Glasses AR+', description: 'Next-gen AR glasses.', price: 1500, image: '/images/smart_glasses_ar_plus.jpg', quantity: 12 },
      { name: '5G Router Pro', description: 'High-speed 5G router.', price: 600, image: '/images/5g_router.jpg', quantity: 25 },
      { name: 'Advanced Smart Mirror', description: 'Interactive smart mirror for your home.', price: 1200, image: '/images/smart_mirror.jpg', quantity: 15 },
    ];

    await prisma.product.createMany({
      data: products,
      skipDuplicates: true, // Avoid duplicates
    });
    console.log('Products seeded successfully!');

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
};

seedData();
