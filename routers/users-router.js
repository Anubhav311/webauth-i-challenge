const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('./users-model');
const restricted = require('../auth/restricted-middleware');


router.post('/register', (req, res) => {
    const credentials = req.body;

    const hash = bcrypt.hashSync(credentials.password, 5);

    credentials.password = hash;

    Users.add(credentials)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(error => {
            res.status(500).json({ message: 'We ran into an error adding the user' });
        });
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.username = user.username;
                res.status(200).json({ message: `Hola ${user.username}!`})
            } else {
                res.status(401).json({ message: "I don't know you! Go away!"})
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});


router.get('/users', restricted, (req, res) => {
    Users
        .find()
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
});

router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if(err) {
                res.send('you can checkout any time you like, but you can never leave....');
            } else {
                res.send('bye');
            }
        });
    } else {
        res.send('already logged out');
    }
})


module.exports = router;