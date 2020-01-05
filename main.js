var canvas = document.getElementById("game-area");
var ctx = canvas.getContext("2d");

const ship = new Ship(canvas, shipSize);
let bullets = [];
const asteroids = [];

Asteroid.init(asteroidCount);
window.requestAnimationFrame(update);

function update() {
  //fill BG
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ship.draw(ctx);
  ship.transform();

  bullets = bullets.filter(bullet => bullet.t > 0);
  bullets.forEach(bullet => {
    bullet.t -= 1000 / 60;
    translate(bullet);
    bullet.draw(ctx);
  });

  asteroids.forEach(asteroid => {
    translate(asteroid);
    bullets.forEach(bullet => {
      bullet.collide(asteroid, asteroids, bullets);
    });
    ship.collide(asteroid);
    asteroid.draw(ctx);
  });

  window.requestAnimationFrame(update);
}
