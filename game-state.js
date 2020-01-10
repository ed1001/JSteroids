function pre(ctx) {
  score = 0;
  drawTitleScreen();
  asteroids.forEach(asteroid => {
    translate(asteroid);
    asteroid.bounceTitle();
    asteroid.draw(ctx);
  });
}

function play(ctx) {
  if (ship.lives <= 0) {
    gameState = gameStates.post;
    playSound("game_over.mp3");
  }

  drawScore(ctx);

  for (let i = 0; i < ship.lives; i++) {
    drawShip(ctx, "white", 55 + i * 20, 70, 10, 90);
  }

  ship.draw(ctx);
  ship.transform();

  bullets = Particle.drawParticles(bullets, bulletSize, "white");
  debris = Particle.drawParticles(debris, debrisSize, "white");
  ship.drawDebris();

  thrustRed = Math.random() * 255;
  thrustParticles = Particle.drawParticles(
    thrustParticles,
    thrustSize,
    `rgb(255, ${thrustRed}, 0)`
  );

  if (!asteroids.length) {
    playSound("level_complete.mp3");
    Asteroid.init(++asteroidCount, ship);
  }

  asteroids.forEach(asteroid => {
    translate(asteroid);
    bullets.forEach(bullet => {
      asteroid.collide(asteroid, asteroids, bullets, debris, canvas);
    });
    ship.collide(asteroid);
    asteroid.draw(ctx);
  });
}

function post(ctx) {
  debris = Particle.drawParticles(debris, debrisSize);
  ship.drawDebris();
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
  restartTimer;
  if (restartTimer <= 0) resetGame();
}

function resetGame() {
  asteroids = [];
  ship.lives = lives;
  Asteroid.init(asteroidCount, ship);
  gameState = gameStates.pre;
  restartTimer = 3 * 60;
}
