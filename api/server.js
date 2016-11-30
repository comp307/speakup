const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // create and verify tokens
const config = require('./config');
const User = require('./models/user');

const port = process.env.PORT || 8080;

let streamCounter = 0;

mongoose.connect(config.database);

// create variable superSecret and set it to config.secret
app.set('superSecret', config.secret);

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev')); // logs requests into console
app.use(cors());

app.post('/api/auth', function(req, res) {
  if (!isCorrectEmail(req.body.email)) {
    res.json({success: false, message: 'Invalid email or password!'});
  } else {
    User.findOne({
      email: req.body.email,
    }, function(err, user) {
      if (err) throw err;

      if (!user) {
        res.json({
          success: false,
          message: 'Invalid email or password!', // Don't specify which one for security purposes
        });
      } else {
        bcrypt.compare(req.body.password, user['password'], function(err, isMatch) {
          if (err) {
            console.log(err);
            res.json({success: false});
          }

          if (isMatch) {
            let token = jwt.sign(user, app.get('superSecret'), {expiresIn: '1h'});

            // Generate stream id
            let streamID = req.body.stream_id;
            if (!streamID) {
              streamCounter++;
              streamID = streamCounter;
            }

            res.json({
              success: true,
              message: 'Enjoy your token!',
              token: token,
              streamID: streamID,
            });
          } else {
            res.json({
              success: false,
              message: 'Invalid email or password!',
            });
          }
        });
      }
    });
  }
});

// Current password policy
// Password length should be between 8 and 16 characters
app.post('/api/reg', function(req, res) {
  if (!isCorrectEmail(req.body.email)) {
    res.json({success: false, message: 'Please provide a valide McGill email!'});
  } else if (req.body.password.length < 8 || req.body.password.length > 16) {
    res.json({success: false, message: 'Password must be between 8 and 16 characters long!'});
  } else if (req.body.password != req.body.confirm_password) {
    res.json({success: false, message: 'Passwords do not match!'});
  } else {
    User.findOne({
      email: req.body.email,
    }, function(err, user) {
      console.log('error after 2');
      if (err) throw error;

      if (user) {
        res.json({success: false, message: 'Email already exists'});
      } else {
        // we are saving user and hashing his password
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(req.body.password, salt, function(err, hash) {
            let userModel = new User({
              email: req.body.email,
              password: hash,
            });
            userModel.save(function(err) {
              if (err) {
                console.log(err);
                res.json({success: false});
              }
              console.log('User saved successfully');
              res.json({success: true, message: 'User is registered'});
            });
          });
        });
      }
    });
  }
});

let server = app.listen(port);
console.log('Server runs at http:' + port);

require('./sockets.js').socket(server);

/*
 * something@domain.superdomain is allowed
 * instead of looping can be done using hashmap
 *
 * @param {string} eml - email address
 *
 * @return {boolean} - true is valid email was provide, false otherwise
 */
function isCorrectEmail(email) {
  // Validate length
  if (email.length > 50) return false;

  // Validate regex
  let re = /\S+@(mail.)?mcgill.ca+/;
  return re.test(email);
}
