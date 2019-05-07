const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');

const usersRouter = require('../routers/users-router')

const server = express();

const sessionConfig = {
  name: 'monster', 
  secret: 'keep it secret, keep it safe -gandalf',
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 2,
    secure: false, 
  },
  resave: false, 
  saveUninitialized: true,
};

server.use(session(sessionConfig));
server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/', usersRouter)

server.get('/', (req, res) => {
  const username = req.session.username || 'stranger';
  res.send(`Hello ${username}`);
});


module.exports = server;