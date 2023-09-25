const express  = require('express')
const nodemailer = require('nodemailer')
const app = express()

const port = 3000

const user = "afs2007144@gmail.com"
const pass = "afspi520023@"

app.get('/', (req, res) => res.send(`Welcome`))

app.get('/send', (req, res) => {

    const transport = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:"465",
        auth: {user,pass},
    })

})

app.listen(port, () => console.log (`runiing on port ${port}!`))