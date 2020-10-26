const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

router.get('/login', (req, res, next) => {
  res.clearCookie("token");
  res.render('login');
});

router.post('/login', (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.redirect('/login');
    }
    res.cookie("token", user.toAuthJson().token);
    return res.redirect('/openings')
  })(req, res, next);
});

router.get('/register', (req, res, next) => {
  res.render('register');
});

router.post('/register', async (req, res, next) => {
  const user = new User(req.body);
  await user.setHashedPassword();

  user.save((err, savedUser) => {
    if (err) console.log("Error while saving user: ", err);

    res.redirect('/login');
  })
})

module.exports = router;
