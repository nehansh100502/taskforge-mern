import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String },

    role: {
      type: String,
      enum: ['admin', 'manager', 'member'],
      default: 'member'
    }
  },
  { timestamps: true }
);

// Password hash
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
    if (!this.password) return false; // 👈 prevents crash
    return await bcrypt.compare(enteredPassword, this.password);
  };

export default mongoose.model('User', userSchema);