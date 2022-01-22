//require('dotenv').config()
const express = require('express');
const app = express();
const authRouter = require('./router/auth.js')
const verifyToken = require('./verifyToken.js')
const contentRouter = require('./router/content.js')

const cors = require('cors')


app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }));
app.use(cors())

app.use('/api/auth', authRouter)
app.use('/api/content', verifyToken, contentRouter)

app.use('*', (req, res) => {
    res.send('Invalid access')
    console.log('invalid access detected');
})

const PORT = 5050
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
