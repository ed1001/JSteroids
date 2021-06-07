class Game {
  constructor(lives, restartTimer, mode, colour) {
    this.lives = lives;
    this.restartTimer = restartTimer * 60;
    this.score = 0;
    this.ship = new Ship(canvas, shipSize, false);
    this.state = gameStates.pre;
    this.mode = mode;
    this.colour = colour;
    this.asteroidCount = asteroidCount;
    Asteroid.init(asteroidCount, this.ship, gameModes[this.mode]);
  }

  pre() {
    this.score = 0;
    this._drawTitle(360, 400, 430, 455);
    asteroids.forEach(asteroid => {
      translate(asteroid);
      asteroid.bounceTitle();
      asteroid.draw(ctx);
    });
  }

  play() {
    if (this.ship.lives <= 0) {
      this.state = gameStates.post;
      playSound("sounds/game_over.mp3");
    }

    if (this.score > hiScore) hiScore = this.score;

    drawText("20px Georgia", `Score: ${this.score}`, 50, 50, false);
    drawText("20px Georgia", `Hi-Score: ${hiScore}`, 1000, 50, false);

    for (let i = 0; i < this.ship.lives; i++) {
      drawShip(ctx, gameColours[this.colour], 55 + i * 22, 70, 10, 90);
    }

    this.ship.draw(ctx, gameColours[this.colour]);
    this.ship.transform();

    this._drawParticles();

    thrustRed = Math.random() * 255;
    thrustParticles = Particle.drawParticles(
      thrustParticles,
      thrustSize,
      `rgb(255, ${thrustRed}, 0)`
    );

    if (!asteroids.length) {
      playSound("sounds/level_complete.mp3");
      Asteroid.init(++this.asteroidCount, this.ship, gameModes[this.mode]);
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
    if (this.restartTimer <= 0)
      game = new Game(lives, restartTimerSecs, this.mode, this.colour);
  }

  setMode(increment) {
    playSound("sounds/menu_hori.mp3");
    increment ? this.mode++ : this.mode--;
    this.mode = capNum(this.mode, 0, 2);
    gameMode = gameModes[this.mode];
    this.asteroidCount = Math.ceil(asteroidCount * gameModes[this.mode]);
    Asteroid.init(this.asteroidCount, this.ship, gameModes[this.mode]);
  }

  setColour(increment) {
    playSound("sounds/menu_hori.mp3");
    increment ? this.colour++ : this.colour--;
    this.colour = capNum(this.colour, 0, 2);
    gameColour = gameColours[this.colour];
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

  _drawTitle(titleY, startY, modeY, colourY) {
    const arrowY = menuLevel ? colourY : modeY;
    drawText("130px Ariel", "JS-teroids", 360, titleY, false);
    drawText("40px Ariel", "push space to start", 450, startY, true);
    drawText("30px Ariel", "<", 440, arrowY, true);
    drawText("30px Ariel", ">", 730, arrowY, true);
    drawText("30px Ariel", "easy", 470, modeY, this.mode === 0);
    drawText("30px Ariel", "hard", 555, modeY, this.mode === 1);
    drawText("30px Ariel", "insane", 635, modeY, this.mode === 2);
    drawText(
      "30px Ariel",
      "white",
      470,
      colourY,
      this.colour === 0,
      gameColours[0]
    );
    drawText(
      "30px Ariel",
      "blue",
      555,
      colourY,
      this.colour === 1,
      gameColours[1]
    );
    drawText(
      "30px Ariel",
      "yellow",
      635,
      colourY,
      this.colour === 2,
      gameColours[2]
    );
  }

  _drawParticles() {
    bullets = Particle.drawParticles(
      bullets,
      bulletSize,
      gameColours[this.colour]
    );
    debris = Particle.drawParticles(
      debris,
      debrisSize,
      gameColours[this.colour]
    );
    this.ship.drawDebris();
  }
}
