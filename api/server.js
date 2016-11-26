const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const jwt = require('jsonwebtoken'); // create and verify tokens
const config = require('./config');
const User = require('./models/user');

const port = process.env.PORT || 8080;
let streamCounter = 0; // Todo: Generate unique stream instead

mongoose.connect(config.database);

// create variable superSecret and set it to config.secret
app.set('superSecret', config.secret);

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev')); // logs requests into console
app.use(cors());


// TO-DO:Check against hash of the user
app.post('/api/auth', function(req, res) {
  // If username is in database and his password matches
  // with the one in database then send webtoken
  User.findOne({
    name: req.body.name,
    password: req.body.password,
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.json({
        success: false,
        message: 'Wrong username or password!',
      });
    } else {
      let token = jwt.sign(user, app.get('superSecret'), {expiresIn: '1h'});
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
    }
  });
});

// TO-DO: Hash userpassword register
app.post('/api/reg', function(req, res) {
  let userModel = new User({
    name: req.body.name,
    password: req.body.password,
  });

  // If user is not in the database register him
  User.findOne({
    name: req.body.name,
  }, function(err, user) {
    if (err) throw error;

    if (user) {
      res.json({success: false, message: 'Username already exists'});
    } else {
      userModel.save(function(err) {
        if (err) throw err;
        console.log('User saved successfully');
        res.json({
          success: true,
          message: 'User is registered',
        });
      });
    }
  });
});

let server = app.listen(port);
console.log('Server runs at http:' + port);

require('./sockets.js').socket(server);
