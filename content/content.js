require('dotenv').config()
const express = require('express')
const app = express();

const cors = require('cors')

const mysql = require('mysql');
const { query } = require('express');

//const config = { schema: 'micros', table: 'transaction', user: 'root', password: process.env.MYSQL_ROOT_PW }
dburl = 'localhost'
//dburl = 'http://10.152.183.247'

const connection = mysql.createConnection({
    host: dburl,
    user: 'root',
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: 'micros'
})

connection.connect((error) => {
    if (!!error) {
        console.log('error connecting to db');
    } else {
        console.log('connected to db');
    }
})

app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }));
app.use(cors())

app.post('/get', async(req, res) => {
    console.log('received get content'+req.body.userid)
    await getUserContent(req, res)
    
})

app.post('/up', async(req, res) => {
    console.log('received up content'+req.body.userid)

    await upContent(req, res)
})

app.use('*', (req, res) => {
    res.send('Invalid access')
    console.log('invalid access detected');
})

const PORT = 5056
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
async function getUserContent(req, res) {
    connection.query("select distinct content from note, user where note.owner=?", [req.body.userid], (err, rows, field) => {
        if (err) {
            return res.send({result: false, data:[]})
        }
        res.send({result:true, data:rows})
    })
}

async function upContent(req, res) {
    note = ""
    havenote=false
    try {
        note = req.body.note
        havenote = true
    } catch(err) {
        return res.send({result: false, err: "Invalid request"})
    }
    if (!havenote) {
        return res.send({result:false, err: "No note attached"})
    }
    connection.query("insert into micros.note(content, owner) values (?,?)", [note, req.body.userid], (err, rows, field) => {
        if (err) {
            return res.send({result:false, err:"Database error"})
        }
        res.send({result:true})
    })
}