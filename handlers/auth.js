const jwt = require('jsonwebtoken');
const keys = require('../config/dev');
const mongoose = require('mongoose');
const Client = mongoose.model('Client');

const signToken = user => {
  const timestamp = new Date().getTime();
  return jwt.sign({ uid: user._id, iat: timestamp }, keys.JWT_SECRET);
};

exports.signUp = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: 'You must provide email and password' });
  }

  try {
    // see if a user with given email exists
    const existingClient = await Client.findOne({ email }).exec();

    // if a client with email does exist, return an error
    if (existingClient) {
      res.status(422).send({ error: 'Email already exist' });
    }

    // if a client with the email does not exist, create new record
    const client = await new Client({ email, password }).save();

    res.json({ token: signToken(client) });
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.signIn = (req, res) => {
  // when user signs in, we send them back the token
  res.send({ token: signToken(req.client) });
};
