var args = process.argv.slice(2);

var path = require('path');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var serverStatus = {
  hasArduino: false,
  hasCamera: false,
  currentAI: 'none'
};

// listen on port 3000 - we use port-forwarding to forward inbound 80 -> 3000
http.listen(3000, function() {
   console.log('Starting server, listening on *:80');
});

app.use(express.static(__dirname + '/public'));

// reference jquery in node_modules
app.get('/js/jquery.js', function (req, res) {
  res.sendFile(path.join(__dirname, '../node_modules', 'jquery/dist', 'jquery.min.js'));
});

// reference jquery map file to prevent errors when using min file
app.get('/js/jquery.min.map', function (req, res) {
  res.sendFile(path.join(__dirname, '../node_modules', 'jquery/dist', 'jquery.min.map'));
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  console.log('A user has connected');
  socket.emit('robot status', { data: 'server connected' });

  socket.on('robot command', function (data) {
    var updatedData = data.data;
    console.log(updatedData);
  });

  socket.on('robot update', function (data) {
    var updatedData = data.data;
    updateRobotStatus (updatedData);
  }); 
});

function updateRobotStatus (updatedData) {
  updatedData['Time'] = new Date();
  updatedData['Arduino Attached'] = serverStatus.hasArduino;

  socket.broadcast.emit('robot status', { data: updatedData });
}


