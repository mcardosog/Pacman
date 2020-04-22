var lastScore =0; 
var highScore =0; 

function StartupScene(game) {
  this._game = game;
  this._pressEnterText = new PressEnterText();
  this._pressLanguageText = new PressLanguageText();
  
  this._pacman = new Pacman(this, game);
  this._pacman.setStrategy(new PacmanStartupSceneStrategy(this._pacman, this));
  this._pacman.setCurrentSpeed(4);
  this._pacman.setSpeed(4);
  this._pacman.setPosition(new Position(90, 190));
  this._pacman.setDirection(DIRECTION_RIGHT);
  this._keypress; 
}

StartupScene.prototype.keyPressed = function (key) {
  this._keypress = key; 
  if (key == KEY_ENTER) {
    this._game.setScene(new PlayScene(this._game));
  }
};

StartupScene.prototype.tick = function () {
  this._pressEnterText.tick();
  this._pressLanguageText.tick();
  this._pacman.tick();
};

StartupScene.prototype.draw = function (ctx) {

  lastScore = this._pacman.getLastScore(); 

  if(lastScore > highScore){
    highScore = lastScore; 
  }
  
  this._drawTitle(ctx);
  this._pressLanguageText.draw(ctx);
  this._drawLanguages(ctx);
  this._pacman.draw(ctx);
};


StartupScene.prototype.getX = function () {
  return 0;
};

StartupScene.prototype.getY = function () {
  return 0;
};

StartupScene.prototype._drawTitle = function (ctx) {
  ctx.fillStyle = "#ffff00";
  ctx.font = "bold 50px 'Press Start 2P', cursive"; 
  ctx.fillText("GATOR", 155, 120); 
  ctx.fillStyle = "#ffff00";
  ctx.font = "bold 60px 'Press Start 2P', cursive"; 
  ctx.fillText("PAC-MAN", 76, 195);
};

StartupScene.prototype._drawLanguages = function (ctx) {
  ctx.fillStyle = "#dedede";
  ctx.font = "bold 16px 'Lucida Console', Monaco, monospace"; 

  ctx.fillText("LANGUAGES: ENGLISH / SPANISH", 147, 330);
  
  var SCORE_X = 55;
  var SCORE_Y = 30;
  ctx.fillStyle = "#dedede";
  ctx.font = "bold 14px 'Lucida Console', Monaco, monospace"
  var text = "HIGH SCORE: " + highScore;
  ctx.fillText(text, SCORE_X, SCORE_Y);

 if(this._keypress == KEY_SPACE){
   ctx.clearRect(70, 180, 600, 600); 
   ctx.fillText("CONTROL: ARROW KEYS", 180, 300);
   this._pressEnterText.draw(ctx);
   
 }
  
};

