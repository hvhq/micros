const express = require("express")
const http = require('http')
const axios = require('axios')
const contentRouter = express.Router()

conturl = 'http://localhost:5056/'
//authurl = 'http://10.152.183.246:5053/'

contentRouter.all("/:uri", async(req, res) => {
    req.body.userid = req.userid
    console.log(req.userid)
    axios.post(conturl+req.params.uri, req.body)
    .then( result1 => {
        console.log(result1.data);
        res.send(result1.data)
    }).catch (err => {
        console.log(err)
        res.send({result:false, err:"Server error"})
    })

    console.log(req.params.uri)
})



module.exports = contentRouter