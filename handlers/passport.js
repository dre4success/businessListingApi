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
*/

// Create local strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(
  localOptions,
  async (email, password, done) => {
    try {
      // verify username and password
      const client = await Client.findOne({ email }).exec();
      if (!client) {
        return done(null, false, {message: 'Incorrect Email or Password'});
        // return [false, { message: 'Incorrect email or password' }];
      }

      // compare passwords
      if (!await client.comparePassword(password)) {
				//return [false, { message: 'Incorrect password or email' }];
				return done(null, false, {message: 'Incorrect Email or Password'});
				
			}
			
      return done(null, client);
    } catch (err) {
      console.error(err)
    }
	});
	
	passport.use(localLogin);
