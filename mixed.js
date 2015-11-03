var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var five = require('johnny-five');
var Edison = require('edison-io');

var board = new five.Board({
  io: new Edison()
});

app.get('/', function(req,res){
  res.sendFile('index_mixed.html', {root: __dirname});
});

var fwd = 50;
var turnl = 20;
var turnr = 140;
var tf = 45;
var stop = 84;
var rev = 105;

board.on("ready", function(){
  var s1 = new five.Servo(5);
  var s2 = new five.Servo(9);
  var move = new five.Pin(2);
  var dir = new five.Pin(3);
  var arduino = new five.Pin(4);
  var moving == false;  
  arduino.write(0x01);

  function up(){
     move.write(0x01);
     dir.write(0x01);
  }
  function down(){
    move.write(0x01);
    dir.write(0x00);
  }

  function stop(){
    move.write(0x00);
  } 

  this.repl.inject({
    s1: s1,
    s2: s2,
    fwd: fwd,
    turnl: turnl,
    turnr: turnr,
    tf: tf,
    rev: rev,
  });

  io.on('connection', function(socket){

    socket.on('cmd', function(data){
      if(data !== 'stop'){
        moving = true;
      }else{
        moving = false;
      } 
      if(data === 'fwd' && !moving){
        s1.to(fwd);
        s2.to(stop);
      }else if (data === 'fl' && !moving){
        s1.to(fwd);
        s2.to(40);
      }else if (data === 'fr' && !moving){
        s1.to(fwd);
        s2.to(115);
      }else if (data === 'left' && !moving){
        s1.to(fwd);
        s2.to(turnl);
      }else if (data === 'right' && !moving){
        s1.to(fwd);
        s2.to(turnr);
      }else if (data === 'stop'){
        s1.to(stop, 300);
        s2.to(stop);
      }else if (data === 'rev' && !moving){
        s1.to(rev);
        s2.to(stop);
      }else if(data ==='scrnup' && !moving){
        up();
      }else if(data ==='scrndown' && !moving){
        down();
      }
      if(data === 'scrnstop'){
        stop();
      }       
     });

    socket.on('debug',function(data){
        if(!moving){
      	  console.log(data);
        }else if(moving && data === 'stop'){
          console.log(data);
        }
    });
    
  });

});


http.listen(3000, function(){
  console.log('server listening on *:3000');
});
