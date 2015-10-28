var dualShock = require('dualshock-controller');

var controller = dualShock(
  {
    config: "dualShock3",
    accelerometerSmoothing: true,
    analogStickSmoothing: false
  }
);

controller.on('error', function(data) {
  console.log('err:');
  console.log(data);
});

controller.on('right:move', function(data) {
  console.log('turn:' + data.x);
});

controller.on('left:move', function(data){
  if(data.y >= 0 && data.y < 63){
    console.log('forward');
  }else if (data.y >= 180) {
    console.log('reverse');
  }else{
    console.log('stop');
  }
});

controller.on('connected', function(data) {
  console.log(data);
});


controller.connect();
