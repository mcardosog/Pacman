function Game() {
  this._scene = new StartupScene(this);
  this._eventManager = new EventManager();
  this._keyPressed;
  this.pathToTaget;
}

Game.prototype.getEventManager = function () {
  return this._eventManager;
};

Game.prototype.setScene = function (scene) {
  this._scene = scene;
};

Game.prototype.getScene = function () {
  return this._scene;
};

Game.prototype.keyPressed = function (key) {
  this._scene.keyPressed(key);
  this._keyPressed = null;
};

//Modified to follow the default key entered
Game.prototype.followDirection = function () {
  keyResult = null;
  
  if(this.pathToTaget != null && this.pathToTaget.length > 0) {
    keyResult = this._setDirection();
      this.pathToTaget.splice(0,1);
  }

  if(keyResult == null) { 
    if(this._keyPressed == null) { return; }
    keyResult = this._keyPressed;
  }
  this._scene.keyPressed(keyResult);
};

Game.prototype._setDirection = function () {

  if (this.pathToTaget[0].x == this._scene._pacman.getX()) {
    if (this.pathToTaget[0].y > this._scene._pacman.getY()) {
      return KEY_DOWN;
    }
    else {
      return KEY_UP;
    }
  }
  else {
    if (this.pathToTaget[0].x > this._scene._pacman.getX()) {
      return KEY_RIGHT;
    }
    else {
      return KEY_LEFT;
    }
  }
};

Game.prototype.tick = function () {
  this._scene.tick();
};

Game.prototype.draw = function (surface) {
  this._scene.draw(surface);
};
