// This file is used for developement purposes only

var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');

var port = 3000;
var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath    
}));

app.use("/styles", express.static(__dirname + '/styles'));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, function onAppListening(err) {
    if (err) {
        console.error(err);
    } else {
        console.info('Webpack development server listening on http://localhost:%s', port);
    }
});
