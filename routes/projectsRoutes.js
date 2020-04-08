const router = require("express").Router();

noteList = []

router.get("/", (req, res) => {
    return res.status(200).send(noteList);
});

router.post("/:id", (req, res) => {
    const { body } = req; 

    noteList.push(body);

    return res.status(201).send(noteList)
})

router.put("/change", (req, res) => {
    const { body } = req;
    noteList = body
    return res.status(201).send(noteList)
})

module.exports = router