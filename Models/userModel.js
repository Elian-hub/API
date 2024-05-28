const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { type } = require('os');
const usersSchema = new mongoose.Schema({
  Username: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'Provide your email'],
    validate: [validator.isEmail, 'Provide a valid email'],
    unique: true,
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'Provide your password'],
    minlength: 8,
    select: false,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpire: Date,
  },
  confirmPassword: {
    type: String,
    required: [true, 'Confirm your password'],
    // runs on onSave or create
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
  role: {
    type: String,
    default: 'user',
  },
  jobApplied: {
    title: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
    },
    location: {
      type: String,
    },
    salary: {
      type: String,
    },
  },
});
// Runs when the data has been received from the browser and being taken to the database
usersSchema.pre('save', async function (next) {
  // if (this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});
usersSchema.methods.correctPassword = async function (candidate, userPassword) {
  return await bcrypt.compare(candidate, userPassword);
};

const Users = mongoose.model('Users', usersSchema);

module.exports = { Users };
