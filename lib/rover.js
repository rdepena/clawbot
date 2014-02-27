var five = require("johnny-five"),
    board = new five.Board({
        //here we specify the bluetooth port.
        port: "/dev/tty.Arduino1-DevB"
    }),
    dualShock = require('dualshock-controller')();

board.on("ready", function() {
    dualShock.connect();
    //define left/right motors.
    var motorRight = new five.Motor({
        pins: {
            pwm: 3,
            dir: 12
        }
    }),
    motorLeft = new five.Motor({
        pins: {
            pwm: 11,
            dir: 13
        }
    }),
    //claw servo.
    claw = new five.Servo({
        pin : 6
    }),
    speed = 255;

    //all the release events will force a stop.
    var stop = function () {
        motorRight.stop();
        motorLeft.stop();
    };

    //directional pad of the controller will move the bot.
    dualShock.on('dpadUp:press', function () {
        motorRight.forward(speed);
        motorLeft.forward(speed);
    });
    dualShock.on('dpadUp:release', function () {
        stop();
    });
    dualShock.on('dpadRight:press', function () {
        motorRight.reverse(speed);
        motorLeft.forward(speed);
    });
    dualShock.on('dpadRight:release', function () {
        stop();
    });
    dualShock.on('dpadLeft:press', function () {
        motorRight.forward(speed);
        motorLeft.reverse(speed);
    });
    dualShock.on('dpadLeft:release', function () {
        stop();
    });
    dualShock.on('dpadDown:press', function () {
        motorRight.reverse(speed);
        motorLeft.reverse(speed);
    });
    dualShock.on('dpadDown:release', function () {
        stop();
    });
    ///claw.
    dualShock.on('x:press', function () {
        claw.to(0);
    });
    dualShock.on('square:press', function () {
        claw.to(200);
    });
});
