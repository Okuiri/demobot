#!/usr/bin/env node

var express = require('express');
var app = express();
var five = require('johnny-five');
var Edison = require('edison-io');
var board = new five.Board({
	io: new Edison
});

board.on('ready', function(){
	var k = 0;
	var stepper = new five.Stepper({
		type: five.Stepper.TYPE.DRIVER,
		stepsPerRev: 20000,
		pins: {
			step: 2,
			dir: 3
		}
	});

	app.get('/api/camup', function(req, res){
		stepper.rpm(10).ccw().step(2000, function(){
			console.log("done");
		});
		res.end();
	});

	app.get('api/camdown', function(req,res){
		stepper.rpm(10).cw().step(2000, function(){
			console.log("done");
		});
	});

});
app.listen(3500);
