const db = require("../db-config");
const argon2 = require('argon2');

const userRoutes = require('express').Router();

userRoutes.get('/', (req, res) => {
  db.query('SELECT * from user', (err, results) => {
    if (err) {
      console.log(err);
      res.status(500);
    }
    else {
      res.status(200).json(results);
    }
  })
});

userRoutes.post('/', async (req, res) => {
  const user = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
  };

  user.password = await argon2.hash(user.password);

  db.query('INSERT INTO user (firstname, lastname, mail, phone, password) VALUES (?, ?, ?, ?, ?)', [user.firstname, user.lastname, user.email, user.phone, user.password], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500);
    }
    else {
      delete user.password;
      res.status(201).json({...user, id: results.insertId});
    }
  })
});

module.exports = userRoutes;