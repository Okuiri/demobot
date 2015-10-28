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
  console.log(data);
});

controller.on('connected', function(data) {
  console.log(data);
});


controller.connect();
