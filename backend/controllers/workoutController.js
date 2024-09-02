const express = require('express');
const Workout = require('../models/workoutModel');

const router = express.Router();

// GET all workouts
router.get('/', async (req, res) => {
  try {
    const workouts = await Workout.find({});
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

// GET a single workout
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const workout = await Workout.findById(id);

    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workout' });
  }
});

// POST a new workout
router.post('/', async (req, res) => {
  const { title, load, reps } = req.body;

  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE a workout
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const workout = await Workout.findByIdAndDelete(id);

    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    res.status(200).json({ message: 'Workout deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete workout' });
  }
});

// UPDATE a workout
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const workout = await Workout.findByIdAndUpdate(id, updates, { new: true });

    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update workout' });
  }
});

module.exports = router;
