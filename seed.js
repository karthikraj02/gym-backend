const mongoose = require('mongoose');
require('dotenv').config();

const Pass = require('./models/Pass');
const Class = require('./models/Class');

const passes = [
  {
    name: 'Vajra Elite',
    tier: 'Tier 01',
    price: 2999,
    period: '/mo',
    features: [
      'All group classes — unlimited',
      'Access to all Elite & PRO gyms',
      'At-home live workouts',
      'AI-powered training plans',
      'Priority class booking',
    ],
    featured: true,
    badge: 'MOST POPULAR',
    durationDays: 30,
  },
  {
    name: 'Vajra Pro',
    tier: 'Tier 02',
    price: 1499,
    period: '/mo',
    features: [
      'All PRO gyms — unlimited',
      '2 Elite gym sessions/month',
      'At-home live workouts',
      'Nutrition tracking',
    ],
    featured: false,
    durationDays: 30,
  },
  {
    name: 'Vajra Play',
    tier: 'Tier 03',
    price: 999,
    period: '/mo',
    features: [
      'Badminton, Swimming & sports',
      'Guaranteed playing partner',
      'Expert guided sessions',
      'Multi-sport access',
    ],
    featured: false,
    durationDays: 30,
  },
  {
    name: 'Vajra Select',
    tier: 'Tier 04',
    price: 699,
    period: '/mo',
    features: [
      'Single center of your choice',
      'Guest visits to other centers',
      'At-home live workouts',
      'Personal trainer sessions',
    ],
    featured: false,
    durationDays: 30,
  },
];

const classes = [
  {
    name: 'Iron Protocol',
    tag: 'Strength',
    category: 'Strength',
    description: 'Heavy compound lifts with real-time coaching feedback and progressive overload tracking.',
    emoji: '💪',
    schedule: 'Mon, Wed, Fri — 06:00 AM',
    trainer: 'Coach Arjun',
    capacity: 25,
  },
  {
    name: 'Storm MMA',
    tag: 'Combat',
    category: 'Combat',
    description: 'Mixed martial arts fundamentals, cardio boxing, and reflex training for all levels.',
    emoji: '🥊',
    schedule: 'Tue, Thu — 07:00 AM',
    trainer: 'Coach Meera',
    capacity: 20,
  },
  {
    name: 'Zero Gravity Yoga',
    tag: 'Recovery',
    category: 'Recovery',
    description: 'Mobility, breathwork and mindfulness for complete physical and mental recovery.',
    emoji: '🧘',
    schedule: 'Daily — 07:00 AM',
    trainer: 'Guru Priya',
    capacity: 30,
  },
  {
    name: 'Plasma HIIT',
    tag: 'Cardio',
    category: 'Cardio',
    description: 'High-intensity intervals designed to torch calories and build explosive endurance.',
    emoji: '⚡',
    schedule: 'Mon, Wed, Fri — 06:00 PM',
    trainer: 'Coach Vikram',
    capacity: 25,
  },
  {
    name: 'Velocity Run',
    tag: 'Endurance',
    category: 'Endurance',
    description: 'Treadmill, track drills, and VO2 max training with biometric feedback loops.',
    emoji: '🏃',
    schedule: 'Tue, Thu, Sat — 05:30 AM',
    trainer: 'Coach Ravi',
    capacity: 20,
  },
  {
    name: 'Kinetic Flow',
    tag: 'Functional',
    category: 'Functional',
    description: 'Gymnastics-inspired movement patterns to build total body athleticism.',
    emoji: '🤸',
    schedule: 'Mon, Wed — 05:00 PM',
    trainer: 'Coach Ananya',
    capacity: 18,
  },
  {
    name: 'Hydro Combat',
    tag: 'Aqua',
    category: 'Aqua',
    description: 'Pool-based resistance training and swim drills for low-impact high-output results.',
    emoji: '🌊',
    schedule: 'Sat, Sun — 08:00 AM',
    trainer: 'Coach Deepa',
    capacity: 15,
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('⚡ Connected to MongoDB');

    // Clear existing data
    await Pass.deleteMany({});
    await Class.deleteMany({});
    console.log('🗑  Cleared old passes and classes');

    // Insert seed data
    await Pass.insertMany(passes);
    console.log(`✅ Seeded ${passes.length} passes`);

    await Class.insertMany(classes);
    console.log(`✅ Seeded ${classes.length} classes`);

    console.log('\n🔥 Seed complete! Vajra database is ready.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
}

seed();
