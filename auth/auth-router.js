const router = require('express').Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Users = require("../users/users-model");
const { jwtSecret } = require('../config/secrets')

router.get('/', (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ erroMessage: "Failed to get the users" })
    })
})


router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(added => {
      res.status(201).json(added);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({ message: `Welcome ${user.username}!`, token })
      } else {
        console.log('Error: ')
        res.status(401).json({ message: '/login error' })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err);
    });
});
function generateToken(user) {
  const payload = {
    username: user.username
  };

  const options = {
    expiresIn: "1h"
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
