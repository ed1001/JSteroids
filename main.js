var canvas = document.getElementById("game-area");
var ctx = canvas.getContext("2d");

const gameStates = Object.freeze({ pre: 90, play: 35, post: 12 });
let gameState = gameStates.pre;
let lives = 1;
let score = 0;
let level = 1;
let restartTimer = 3 * 60;
const ship = new Ship(canvas, shipSize);
let bullets = [];
let asteroids = [];

Asteroid.init(asteroidCount, ship);
window.requestAnimationFrame(update);

function update() {
  drawBg(ctx);

  switch (gameState) {
    case gameStates.pre:
      pre(ctx);
      break;
    case gameStates.play:
      play(ctx);
      break;
    case gameStates.post:
      post(ctx);
      break;
  }

  window.requestAnimationFrame(update);
}
