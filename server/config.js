module.exports = {

  passport: {
    clientID: 'bf4285944652d709211c', // comes from Github App https://github.com/settings/applications/new
    clientSecret: '59bf0012edf7f87992cffd02d8bc934ff889ef9f', // comes from Github App
  },
  development: {
    client: "mysql",
    connection: {
      host: "m7nj9dclezfq7ax1.cbetxkdyhwsb.us-east-1.rds.amazonaws.com	",
      user: "qur6dokbfxi1yclj",
      password: "w0m7sij10i2epeg9",
      database: "mgl4e4gxwybswmog",
      charset: "utf8",
      insecureAuth: true
    }
  },
  production: {
    client: "mysql",
    connection: process.env.JAWSDB_URL
  }
};

   