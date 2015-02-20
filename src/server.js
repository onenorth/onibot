var GpioPin = require('./gpio')

var pin = new GpioPin(4, 'out')
pin.export()
pin.setDirection('out')
var interval = setInterval(function() {
	pin.toggleVal()
}, 25)
setTimeout(function() {
	clearInterval(interval)
	pin.setVal(0)
	pin.unexport()
	process.exit(0)
}, 5000)
