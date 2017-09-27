// To authenticate user when they require a route that needs authentication

const passport = require('passport');
const mongoose = require('mongoose');
const Client = mongoose.model('Client');
const keys = require('../config/dev');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

/* 
  Sign in user when using passport local strategy
  Authentication
*/

// Create local strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(
  localOptions,
  async (email, password, done) => {
    try {
      // verify username and password
      const client = await Client.findOne({ email });
      if (!client) {
        return done(null, false);
      }
      // compare passwords
      if (!await client.comparePassword(password)) {
        return done(null, false);
      }
      
      return done(null, client);
      
    } catch (err) {
      console.error(err);
    }
  }
);

/* 
   authorization, when a user wants to make an authenticated request
   to a protected route, we verify the token
*/
// setup Options for jwt strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: keys.JWT_SECRET
}

// Create Jwt Strategy
const jwtAuthorize = new JwtStrategy(jwtOptions, async (payload, done) => {

  try {
    // see if the client ID in the payload exists
    const client = await Client.findOne({ _id: payload.uid});
    if(!client) {
      return done(null, false);
    }
    return done(null, client);
  } catch(e) {
    res.status(400).send(err)
  }

});

passport.use(localLogin);
passport.use(jwtAuthorize);