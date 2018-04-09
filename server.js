var express = require('express')
var app = express()
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var metro = require('./metro.js')
var line = require('./line.js')

app.set('view engine', 'ejs');

line.line.stations.forEach(function (station) {
    console.log('Station : ' + station.name)
})

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // CSS bootstrap
app.use('/js', express.static(__dirname + '/node_modules/socket.io-client/dist')); // SOCKET IO


io.on('connection', function(client) {
    console.log('Client connected...');

    client.on('join', function (data) {
        console.log(data);
    });
})

app.get('/', function(req,res){
    res.render('index', { line: line.line})
})


server.listen(8080, function(){
    console.log('listening on *:8080');
});