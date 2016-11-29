var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken'); // create and verify tokens
var config = require('./config');
var User = require('./models/user');

var port = process.env.PORT || 8080;

mongoose.connect(config.database);
app.set('superSecret', config.secret); // create variable superSecret and set it to config.secret

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev')); //logs requests into console
app.use(cors());

//TO-DO:
//[x] Check against hash of the user
app.post('/api/auth', function (req, res) {
    if (!isCorrectEmail(req.body.name)) {
        res.json({ success: false, message: 'Provide correct email' });
    } else {
        User.findOne({
            name: req.body.name,
        }, function (err, user) {
            if (err) throw err;

            if (!user) {
                res.json({ success: false, message: 'Wrong username' });
            } else {

                bcrypt.compare(req.body.password, user['password'], function (err, isMatch) {
                    if (err) {
                        console.log(err);
                        res.json({ success: false });
                    }

                    if (isMatch) {
                        var token = jwt.sign(user, app.get('superSecret'), { expiresIn: "1h" });
                        res.json({ success: true, message: 'Enjoy your token!', token: token });
                    } else {
                        res.json({ success: false, message: 'Wrong password!' });
                    }
                });
            }
        })
    }
});

//TO-DO: 
//[x] Hash userpassword register
//[x] Validate inputs
//Current password policy
//Password length should be between 8 and 6 characters
app.post('/api/reg', function (req, res) {
    if (!isCorrectEmail(req.body.name)) {
        res.json({ success: false, message: 'Provide correct email' });
    } else if (req.body.password.length < 8 || req.body.password.length > 16) {
        res.json({ success: false, message: 'Inadequate length of password' });
    }
    else if (req.body.password != req.body.password2) {
        res.json({ success: false, message: 'Passwords do not match' });
    }
    else {
        User.findOne({
            name: req.body.name
        }, function (err, user) {
            console.log('error after 2');
            if (err) throw error;

            if (user) {
                res.json({ success: false, message: 'Username already exists' });
            }
            else {
                //we are saving user and hashing his password
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(req.body.password, salt, function (err, hash) {
                        var userModel = new User({
                            name: req.body.name,
                            password: hash
                        });
                        userModel.save(function (err) {
                            if (err) {
                                console.log(err);
                                res.json({ success: false });
                            }
                            console.log('User saved successfully');
                            res.json({ success: true, message: 'User is registered' });
                        });

                    });
                });
            }
        });
    }
});

var server = app.listen(port);
console.log('Server runs at http:' + port);

var stream_id = 0;
var streams = [];
require('./sockets.js').Socket(server, streams);


function Stream(id) {
    this.id = id;
    this.messeges = [];
    this.users = [];
}

//something@domain.superdomain is allowed
//instead of looping can be done using hashmap
function isCorrectEmail(eml) {
    if (eml.length > 50) return false;
    if (!eml.includes('@')) return false;
    let email = eml.split('@');
    if (email.length != 2) return false;
    if (email[1].split('.').length != 2) return false;
    //tests if domain of the element is allowed
    return ['gmail.', 'mcgill.', 'mail.', 'hotmail.'].some(function (element, index, array) {
        return email[1].includes(element);
    });

}