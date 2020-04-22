function PressLanguageText() {
    this._blinkTimer = new BlinkTimer(15);
  }
  
  PressLanguageText.prototype.tick = function () {
    this._blinkTimer.tick();
  };
  
  PressLanguageText.prototype.draw = function (ctx) {
    if (!this._blinkTimer.isVisible()) {
      return;
    }
    
    ctx.fillStyle = "red";
    ctx.font = "bold 18px 'Lucida Console', Monaco, monospace"
  
    var textLanguage = "SPEAK TO START"; 
    var textWidth = ctx.measureText(textLanguage).width;
  
    // Draw text in the center of the canvas.
    var x = ctx.canvas.width / 2 - textWidth / 2;
    var y = ctx.canvas.height / 2;
    ctx.fillText(textLanguage, x+15, y+30);  
  };