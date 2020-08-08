require('dotenv').config()
// const {APP_PORT} = process.env
const PORT = process.env.APP_PORT || 8100
const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))

const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.get('/',(request,response) => {
    response.send('Server accessed')
})

//import 
const users = require('./src/routes/users')
const todos = require('./src/routes/todos')

io.on('connection', client => {
    console.log('New user connected')
    client.on('disconnect', () => {
        console.log('User disconnected')
    })
  });

app.use((req, res, next) => {
    req.io = io;
    next()
})
app.use('/users', users)
app.use('/todos', todos)

app.get('*', (request,response) => {
    response.status(404).send('Page Not found')
})

server.listen (PORT, () => {
   console.log(`App is listening`)
})