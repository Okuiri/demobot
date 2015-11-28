# demobot
Description: Controlling a robot driven by the Sabertooth 2x12 R/C module and an Intel Edison
Current Hardware:
  * Intel Edison
  * Lynxmotion A6wD2
  * Sabertooth 2x12 R/C Controller
  * 2 Pololu A4988 Stepper Motor 
    
## Things to be accomplished
This branch is the API that will allow for automated control of the robot.
In order to control the robot, there will be a REST API through NodeJS

The C# Program that is running and gathering the data from the Kinect
will be throwing REST API Requests in order to control the robot.

All the robots hardware interfacing is done through nodejs and the johnny-five framework.

TODO: Create the C# REST Client
TODO: Add authentication so no arbitrary requests can control the robot
TODO: Implement some form of JSON to adjust movement values mid control
