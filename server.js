const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const server = require('http').createServer(app);
const io = require('socket.io')(server);

//import { Metro } from './metro.js'

var Metro = require('./metro.js')

var line = require('./line.js')

var metro = new Metro(1);
var metro2 = new Metro(2);

var SerialPort = require("serialport");
const Readline = require('@serialport/parser-readline')


var port = new SerialPort("/dev/cu.usbmodem1421");
const parser = port.pipe(new Readline());



port.on('open', function () {
    console.log('Serial Port Opend');
    port.on('data', function (data) {
        if (data[0] == 1) {
            console.log('closing door')
        }
        if (data[0] == 2) {
            //io.emit('open', 1)
        }
        console.log('data recieved' + data[0]);
        console.log(data)
    });
});


app.set('view engine', 'ejs');

app.use('/asset', express.static(__dirname + '/public'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // CSS bootstrap

io.on('connection', function (socket) {
    socket.on('join', function (data) {
        console.log('Client connected...')
        console.log(data);
    })
    socket.on('close', function (data) {
        io.emit('close', data)
        console.log('closing door of metro : ' + data);
    })

    socket.on('start', function () {
        launch()
    })

    socket.on('emergency', function () {
        metro.metro.emergency = true
        console.log('emmergency')
    })

    socket.on('safeitude', function () {
        metro.metro.emergency = false
        console.log('safeitude')
    })
})

var launch = function() {
    if (metro.metro.station == line.line.stations[line.line.stations.length - 1].id || metro.metro.station == line.line.stations[0].id) {
        metro.metro.direction = !metro.metro.direction
    }
    else {
        metro.metro.direction = metro.metro.direction
    }
    direction = metro.metro.direction;
    currStation = line.line.stations[metro.metro.station];
    if(metro.metro.garage){
        nextStation = line.distToGarage(currStation.id, direction)
    } else {
        nextStation = line.nextStation(currStation.id, direction)
    }
    console.log('currStation : ' + currStation.name)
    console.log('next : ' + nextStation.name)
    metro.speed(line.getDist(currStation.id, direction), io, function () {
        currStation = nextStation
        metro.metro.station = currStation.id
        console.log('currStation : ' + currStation.name)

    })

    io.emit('start', currStation, nextStation)
}

app.get('/', function (req, res) {
    res.render('index', {
        line: line.line
    })
    direction = metro.direction
    console.log(direction)

})

//door management
app.post('/door/:id/:status', function (req, res) {
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

server.listen(8080, function () {
    console.log('listening on *:8080');
});