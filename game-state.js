// ! make this a class and add the environment variables here as properties

function pre(ctx) {
  drawTitleScreen();
  asteroids.forEach(asteroid => {
    translate(asteroid);
    asteroid.draw(ctx);
  });
}

function play(ctx) {
  if (lives <= 0) {
    gameState = gameStates.post;
    playSound("game_over.mp3");
  }

  drawScore(ctx);

  for (let i = 0; i < lives; i++) {
    drawShip(ctx, "white", 55 + i * 20, 70, 10, 90);
  }

  ship.draw(ctx);
  ship.transform();

  bullets = bullets.filter(bullet => bullet.t > 0);
  bullets.forEach(bullet => {
    bullet.t -= 1000 / 60;
    translate(bullet);
    bullet.draw(ctx, 3);
  });

  debris = debris.filter(particle => particle.t > 0);
  debris.forEach(particle => {
    particle.t -= 1000 / 60;
    translate(particle);
    particle.draw(ctx, 1);
  });

  if (!asteroids.length) {
    playSound("level_complete.mp3");
    Asteroid.init(++asteroidCount, ship);
  }

  asteroids.forEach(asteroid => {
    translate(asteroid);
    bullets.forEach(bullet => {
      bullet.collide(asteroid, asteroids, bullets, debris, canvas);
    });
    ship.collide(asteroid);
    asteroid.draw(ctx);
  });
}

function post(ctx) {
  drawScore(ctx);
  drawGameOverScreen();
  asteroids.forEach(asteroid => {
    translate(asteroid);
    bullets.forEach(bullet => {
      bullet.collide(asteroid, asteroids, bullets, canvas);
    });
    asteroid.draw(ctx);
  });
  restartTimer--;
  console.log(restartTimer);
  if (restartTimer <= 0) resetGame();
}

function resetGame() {
  console.log("reset");
  asteroids = [];
  lives = 3;
  Asteroid.init(asteroidCount, ship);
  gameState = gameStates.pre;
  restartTimer = 3 * 60;
}
