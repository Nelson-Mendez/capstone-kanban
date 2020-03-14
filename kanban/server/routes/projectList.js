const router = require("express").Router();


router.get("/", (req, res) => {
    console.log("projectList sent a thing?");
    return res.status(200).send(foo);
});

module.exports = router