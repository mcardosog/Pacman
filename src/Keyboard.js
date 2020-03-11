var KEY_ENTER = 13;
var KEY_LEFT = 37;
var KEY_UP = 38;
var KEY_RIGHT = 39;
var KEY_DOWN = 40;

function Keyboard(game) {
  this._game = game;
  this._keysRealTime = {};
  this._keysCurrentFrame = {};
  this._listen();
}

Keyboard.prototype._listen = function () {
  console.log("22");
  var that = this;
  $(document).keydown(function (event) {
    that._keysRealTime[event.which] = true;
    that._keysCurrentFrame[event.which] = true;
    event.preventDefault();
  });
  $(document).keyup(function (event) {
    that._keysRealTime[event.which] = false;
    event.preventDefault();
  });
};

Keyboard.prototype.handleKeypresses = function () {
  console.log("11");
  for (var key in this._keysCurrentFrame) {
    if (this._keysCurrentFrame[key]) {
      this._game.keyPressed(key);
      if (!this._keysRealTime[key]) {
        this._keysCurrentFrame[key] = false;
      }
    }
  }
};

var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 5;
recognition.continuous = true;
recognition.start();

recognition.onresult = function(event) {
    console.log('You said: ', event.results[0][0].transcript);
    if(event.results[0][0].transcript == "up"){
      console.log("xx");
      //this._game.keyPressed(KEY_UP);
    }
    else{
      console.log('yy');
      //this._game.keyPressed(KEY_DOWN);

    }
};
