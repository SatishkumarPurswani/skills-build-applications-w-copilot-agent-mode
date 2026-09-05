import { Router } from 'express';
import { Activity, Team, User, Workout } from './models';

const router = Router();

router.get('/', (_request, response) => {
  response.json({ service: 'octofit-tracker-api', status: 'ok' });
});

router.get('/users/', async (_request, response, next) => {
  try {
    response.json(await User.find().sort({ name: 1 }));
  } catch (error) {
    next(error);
  }
});

router.post('/users/', async (request, response, next) => {
  try {
    const user = await User.create(request.body);
    response.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.get('/teams/', async (_request, response, next) => {
  try {
    response.json(await Team.find().populate('members', 'name email avatar').sort({ name: 1 }));
  } catch (error) {
    next(error);
  }
});

router.post('/teams/', async (request, response, next) => {
  try {
    const team = await Team.create(request.body);
    response.status(201).json(team);
  } catch (error) {
    next(error);
  }
});

router.get('/activities/', async (_request, response, next) => {
  try {
    response.json(await Activity.find().populate('user', 'name avatar').sort({ date: -1 }));
  } catch (error) {
    next(error);
  }
});

router.post('/activities/', async (request, response, next) => {
  try {
    const activity = await Activity.create(request.body);
    response.status(201).json(await activity.populate('user', 'name avatar'));
  } catch (error) {
    next(error);
  }
});

router.get('/leaderboard/', async (_request, response, next) => {
  try {
    const leaderboard = await Activity.aggregate([
      { $group: { _id: '$user', points: { $sum: '$points' }, activities: { $sum: 1 } } },
      { $sort: { points: -1 } },
      { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
      { $unwind: '$user' },
      { $project: { _id: 0, user: { _id: '$user._id', name: '$user.name', avatar: '$user.avatar' }, points: 1, activities: 1 } },
    ]);
    response.json(leaderboard);
  } catch (error) {
    next(error);
  }
});

router.get('/workouts/', async (_request, response, next) => {
  try {
    response.json(await Workout.find().sort({ difficulty: 1, title: 1 }));
  } catch (error) {
    next(error);
  }
});

router.post('/workouts/', async (request, response, next) => {
  try {
    const workout = await Workout.create(request.body);
    response.status(201).json(workout);
  } catch (error) {
    next(error);
  }
});

export default router;