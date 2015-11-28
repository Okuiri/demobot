#!/usr/bin/env node
modMode = '';

fwd = 0;
back = 180;
tunrl_1 = 30;
turnl_2 = 130;
turnr_1 = turnl_2;
turnr_2 = turnl_1;

module.exports = {
	setMode: function(mode){
		modMode	= mode;
	},

	left: function(){
		if(modMode === 'debug'){
			console.log('moving left');
		} else {
			s1.to(turnl_1);
			s2.to(turnl_2);
		}
	},

	right: function(){
		if(modMode === 'debug'){
			console.log('moving right')
		} else {
			s1.to(turnr_1);
			s2.to(turnr_2);
		}
	},

	forward: function(){
		if(modMode === 'debug'){
			console.log('moving forward');
		} else {
			s1.to(fwd);
			s2.to(fwd);
		}
	},

	reverse: function(){
		if(modMode === 'debug'){
			console.log('moving backward');
		}else{
			s1.to(back);
			s2.to(back);
		}
	}
}
