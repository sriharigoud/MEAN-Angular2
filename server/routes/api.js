const express = require('express');
const router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config.json');

// declare axios for making http requests
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';

/* GET api listing. */
router.get('/', (req, res) => {
  //res.send('api works');
});

// Get all quotes
router.post('/quotes', (req, res) => {
  MongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
    if (err) res.status(500).send(err);

    db.collection('quotes').find({userId: req.body.user._id}).toArray(function (err, result) {
      if (err) res.status(500).send(err);

      res.status(200).json(result);
    })
  })
});

router.post('/addQuote', (req, res) => {
  MongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
    if (err) res.status(500).send(err);

    var collection = db.collection('quotes');
    collection.insert({
      name: req.body.name,
      quote: req.body.quote,
      userId: req.body.user._id
    }, function (err, docs) {
      collection.count(function (err, count) {
        return res.status(200).json({
          count: "count " + count,
          msg: "Quote addedd successfully"
        });
      });
    });
  });
})

router.post('/register', (req, res) => {
  MongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
    if (err) res.status(500).send(err);

    db.collection('users').findOne({
      email: req.body.email
    }, function (err, user) {
      if (err) res.status(500).send(err);

      if (user) {
        // username already exists
        res.status(200).json({
          msg: 'Email "' + req.body.email + '" is already taken',
          status: false
        });
      } else {
        var user = _.omit(req.body, 'password');
        // add hashed password to user object
        user.hash = bcrypt.hashSync(req.body.password, 10);

        db.collection('users').insert(
          user,
          function (err, doc) {
            if (err) {
              res.status(200).json({
                msg: err.name + ': ' + err.message,
                status: false
              });
            }

            res.status(200).json({
              msg: 'Email "' + req.body.email + '" is registered successfully',
              status: true
            });
          });
      }
    })
  });
});

router.post('/authenticate', (req, res) => {
  MongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
    if (err) res.status(500).send(err);

    db.collection('users').findOne({
      email: req.body.email
    }, function (err, user) {
      if (err) {
        res.status(200).json({
          msg: err.name + ': ' + err.message,
          status: false
        });
      }

      if (user && bcrypt.compareSync(req.body.password, user.hash)) {
        // authentication successful
        res.status(200).json({
          user: {
            _id: user._id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            token: jwt.sign({
              sub: user._id
            }, config.secret)
          },
          status: true
        });
      } else {
        res.status(200).json({
          msg: "Check email and password",
          status: false
        });
      }
    });
  });
});

module.exports = router;
