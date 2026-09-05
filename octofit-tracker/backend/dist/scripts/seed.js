"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([models_1.User.deleteMany({}), models_1.Team.deleteMany({}), models_1.Activity.deleteMany({}), models_1.Workout.deleteMany({})]);
        const users = await models_1.User.create([
            { name: 'Alex Morgan', email: 'alex@example.com', avatar: 'AM' },
            { name: 'Jamie Lee', email: 'jamie@example.com', avatar: 'JL' },
            { name: 'Taylor Kim', email: 'taylor@example.com', avatar: 'TK' },
        ]);
        await models_1.Team.create({
            name: 'Peak Performers',
            members: users.map((user) => user._id),
        });
        await models_1.Activity.create([
            { user: users[0]._id, type: 'running', duration: 35, distance: 5.2, points: 52 },
            { user: users[1]._id, type: 'strength', duration: 30, points: 40 },
            { user: users[2]._id, type: 'walking', duration: 45, distance: 3.8, points: 30 },
        ]);
        await models_1.Workout.create([
            { title: 'Quick Cardio', description: 'A short endurance session.', difficulty: 'beginner', exercises: ['Jog', 'High knees', 'Cooldown'] },
            { title: 'Strength Builder', description: 'A full-body strength circuit.', difficulty: 'intermediate', exercises: ['Squats', 'Push-ups', 'Plank'] },
        ]);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
