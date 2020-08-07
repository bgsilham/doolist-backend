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

app.get('/',(request,response) => {
    response.send('Server accessed')
})

//import 
const users = require('./src/routes/users')
const todos = require('./src/routes/todos')

app.use('/users', users)
app.use('/todos', todos)

app.get('*', (request,response) => {
    response.status(404).send('Page Not found')
})

app.listen (PORT, () => {
   console.log(`App is listening`)
})