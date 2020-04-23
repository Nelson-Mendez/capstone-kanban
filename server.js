const express = require('express');
const cors = require('cors');
const passport = require("passport");
const path = require('path');
const GithubStrategy = require("passport-github").Strategy;
var bodyParser = require('body-parser')
const configStuff = require("./config");

const app = express();
const PORT = process.env.PORT || 8000;

// const authRouter = require ('./routes/authRoutes');
// const userRouter = require ('./routes/userRoutes');
const projectsRouter = require ('./routes/projectsRoutes');
const databaseRouter = require ('./routes/databaseRoutes');

let user = {};

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});
app.use(cors());
app.use(passport.initialize())
app.use(express.json());
app.use(bodyParser.json());

passport.use(new GithubStrategy({
  clientID: configStuff.clientID,
  clientSecret: configStuff.clientSecret,
  callbackURL: "https://simplified-kanban-nelson.herokuapp.com/auth/callback"
  },
  (accessToken, refreshToken, profile, cb) => {
    user = { ...profile };
    return cb(null, profile);
  }
));

app.get("/auth/", passport.authenticate("github"));
app.get("/auth/callback", passport.authenticate("github"), (req, res) => {
  res.redirect("/user");
});

app.get('/user', (req, res) => {
  res.send(user);
});

app.use('/project', projectsRouter);
app.use('/database', databaseRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); //relative path
  })
}

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});