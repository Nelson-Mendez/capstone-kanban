// const express = require('express');
// const router = express.Router();
// const axios = require('axios');


// router.get("/auth", passport.authenticate("github"))
// router.get("/auth/callback", passport.authenticate(("github"), (req, res) => {
//   res.redirect("http://localhost:3000/user");
// }));



























// router.get("/", (req, res, next) => {

//   const {query } = req;
//   const {code } = query;

//   if(!code) {
//     return res.send({
//       success: false,
//       message: "error no code"
//     })
//   }

//   else{
//     axios
//     .post("https://github.com/login/oauth/access_token", {
//       client_id: "bf4285944652d709211c",
//       client_secret: "59bf0012edf7f87992cffd02d8bc934ff889ef9f",
//       code: code,
//     })
//     .then(response => {
//       const data = response.data;

//       res.send(data)
//     })
//     .catch(error => {
//       throw error
//     })
//   }



//   return res.send(console.log({code})
//   )
// })

// router.post("/", (req, res, next) => {

//   axios.post("https://github.com/login/oauth/access_token")


// });


// module.exports = router;
