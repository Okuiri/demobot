var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var five = require('johnny-five');
var Edison = require('edison-io');

var board = new five.Board({
    io: new Edison()
});

app.get('/', function(req,res){
    res.sendFile('index_independent.html', {root: __dirname});
});

var fwd = 115;
var turn = 25;
var tf = 125;
var stop = 87;
var rev = 45;


function handleDir(data){
    if(data === 'fwd'){
        s1.to(fwd);
        s2.to(fwd);
    }else if (data === 'left'){
        s1.to(turn);
        s2.to(tf);
    }else if (data === 'right'){
        s1.to(tf);
        s2.to(turn);
    }else if (data === 'stop'){
        s1.to(stop);
        s2.to(stop);
    }else if (data === 'rev'){
        s1.to(rev);
        s2.to(rev);
    }
}
board.on("ready", function(){
    var s1 = new five.Servo(5);
    var s2 = new five.Servo(9);

    this.repl.inject({
        s1: s1,
        s2: s2,
        fwd: fwd,
        turn: turn,
        tf: tf,
        rev: rev
    });

    io.on('connection', function(socket){
        socket.on('cmd', function(data){
            handleDir(data);
        });
    });
});


http.listen(3000, function(){
    console.log('server listening on *:3000');
});
