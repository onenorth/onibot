#ONIBot

This repo contains all code needed to run the the One North Interactive Telepresence Robot.

> So far this just contains a simple node module for working with the gpio pins on a Raspberry PI

## Dependencies
**NOTE:** This code will only run on a [raspberry pi](http://www.raspberrypi.org/ "Raspberry Pi website").

* [raspberry pi](http://www.raspberrypi.org/ "Raspberry Pi website")
* [node.js](http://nodejs.org/dist/v0.10.28/ "node.js v0.10.28 distro links") (version 0.10.28 or lower)
* [forever](https://www.npmjs.com/package/forever "forever on npm")
* [johnny-five](https://www.npmjs.com/package/johnny-five "johny five on npm")
* [raspi-io](https://www.npmjs.com/package/raspi-io "raspi-io on npm")
* [express](https://www.npmjs.com/package/express "express on npm")
* [socket.io](https://www.npmjs.com/package/socket.io "socket.io on npm")
* [jquery](http://jquery.com/ "jQuery website")

## Installation

> This code is meant to run on a [raspberry pi](http://www.raspberrypi.org/ "Raspberry Pi website"). It will not run if you try to run the code on anything other than a raspberry pi. It doesn't matter which raspberry pi [model](http://www.raspberrypi.org/products/ "Raspberry Pi model list") you are using.

###Clone the repository

```
git clone https://github.com/onenorth/onibot.git
```
### Install dependencies
Use npm to install the dependencies
```
npm install
```
### Running the web server
Once the dependency installation has completed, you can start the web server with:

```
npm start
```
This is just an alias in the `package.json` file for `forever start www/server.js`.

[Forever](https://www.npmjs.com/package/forever "forever on npm") is used to start the server. By using forever, we ensure that the node process will be restarted should the node process stop for some reason.
