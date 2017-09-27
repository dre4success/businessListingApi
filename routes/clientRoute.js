const Auth = require("../handlers/auth");
const passportService = require("../handlers/passport");
const passport = require('passport');

const requireSignin = passport.authenticate('local', {session: false})

module.exports = app => {
	app.post("/api/signup", Auth.signUp);
	app.post("/api/signin", requireSignin, Auth.signIn);
};
