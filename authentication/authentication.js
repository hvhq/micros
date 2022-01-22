require('dotenv').config()
const express = require('express')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
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

app.post('/login', async(req, res) => {
    console.log('received login request')
    await checkLoginOK(req, res)
    
})

app.post('/register', async(req, res) => {
    console.log('received register request')

    await tryRegister(req, res)
})

app.use('*', (req, res) => {
    res.send('Invalid access')
    console.log('invalid access detected');
})

const PORT = 5053
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))


async function checkLoginOK(req, res) {
    //hashpw = await argon2.hash()
    let thequery = "select * from micros.user where username='"+req.body.ur+"'"

    connection.query(thequery, async(err, rows, field) => {
        if (err) {
            res.send({"result":false, "err":"Server error, try again"})
            console.log(err)
            return
        }
        if (!req.body.pw || req.body.pw == '') {
            res.send({"result":false})
            return;
        }
 
        savedpw = await argon2.hash('i')
        if (rows.length > 0) {
            savedpw = rows[0].password
        }

        console.log(savedpw)
        validate = false
        try {
            validate = await argon2.verify(savedpw, req.body.pw)
        } catch (error) {
            console.log(error)
            res.send({"result":false, "err":"Server error"})
        }

        if (!validate) {
            res.send({"result":validate})
            return;
        }
        const accessToken = jwt.sign( { "userid": rows[0].ID}, process.env.jwtsecret)
        return res.status(200). json({"result": true, yourtoken: accessToken });
    })

    //validate = await argon2.verify(req.body.pw, thepw)
}

async function tryRegister(req, res) {
    //check if username exists
    connection.query("select username from micros.user where username=?", [req.body.ur], async(err, rows, field) => {
        if (err) {
            console.log(err)
            res.send({"result":false, "err":"Server error, try again"})
            return
        }
        console.log(req.body)
        console.log(rows)
        if (rows.length != 0) {
            res.send({"result":false, "error":"Username exists"})
            return
        }

        if (req.body.pw.length < 8) {
            res.send({"result":false, "error":"Password is too short"})
            return
        }

        thepw = await argon2.hash(req.body.pw)
        //register
        connection.query("insert into micros.user(username, password) values(?,?)", [req.body.ur, thepw], (err, rows, field) => {
            if (err) {
                console.log(err)
                res.send({"result":false, "err":"Server error, try again"})
                return
            }

            res.send({"result":true})
        })
    })
}