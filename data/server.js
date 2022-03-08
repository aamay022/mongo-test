const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/users')
// const db = require('./data/db-config')

// const session = require('express-session')
// const Store = require('connect-session-knex')(session)
// const knex = require('./data/db-config')


const server = express()

// server.use(session({
//   name: 'chocolatechip',
//   secret: 'shh',
//   cookie: {
//     maxAge: 1000 * 60 * 60,
//     secure: false, 
//     httpOnly: true 
//   },
//   resave: false, 
//   saveUninitialized: false, 
//   store: new Store({
//     knex,
//     tablename: 'sessions',
//     sidfieldname: 'sid',
//     createtable: true,
//     clearInterval: 1000 * 60 * 60,
//   })
// }))

server.use(express.json())
server.use(helmet())
server.use(cors())

const dbURI = 'mongodb+srv://Antman_0607:Ladiesman7@cluster0.c6l9a.mongodb.net/node-tuts?retryWrites=true&w=majority'
mongoose.connect(dbURI)
.then((result)=> console.log('connected db'))
.catch((err)=> console.log(err))


server.get('/', (req,res)=>{
res.send('<p>home page</p>')
})

server.get('/addUser', (req,res)=>{
    const user = new User({
      name: 'Ant',
      age: '23',
      bio: 'soccer addict'
    });

    user.save()
    .then((result)=>{
      res.send(result)
    })
    .catch((err)=>{
      console.log(err)
    })
})

server.get('/allUser', (req,res)=>{
  User.find()
  .then((result)=>{
    res.send(result)
  })
  .catch((err)=>{
    console.log(err)
  })
})
// server.use((err, req, res, next) => {
//   // eslint-disable-line
//   res.status(err.status || 500).json({
//     message: err.message,
//     stack: err.stack,
//   });
// });

module.exports = server
