class Game {
  constructor(lives, restartTimer) {
    this.lives = lives;
    this.restartTimer = restartTimer * 60;
    this.score = 0;
    this.ship = new Ship(canvas, shipSize, false);
    this.state = gameStates.pre;
    this.mode = gameModes.easy;
    Asteroid.init(asteroidCount, this.ship);
  }

  pre() {
    this.score = 0;
    drawText("130px Ariel", "JS-teroids", 360, 360, false);
    drawText("40px Ariel", "push space to start", 450, 420, true);
    asteroids.forEach(asteroid => {
      translate(asteroid);
      asteroid.bounceTitle();
      asteroid.draw(ctx);
    });
  }

  play() {
    if (this.ship.lives <= 0) {
      this.state = gameStates.post;
      playSound("game_over.mp3");
    }

    if (this.score > hiScore) hiScore = this.score;

    drawText("20px Georgia", `Score: ${this.score}`, 50, 50, false);
    drawText("20px Georgia", `Hi-Score: ${hiScore}`, 1000, 50, false);

    for (let i = 0; i < this.ship.lives; i++) {
      drawShip(ctx, gameColour, 55 + i * 20, 70, 10, 90);
    }

    this.ship.draw(ctx, gameColour);
    this.ship.transform();

    this._drawParticles();

    thrustRed = Math.random() * 255;
    thrustParticles = Particle.drawParticles(
      thrustParticles,
      thrustSize,
      `rgb(255, ${thrustRed}, 0)`
    );

    if (!asteroids.length) {
      playSound("level_complete.mp3");
      Asteroid.init(++asteroidCount, this.ship);
    }

    this._engageAsteroids();
  }
  post() {
    this._drawParticles();
    drawText("20px Georgia", `Score: ${this.score}`, 50, 50, false);
    drawText("20px Georgia", `Hi-Score: ${hiScore}`, 1000, 50, false);
    drawText("80px Ariel", "GAME OVER", 360, 360, false);
    this._engageAsteroids();
    this.restartTimer--;
    if (this.restartTimer <= 0) game = new Game(lives, restartTimerSecs);
  }

  _engageAsteroids() {
    asteroids.forEach(asteroid => {
      translate(asteroid);
      bullets.forEach(bullet => {
        asteroid.collide(canvas);
      });
      if (this.state == gameStates.play) this.ship.collide(asteroid);
      asteroid.draw(ctx);
    });
  }

  _drawParticles() {
    bullets = Particle.drawParticles(bullets, bulletSize, gameColour);
    debris = Particle.drawParticles(debris, debrisSize, gameColour);
    this.ship.drawDebris();
  }
}
