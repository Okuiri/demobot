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
  if(data.x >= 0 && data.x < 63) console.log('left');
  else if(data.x >= 180) console.log('right');
  else console.log('stop');
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
