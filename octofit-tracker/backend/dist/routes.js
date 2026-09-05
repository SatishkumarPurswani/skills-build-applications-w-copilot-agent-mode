"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_1 = require("./models");
const router = (0, express_1.Router)();
router.get('/', (_request, response) => {
    response.json({ service: 'octofit-tracker-api', status: 'ok' });
});
router.get('/users', async (_request, response, next) => {
    try {
        response.json(await models_1.User.find().sort({ name: 1 }));
    }
    catch (error) {
        next(error);
    }
});
router.post('/users', async (request, response, next) => {
    try {
        const user = await models_1.User.create(request.body);
        response.status(201).json(user);
    }
    catch (error) {
        next(error);
    }
});
router.get('/teams', async (_request, response, next) => {
    try {
        response.json(await models_1.Team.find().populate('members', 'name email avatar').sort({ name: 1 }));
    }
    catch (error) {
        next(error);
    }
});
router.post('/teams', async (request, response, next) => {
    try {
        const team = await models_1.Team.create(request.body);
        response.status(201).json(team);
    }
    catch (error) {
        next(error);
    }
});
router.get('/activities', async (_request, response, next) => {
    try {
        response.json(await models_1.Activity.find().populate('user', 'name avatar').sort({ date: -1 }));
    }
    catch (error) {
        next(error);
    }
});
router.post('/activities', async (request, response, next) => {
    try {
        const activity = await models_1.Activity.create(request.body);
        response.status(201).json(await activity.populate('user', 'name avatar'));
    }
    catch (error) {
        next(error);
    }
});
router.get('/leaderboard', async (_request, response, next) => {
    try {
        const leaderboard = await models_1.Activity.aggregate([
            { $group: { _id: '$user', points: { $sum: '$points' }, activities: { $sum: 1 } } },
            { $sort: { points: -1 } },
            { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
            { $unwind: '$user' },
            { $project: { _id: 0, user: { _id: '$user._id', name: '$user.name', avatar: '$user.avatar' }, points: 1, activities: 1 } },
        ]);
        response.json(leaderboard);
    }
    catch (error) {
        next(error);
    }
});
router.get('/workouts', async (_request, response, next) => {
    try {
        response.json(await models_1.Workout.find().sort({ difficulty: 1, title: 1 }));
    }
    catch (error) {
        next(error);
    }
});
router.post('/workouts', async (request, response, next) => {
    try {
        const workout = await models_1.Workout.create(request.body);
        response.status(201).json(workout);
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
