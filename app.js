var 
	five = require('johnny-five')
	, board = new five.Board()
;

board.on('ready', function() {
	
	var 
		white = new five.Led(3)
		, green = new five.Led(5)
	;

	/*blue.fader = fader.bind(blue);
	white.fader = fader.bind(white);

	blue.fader();
	white.fader();*/

  var ping = new five.Ping({
  pin: 7,
  freq: 50,
  pulse: 50});

  ping.on("change", function( err, value ) {
  	/*if(this.cm < 10){
  		green.strobe(this.cm * this.cm * 10)
  		white.strobe(this.cm * this.cm * 10)
  	} else {
  		green.off();
  		white.off();
  	}*/

  	if(this.cm > 10 && this.cm < 20)
  		green.on();
  	else
  		green.off();

  	if(this.cm > 20 )
  		white.on();
  	else
  		white.off();
    console.log('Object is ' + this.cm + ' cm away');
    //console.log('Object is ' + this.inches + ' inches away');
  });
});

function fader() {

	this.speed = speed();
	if(typeof this.in !== 'boolean') {

		this.in = false;
	}
	if(this.in) {

		fadeOut(this);
	}
	else {

		fadeIn(this);
	}
	setTimeout(function() {

		this.fader();

	}.bind(this), this.speed);
};

function fadeOut(led) {
	
	led.fade(0, led.speed);
	led.in = false;
};

function fadeIn(led) {
	
	led.fade(255, led.speed);
	led.in = true;
};

function speed() {

	return Math.round((Math.random() * 600) + 200);
}
