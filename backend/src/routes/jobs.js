
import express from 'express';
import auth from '../middleware/auth.js';
import Job from '../models/Job.js';
import User from '../models/User.js';
import Application from '../models/Application.js';

const router = express.Router();

// GET /api/jobs - list all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST /api/jobs/apply/:jobId - apply using latest uploaded resume
router.post('/apply/:jobId', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    const user = await User.findById(req.user.id);
    if (!user || !user.resumePath) {
      return res.status(400).json({ message: 'Please upload your resume first' });
    }

    const app = await Application.create({
      user: user._id,
      job: job._id,
      resumePath: user.resumePath,
      status: 'applied'
    });

    res.status(201).json({ message: 'Applied successfully', application: app });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'You already applied to this job' });
    }
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
