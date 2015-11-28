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
	var move = new five.Pin(2);
	var dir = new five.Pin(3);
	
	this.repl.inject({
		s1: s1,
		s2: s2,
	});
	
	app.get('/api/forward', function(req,res){
		wheelCtrl.forward();		
		res.end();
	});

	app.get('/api/left', function(req,res){
		wheelCtrl.left();
		res.end();
	});
	
	app.get('/api/right', function(req,res){
		wheelCtrl.right();
		res.end();
	});
	
	app.get('/api/backward', function(req,res){
		wheelCtrl.reverse();
		res.end();
	});
	
	app.get('/api/camup', function(req,res){
		camCtrl.up();
		res.end();
	});
	app.get('/api/camdown', function(req,res){
		camCtrl.down();
		res.end();
	});
});
app.listen(3000);
