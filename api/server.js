var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');

var jwt    = require('jsonwebtoken'); // create and verify tokens
var config = require('./config');
var User   = require('./models/user');

var port = process.env.PORT || 8080;

mongoose.connect(config.database);
app.set('superSecret', config.secret); // create variable superSecret and set it to config.secret

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));//logs requests into console


//TO-DO:Check against hash of the user
app.post('/api/auth',function(req, res){
    //if username is in database and his password matches with the one in database then send webtoken
    User.findOne({
        name: req.body.name,
        password: req.body.password
    }, function(err, user){
        if(err) throw err;

        if(!user){
            res.json({success: false, message: 'Wrong username'});
        }else{
            var token = jwt.sign(user, app.get('superSecret'),{expiresIn: "1h"});
            res.json({success: true, message: 'Enjoy your token!', token: token});
        }
    })
});

//TO-DO: Hash userpassword register
app.post('/api/reg', function(req, res) {

  var userModel = new User({
    name: req.body.name,
    password: req.body.password
  });

  //If user is not in the database register him
  User.findOne({
      name: req.body.name
  }, function(err, user){
      if(err) throw error;

      if(user){
          res.json({success:false, message: 'Username already exists'});
      }
      else{
        userModel.save(function(err) {
            if (err) throw err;
            console.log('User saved successfully');
            res.json({ success: true, message: 'User is registered' });
        })
      }
    });

});

var server = app.listen(port);
console.log('Server runs at http:' + port);

require('./sockets.js').Socket(server);
