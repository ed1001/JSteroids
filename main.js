var canvas = document.getElementById("game-area");
var ctx = canvas.getContext("2d");

let lives = 4;
let asteroidCount = 3;
let hiScore = 0;
let gameMode = gameModes[0];
let gameColour = gameColours[0];
const restartTimerSecs = 3;

let game = new Game(lives, restartTimerSecs, 0, 0);
window.requestAnimationFrame(update);
alert(
  "Use left and right arrow keys to turn, up to thrust and space to shoot.\nMay the odds be forever in your favour."
);

function update() {
  drawBg(ctx);

  switch (game.state) {
    case gameStates.pre:
      game.pre();
      break;
    case gameStates.play:
      game.play();
      break;
    case gameStates.post:
      game.post();
      break;
  }

  window.requestAnimationFrame(update);
}
