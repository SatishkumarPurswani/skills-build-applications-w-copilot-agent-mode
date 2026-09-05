import mongoose from 'mongoose';
import { Activity, Team, User, Workout } from '../models';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([User.deleteMany({}), Team.deleteMany({}), Activity.deleteMany({}), Workout.deleteMany({})]);

    const users = await User.create([
      { name: 'Alex Morgan', email: 'alex@example.com', avatar: 'AM' },
      { name: 'Jamie Lee', email: 'jamie@example.com', avatar: 'JL' },
      { name: 'Taylor Kim', email: 'taylor@example.com', avatar: 'TK' },
    ]);

    await Team.create({
      name: 'Peak Performers',
      members: users.map((user: { _id: mongoose.Types.ObjectId }) => user._id),
    });
    await Activity.create([
      { user: users[0]._id, type: 'running', duration: 35, distance: 5.2, points: 52 },
      { user: users[1]._id, type: 'strength', duration: 30, points: 40 },
      { user: users[2]._id, type: 'walking', duration: 45, distance: 3.8, points: 30 },
    ]);
    await Workout.create([
      { title: 'Quick Cardio', description: 'A short endurance session.', difficulty: 'beginner', exercises: ['Jog', 'High knees', 'Cooldown'] },
      { title: 'Strength Builder', description: 'A full-body strength circuit.', difficulty: 'intermediate', exercises: ['Squats', 'Push-ups', 'Plank'] },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
