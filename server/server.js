const express = require('express');
const cors = require('cors');
const passport = require("passport");
const GithubStrategy = require("passport-github").Strategy;
const configStuff = require("./config");

const app = express();
// const authRouter = require ('./routes/authRoutes');
const userRouter = require ('./routes/userRoutes');
const projectsRouter = require ('./routes/projectsRoutes');
const databaseRouter = require ('./routes/databaseRoutes');

let user = {};

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});



passport.use(new GithubStrategy({
  clientID: configStuff.clientID,
  clientSecret: configStuff.clientSecret,
  callbackURL: "/auth/callback"
  },
  (accessToken, refreshToken, profile, cb) => {
    console.log(JSON.stringify(profile));
    user = { ...profile };
    return cb(null, profile);
  }
));



app.use(cors());
app.use(passport.initialize())
app.use(express.json());

app.get("/auth/", passport.authenticate("github"));
app.get("/auth/callback", passport.authenticate("github"), (req, res) => {
  res.redirect("http://localhost:3000/user");
});

app.get('/user', (req, res) => {
  res.send(user);
});

app.use('/project', projectsRouter);
app.use('/database', databaseRouter);

app.listen(8080, () => {
  console.log('server running on 8080');
});