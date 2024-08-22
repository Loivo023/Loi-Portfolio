// Game JavaScript
var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.context = this.canvas.getContext("2d");
    document.getElementById("gameCanvasContainer").appendChild(this.canvas);
    this.interval = setInterval(updateGameArea, 20);
    window.addEventListener("keydown", function (e) {
      myGameArea.keys = (myGameArea.keys || []);
      myGameArea.keys[e.key] = true;
    });
    window.addEventListener("keyup", function (e) {
      myGameArea.keys[e.key] = false;
    });
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  keys: []
};

function component(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.speedX = 0;
  this.speedY = 0;
  this.update = function () {
    var ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };
  this.newPos = function () {
    this.x += this.speedX;
    this.y += this.speedY;
    this.hitBoundary();
  };
  this.hitBoundary = function () {
    if (this.x < 0) this.x = 0;
    if (this.y < 0) this.y = 0;
    if (this.x > myGameArea.canvas.width - this.width) this.x = myGameArea.canvas.width - this.width;
    if (this.y > myGameArea.canvas.height - this.height) this.y = myGameArea.canvas.height - this.height;
  };
}

function updateGameArea() {
  myGameArea.clear();
  myGamePiece.newPos();
  myGamePiece.update();
  handleControls();
}

function handleControls() {
  if (myGameArea.keys && myGameArea.keys["ArrowRight"]) {
    myGamePiece.speedX = 5;
  } else if (myGameArea.keys && myGameArea.keys["ArrowLeft"]) {
    myGamePiece.speedX = -5;
  } else {
    myGamePiece.speedX = 0;
  }

  if (myGameArea.keys && myGameArea.keys["ArrowUp"]) {
    myGamePiece.speedY = -5;
  } else if (myGameArea.keys && myGameArea.keys["ArrowDown"]) {
    myGamePiece.speedY = 5;
  } else {
    myGamePiece.speedY = 0;
  }
}

var myGamePiece;

function startGame() {
  myGameArea.start();
  myGamePiece = new component(30, 30, "red", 10, 120);
}

// Initialize the game when the page is loaded
window.onload = function () {
  startGame();
};
