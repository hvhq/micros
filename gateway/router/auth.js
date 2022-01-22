const express = require("express")
const http = require('http')
const axios = require('axios')
const authRouter = express.Router()

authurl = 'http://localhost:5053/'
//authurl = 'http://10.152.183.246:5053/'

authRouter.all("/:uri", async(req, res) => {
    console.log("hola")
    axios.post(authurl+req.params.uri, req.body)
    .then( result1 => {
        console.log(result1.data);
        res.send(result1.data)
    }).catch (err => {
        console.log(err)
    })

    console.log(req.params.uri)
})

module.exports = authRouter