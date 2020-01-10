class Game {
  constructor(lives, restartTimer) {
    this.lives = lives;
    this.restartTimer = restartTimer * 60;
    this.score = 0;
    this.ship = new Ship(canvas, shipSize, false);
    this.state = gameStates.pre;
    this.mode = gameModes[currentMode];
    this.asteroidCount = asteroidCount;
    Asteroid.init(asteroidCount, this.ship, this.mode);
  }

  pre() {
    this.score = 0;
    this._drawTitle(360, 450, 400);
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
      drawShip(ctx, gameColour, 55 + i * 22, 70, 10, 90);
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
      Asteroid.init(++this.asteroidCount, this.ship, this.mode);
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

  setMode(currentMode) {
    playSound("shoot.mp3");
    this.mode = gameModes[currentMode];
    this.asteroidCount = Math.ceil(asteroidCount * this.mode);
    Asteroid.init(this.asteroidCount, this.ship, this.mode);
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

  _drawTitle(titleY, modeY, startY) {
    drawText("130px Ariel", "JS-teroids", 360, titleY, false);
    drawText("40px Ariel", "push space to start", 450, startY, true);
    drawText("30px Ariel", "<", 440, modeY, true);
    drawText("30px Ariel", ">", 730, modeY, true);
    drawText("30px Ariel", "easy", 470, modeY, this.mode === gameModes[1]);
    drawText("30px Ariel", "hard", 555, modeY, this.mode === gameModes[2]);
    drawText("30px Ariel", "insane", 635, modeY, this.mode === gameModes[3]);
  }

  _drawParticles() {
    bullets = Particle.drawParticles(bullets, bulletSize, gameColour);
    debris = Particle.drawParticles(debris, debrisSize, gameColour);
    this.ship.drawDebris();
  }
}
