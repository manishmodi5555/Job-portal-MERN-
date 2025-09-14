
import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  resumePath: { type: String, required: true },
  status: { type: String, enum: ['applied', 'reviewing', 'rejected', 'accepted'], default: 'applied' },
  appliedAt: { type: Date, default: Date.now }
}, { timestamps: true });

applicationSchema.index({ user: 1, job: 1 }, { unique: true });

export default mongoose.model('Application', applicationSchema);
