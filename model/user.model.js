const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  token: {
    type: String,
  },
  clerkId: {
    type: String,
  },
  isGoogleUser: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

userSchema.pre('save', async function () {
  if (!this.isModified('password') || !this.password) return;
  const salt = await bcryptjs.genSalt(10);
  const hash = await bcryptjs.hash(this.password, salt);
  this.password = hash;
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcryptjs.compare(candidatePassword, this.password);
};

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
