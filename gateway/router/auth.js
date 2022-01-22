const express = require("express")
const authRouter = express.Router()

authRouter.all("/:uri", (req, res) => {
    console.log(req.params.uri)
    res.send(req.params.uri)
})

module.exports = authRouter