function Game() {
  this._scene = new StartupScene(this);
  this._eventManager = new EventManager();
  this._keyPressed;
  this.pathToTaget;
  this.singleDirection;
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
  this.pathToTaget = null;
};

//Modified to follow the default key entered
Game.prototype.followDirection = function () {
  keyResult = null;

  if(this.singleDirection) {
    this._scene.keyPressed(this._keyPressed);
    this.pathToTaget = null;
  }

  if(this.pathToTaget != null && this.pathToTaget.length > 0) {
    let pacmanX = this._scene._pacman.getX();
    let pacmanY = this._scene._pacman.getY();

    let xDiff = Math.abs(pacmanX - this.pathToTaget[0].x);
    let yDiff = Math.abs(pacmanY - this.pathToTaget[0].y);
    
    if(xDiff <= 2 && yDiff <= 2) {
      this.pathToTaget.splice(0,1);
    }
    if(this.pathToTaget.length > 0) {
      keyResult = this._setDirection();
      this._keyPressed = keyResult;
    }
    else {
      this.singleDirection = true;
    }
  }

  if(keyResult == null) { 
    if(this._keyPressed == null) { return; }
    keyResult = this._keyPressed;
  }
  this._scene.keyPressed(keyResult);
};

Game.prototype._setDirection = function () {

  let pacmanX = this._scene._pacman.getX();
  let pacmanY = this._scene._pacman.getY();

  let targetX = this.pathToTaget[0].x;
  let targetY = this.pathToTaget[0].y;

  if (targetY > pacmanY) { return KEY_DOWN; }
  if (targetY < pacmanY) { return KEY_UP; }
  if (targetX > pacmanX) { return KEY_RIGHT; }
  if (targetX < pacmanX) { return KEY_LEFT; }
};

Game.prototype.tick = function () {
  this._scene.tick();
};

Game.prototype.draw = function (surface) {
  this._scene.draw(surface);
};
