function StartupScene(game) {
  this._game = game;
  this._pressEnterText = new PressEnterText();
  this._pressLanguageText = new PressLanguageText();
  
  this._pacman = new Pacman(this, game);
  this._pacman.setStrategy(new PacmanStartupSceneStrategy(this._pacman, this));
  this._pacman.setCurrentSpeed(4);
  this._pacman.setSpeed(4);
  this._pacman.setPosition(new Position(90, 160));
  this._pacman.setDirection(DIRECTION_RIGHT);
  var keypress; 
}

StartupScene.prototype.keyPressed = function (key) {
  keypress = key; 
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
  ctx.font = "bold 90px 'Lucida Console', Monaco, monospace"
  ctx.fillText("PAC-MAN", 76, 150);
};

StartupScene.prototype._drawLanguages = function (ctx) {
  ctx.fillStyle = "#dedede";
  ctx.font = "bold 16px 'Lucida Console', Monaco, monospace"; 

  ctx.fillText("ENGLISH", 230, 300);
  ctx.fillText("SPANISH", 230, 330);

 if(keypress == KEY_SPACE){
   ctx.clearRect(70, 150, 600, 600); 
   ctx.fillText("CONTROL: ARROW KEYS", 180, 300);
   this._pressEnterText.draw(ctx);
   

 }
  
};

