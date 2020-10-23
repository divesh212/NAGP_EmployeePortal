const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user')

passport.use(new LocalStrategy((username, password, done) => {

    User.findOne({ username }, (err, user) => {
        if (err) {
            return done(err);
        }

        if (!user) {
            return done(null, false, { message: 'User not found!' });
        }

        if (!user.validatePassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
    })
}))