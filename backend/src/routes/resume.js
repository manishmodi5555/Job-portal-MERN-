
import express from 'express';
import auth from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';
import User from '../models/User.js';
import path from 'path';

const router = express.Router();

router.post('/upload', auth, (req, res) => {
  upload.single('resume')(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ message: err.message || 'Upload failed' });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    try {
      const filePath = `/uploads/resumes/${req.file.filename}`;
      await User.findByIdAndUpdate(req.user.id, { resumePath: filePath });
      return res.status(201).json({ message: 'Resume uploaded', resumePath: filePath });
    } catch (e) {
      return res.status(500).json({ message: 'Server error', error: e.message });
    }
  });
});

export default router;
