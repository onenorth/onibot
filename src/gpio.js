var fs = require('fs')

var prefix = '/sys/class/gpio'

function writeFile(path, data, callback) {
	var fd = fs.openSync(path, 'w+') 
	fs.writeSync(fd, data)
	fs.closeSync(fd)
}

function GpioPin(pinNumber, direction) {
	this.pinNumber = pinNumber
	this.direction = direction
	this.value = 0;
}

GpioPin.prototype.export = function() {
	var path = prefix + '/export'
	writeFile(path, this.pinNumber)
}

GpioPin.prototype.unexport = function() {
	var path = prefix + '/unexport'
	writeFile(path, this.pinNumber)
}

GpioPin.prototype.setVal = function(val) {
	var path = prefix + '/gpio' + this.pinNumber + '/value'
	writeFile(path, val)
	this.value = val
}

GpioPin.prototype.toggleVal = function() {
	if (this.value === 1) {
		this.setVal(0)
	} else {
		this.setVal(1)
	}
}

GpioPin.prototype.setDirection = function(direction) {
	var path = prefix + '/gpio' + this.pinNumber + '/direction'
	writeFile(path, direction)
	this.direction = direction
}

module.exports = GpioPin
