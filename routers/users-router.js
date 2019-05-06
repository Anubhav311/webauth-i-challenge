const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('./users-model');

router.get('/', (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ message: 'We ran into an error retrieving the users' });
    });
});

router.post('/', (req, res) => {
    Users.add(req.body)
      .then(user => {
        res.status(200).json(user);
      })
      .catch(error => {
        res.status(500).json({ message: 'We ran into an error adding the user' });
      });
  });

module.exports = router;