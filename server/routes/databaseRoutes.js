const router = require("express").Router();

import DataBase from "../database";

router.get("/users", async (req, res) => {

    try {
        let blogs = await DataBase.blogs.all();
        res.json.users
    }
    catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
});

module.exports = router