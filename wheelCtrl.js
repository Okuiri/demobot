#!/usr/bin/env node
var modMode = '';

var fwd = 0;
var back = 180;
var turnl_1 = 30;
var turnl_2 = 130;
var turnr_1 = turnl_2;
var turnr_2 = turnl_1;

module.exports = {
	setMode: function(mode){
		modMode	= mode;
	},

	left: function(s1,s2){
		if(modMode === 'debug'){
			console.log('moving left');
		} else {
			s1.to(turnl_1);
			s2.to(turnl_2);
		}
	},

	right: function(s1,s2){
		if(modMode === 'debug'){
			console.log('moving right')
		} else {
			s1.to(turnr_1);
			s2.to(turnr_2);
		}
	},

	forward: function(s1,s2){
		if(modMode === 'debug'){
			console.log('moving forward');
		} else {
			s1.to(fwd);
			s2.to(fwd);
			
		}
	},

	reverse: function(s1,s2){
		if(modMode === 'debug'){
			console.log('moving backward');
		}else{
			s1.to(back);
			s2.to(back);
		}
	},
	
	stop: function(s1,s2){
		if(modMode === 'debug'){
			console.log('stop');
		}else{
			s1.to(85);
			s2.to(85);
		}
	}
}
