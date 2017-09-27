const Auth = require("../handlers/auth");
const passportService = require("../handlers/passport");
const passport = require('passport');

const requireSignin = passport.authenticate('local', {session: false})

module.exports = app => {
	app.post("/api/client/signup", Auth.signUp);
	app.post("/api/client/signin", requireSignin, Auth.signIn);
};
