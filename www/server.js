var args = process.argv.slice(2);

var path = require('path');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');

// johnny-five and raspi
var five, board, raspi;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var hasArduino = args.indexOf("noArduino") === -1;

if (hasArduino) {
  var arduinoLEDs = {};
  
  var strobeLed = {
    pin: 13,
    type: "standard"
  };

}

// constants
var stringValues = {
  'forward': 65,
  'left': 40,
  'right': 100,
  'strobe': 300
};

var serverStatus = {
  hasArduino: false,
  hasCamera: false,
  currentAI: 'none'
};

// listen on port 3000 - we use port-forwarding to forward inbound 80 -> 3000
// because socket.io requires running the app with sudo to listen on port 80
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
    processRobotCommand(data.data);
  });

  socket.on('robot update', function (data) {
    updateRobotStatus(data.data);
  }); 
});

// respond to a given command
// expects string commands to be split by '-'
function processRobotCommand (command) {
  var parsedCommand = command.split('-');

  console.log('----- Command: -----');
  console.log(parsedCommand);
  
  if (!serverStatus.hasArduino) { return; }

  if (parsedCommand[0] === 'manual') {
    if (parsedCommand[1] === 'throttle') {
      
    }
    else if (parsedCommand[1] === 'turn') {

    }
    // example manual-led-strobe-300
    // manual command, strobe led, speed 300 milliseconds
    else if (parsedCommand[1] === 'led') {
      ledChange(stringValues[parsedCommand[2]], parseInt([parsedCommand[3]));
    }

  }

  else if (parsedCommand[0] === 'red') {
    if (parsedCommand[1] === 'begin') {
      serverStatus.currentAI = 'red';
    }
    else {
      serverStatus.currentAI = 'none';
    }

  }

  else { // parsedCommand[0] === 'stop'
    return;
  }

}

function updateRobotStatus (updatedData) {
  updatedData['Time'] = new Date();
  updatedData['Arduino Attached'] = serverStatus.hasArduino;

  socket.broadcast.emit('robot status', { data: updatedData });
}

// ------ Johnny Five ------
// These command should not be called if 'noArduino' flag is specified

function ledChange (value, speed) {
  var speed = speed || 100;

  arduinoLEDs[value](speed);

  board.repl.inject({
    s: arduinoLEDs
  });
}

if (hasArduino) {
  five = require('johnny-five');
  raspi = require('raspi-io);

  board = new five.Board({
   io: new raspi()
  });

  board.on('ready', function() {
    arduinoLEDs = {
      strobe: new five.LED(strobeLed)
    };

    board.repl.inject({
      s: arduinoLEDs
    });

    serverStatus.hasArduino = true;

  });

}


