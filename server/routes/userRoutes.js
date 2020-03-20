const router = require("express").Router();

router.get("/", (req, res) => {
    console.log("getting user data");
    return res.send(user);
});

module.exports = router