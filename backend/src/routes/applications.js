
import express from 'express';
import auth from '../middleware/auth.js';
import Application from '../models/Application.js';

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const apps = await Application.find({ user: req.user.id })
      .populate('job', 'title company location')
      .sort({ createdAt: -1 });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
