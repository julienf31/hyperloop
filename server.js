const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const server = require('http').createServer(app);
const io = require('socket.io')(server);

var metro = require('./metro.js')
var line = require('./line.js')

var SerialPort = require("serialport");
const Readline = require('@serialport/parser-readline')


var port = new SerialPort("/dev/cu.usbmodem1421");
const parser = port.pipe(new Readline());

port.on('open', function() {
  console.log('Serial Port Opend');
  port.on('data', function(data) {
    if (data[0] == 1) {
      io.emit('close', 1, function() {
        metro.speed(200)
      })
    }
    if (data[0] == 2) {
      io.emit('open', 1)
    }
    console.log('data recieved' + data[0]);
  });
});



app.set('view engine', 'ejs');

app.use('/asset', express.static(__dirname + '/public'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // CSS bootstrap

io.on('connection', function(socket) {
  socket.on('join', function(data) {
    console.log('Client connected...')
    console.log(data);
  })
  socket.on('close', function(data) {
    io.emit('close', data)
    console.log('closing door of metro : ' + data);
  })

  socket.on('start', function() {
    console.log('start')
    direction = metro.metro.direction
    console.log(direction)
    currStation = line.line.stations[metro.metro.station];
    nextStation = line.nextStation(currStation.id, direction)
    console.log('currStation : ' + currStation.name)
    console.log('next : ' + nextStation.name)
    metro.speed(line.getDist(currStation.id, 0), io, function() {
      currStation = nextStation
      metro.metro.station = currStation.id
      console.log('currStation : ' + currStation.name)

    })
    io.emit('start', currStation, nextStation)
  })
})


var launch = function() {
  console.log('start')
  direction = metro.metro.direction
  console.log(direction)
  currStation = line.line.stations[metro.metro.station];
  nextStation = line.nextStation(currStation.id, direction)
  console.log('currStation : ' + currStation.name)
  console.log('next : ' + nextStation.name)
  metro.speed(line.getDist(currStation.id, 0), io, function() {
    currStation = nextStation
    metro.metro.station = currStation.id
    console.log('currStation : ' + currStation.name)

  })
  io.emit('start', currStation, nextStation)
}

app.get('/', function(req, res) {
  res.render('index', {
    line: line.line
  })
  direction = metro.direction
  console.log(direction)

})

//door management
app.post('/door/:id/:status', function(req, res) {
  if (req.params.status === 'close') {
    io.emit('close', req.params.id)
    console.log('metro : ' + req.params.id)
    metro.speed(200)
    req.pause()
    res.status = 200
    res.end('Door closing')
  } else if (req.params.status === 'open') {
    io.emit('open', req.params.id)
    console.log('metro : ' + req.params.id)
    req.pause()
    res.status = 200
    res.end('Door opening')
  }
})

server.listen(8080, function() {
  console.log('listening on *:8080');
});