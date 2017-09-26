const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Schema } = mongoose;
const keys = require('../config/dev');

const clientSchema = new Schema({
  email: {
    type: String,
    required: 'Please Enter Your Email Address',
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 7
  }
});

clientSchema.pre('save', async function(next) {
  const user = this;

  // only hash password that has been modified
  if (!user.isModified('password')) {
    return next();
  }
  try {
    // generate a salt
    const salt = await bcrypt.genSalt(10);
    // hash the password with the new salt
    const hash = await bcrypt.hash(user.password, salt);
		//overide the cleartext password with the hashed one
    user.password = hash;
    next();
  } catch (e) {
    next(e);
  }
});

module.exports = mongoose.model('Client', clientSchema);
