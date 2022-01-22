//require('dotenv').config()
const express = require('express');
const app = express();

const cors = require('cors')


app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }));
app.use(cors())

app.post('/login', (req, res) => {
    res.send({'auth': true})
})

app.use('*', (req, res) => {
    res.send('Invalid access')
    console.log('invalid access detected');
})

const PORT = 5053
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
