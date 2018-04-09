var express = require('express')
var app = express()
var metro = require('./metro.js')
var line = require('./line.js')
var io = require('socket.io')

app.set('view engine', 'ejs');

line.line.stations.forEach(function (station) {
    console.log('Station : ' + station.name)
})

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // CSS bootstrap

app.get('/', function(req,res){
    res.render('index', { line: line.line})
})

app.listen(8080)