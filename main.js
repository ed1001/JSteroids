var canvas = document.getElementById("game-area");
var ctx = canvas.getContext("2d");

let lives = 4;
let asteroidCount = 4;
let hiScore = 0;
const restartTimerSecs = 3;
const gameColour = "rgba(0, 255, 255, 1)";

let game = new Game(lives, restartTimerSecs);
window.requestAnimationFrame(update);

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
