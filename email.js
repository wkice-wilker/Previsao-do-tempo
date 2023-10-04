const express = require('express')
const nodemailer = require('nodemailer');
const app = express()

const port = 3000

const user = "afs2007144@gmail.com"
const pass = "afspi52023@"

app.get('/', (req, res) => res.send(`Welcome`))

app.get('/send', (req, res) => {

    const transporter = nodemailer.createTransport({
        host:"smtp-relay.gmail.com",
        port:"587",
        auth: {user,pass},
    })

    transporter.sendMail({
        from: user,
        to: user,
        replyTo: "afs2007144@gmail.com",
        subject: "Seja bem vindo",
        text: "este é um teste para disparo de e-mail",

    }).then(info => {
        res.send(info)
    }).catch(error => {
        res.send(error)
    });

})

app.listen(port, () => console.log (`runiing on port ${port}!`))