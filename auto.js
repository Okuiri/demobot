#!/usr/bin/env node

var express = require('express');
var five = require('johnny-five');
var app = express();
var Edison = require('edison-io');
var wheelCtrl = require('./wheelCtrl');
wheelCtrl.setMode('debug');
var board = new five.Board({
	io: new Edison()
});



board.on('ready', function(){
	var s1 = new five.Servo({
		pin: 5
	});
	var s2 = new five.Servo({
		pin: 9
	});
	/*
	var s1 = new five.Servo({
		address: 0x40,
		controller: "PCA9685",
		pin:0,
		center: true
	});
	var s2 = new five.Servo({
		address: 0x40,
		controller: "PCA9685",
		pin: 1,
		center: true
	});
	*/
	var move = new five.Pin(2);
	var dir = new five.Pin(3);
	move.write(0);
	dir.write(0);
	this.repl.inject({
		s1: s1,
		s2: s2,
	});

	var fwd = 55;
	var back = 110;
	var turnl_1 = 35;
	var turnl_2 = 135;
	var turnr_1 = 130;
	var turnr_2 = 30;
	var stop = 85;

	var cmdTimers =[];
	var move = '';
	app.get('/api/:page', function(req,res){

		clearTimeout(cmdTimers.pop());
		var newTimer = setTimeout(function(){
			s1.to(stop);
			s2.to(stop);
			console.log('stop');
			move = 'stop';
		}, 250);

		cmdTimers.push(newTimer);
		if(move != req.params.page){
			console.log(move);
			move = req.params.page;
			if(move == 'forward'){
				s1.to(fwd);
				s2.to(fwd);
			}else if(move == 'left'){
				s1.to(turnl_1);
				s1.to(turnl_2);
			}else if(move == 'right'),{
				s1.to(turnr_1);
				s2.to(turnr_2);	
			}else if(move == 'backward'){
				s1.to(back);
				s2.to(back);	
			}
		}
		res.end();
	});

	
	app.get('/api/camup', function(req,res){
		step.write(1);
		dir.write(0);
		res.end();
	});
	app.get('/api/camdown', function(req,res){
		step.write(1);
		dir.write(1);
		res.end();
	});
	app.get('/api/camstop', function(req,res){
		step.write(0);
		dir.write(0);
		res.end();
	});

});
app.listen(3000); 
