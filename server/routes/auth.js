const express = require('express');
const passport = require('passport');
const router = express.Router();

// Home http://localhost:5000/
router.get("/", (req, res) => {
    return res.send("bro")
//   console.log('----- User Info? -----');
//   console.log('User', req.user);
//   res.send(`<div>
//     <h1>Home</h1>
//     <a href="/">home</a>
//     ${
//       req.user !== undefined
//         ? `
//           <a href="/profile">Profile</a>
//           <a href="/logout">Logout</a>
//         `
//         : `<a href="/login">Login with GitHub</a>`
//     }
//   </div>`);
});

router.get('/loginFailed', (req, res, next) => {
  res.send('<h1 style="color: red">You shall not pass!</h1>');
})

// GitHub Authenticate http://localhost:5000/login
router.get('/login', passport.authenticate('github'));

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
})

// GitHub Auth CallBack/Redirect http://localhost:5000/auth
router.get(
  '/',
  passport.authenticate('github', {
    successRedirect: '/',
    failureRedirect: '/loginFailed'
  })
);

router.get('/profile', (req, res) => {
  if (req.user === undefined) res.redirect('/');
  res.json(req.user);
});

module.exports = router;
