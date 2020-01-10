class Asteroid {
  constructor(sides, x, y, r, vx, vy) {
    this.sides = sides;
    this.x = x;
    this.y = y;
    this.r = r;
    this.vx = vx;
    this.vy = vy;
    this.a = 360 / sides;
    this.rVar = [];
  }

  static create(asteroids, radius, x, y, vx, vy) {
    const asteroid = new Asteroid(
      Math.floor(Math.random() * 4) + 10,
      x,
      y,
      radius,
      vx,
      vy
    );
    for (let i = 0; i < asteroid.sides; i++) {
      asteroid.rVar.push(
        Math.floor((Math.random() * asteroid.r) / 4) -
          (Math.random() * asteroid.r) / 8
      );
    }
    asteroids.push(asteroid);
  }

  static init(count, ship) {
    asteroids = [];
    let x;
    let y;
    for (let i = 0; i < count; i++) {
      do {
        x = Math.floor(Math.random() * canvas.width);
        y = Math.floor(Math.random() * canvas.height);
      } while (checkProximity(x, y, ship.x, ship.y, spacing));
      Asteroid.create(
        asteroids,
        asteroidSizes.large,
        x,
        y,
        Math.random() * asteroidSpeed - asteroidSpeed / 2,
        Math.random() * asteroidSpeed - asteroidSpeed / 2
      );
    }
  }

  draw(ctx) {
    let angle = this.a;
    let radiusVar;
    ctx.strokeStyle = gameColour;
    ctx.beginPath();
    ctx.moveTo(
      this.x + radiusVar * Math.cos(radians(angle)),
      this.y + radiusVar * Math.sin(radians(angle))
    );
    for (let i = 0; i <= this.sides; i++) {
      radiusVar = this.r - this.rVar[i];
      angle += this.a;
      ctx.lineTo(
        this.x + radiusVar * Math.cos(radians(angle)),
        this.y + radiusVar * Math.sin(radians(angle))
      );
    }
    ctx.closePath();
    ctx.stroke();
  }

  collide(canvas) {
    bullets.forEach(bullet => {
      if (checkProximity(this.x, this.y, bullet.x, bullet.y, this.r)) {
        incrementScore(this.r);
        this.break(asteroids);
        asteroids.splice(asteroids.indexOf(this), 1);
        bullets.splice(bullets.indexOf(bullet), 1);
        Particle.burst(
          debris,
          debrisCount,
          this,
          Math.floor((Math.random() * debrisTime) / 2) + debrisTime / 2,
          0,
          360
        );
        playBoomSound(this.r);
      }
    });
  }

  break(asteroids) {
    if (this.r === asteroidSizes.small) return;

    const size =
      this.r === asteroidSizes.large
        ? asteroidSizes.medium
        : asteroidSizes.small;
    Asteroid.create(asteroids, size, this.x, this.y, -this.vy, this.vx);
    Asteroid.create(asteroids, size, this.x, this.y, this.vy, -this.vx);
  }

  bounceTitle() {
    if (
      between(leftBoundX, rightBoundX, this.x) &&
      between(topBoundY, botBoundY, this.y)
    ) {
      if (this.vx > 0 && this.vy > 0) {
        this.x - leftBoundX > this.y - topBoundY
          ? (this.vy = -this.vy)
          : (this.vx = -this.vx);
      } else if (this.vx > 0 && this.vy < 0) {
        this.x - leftBoundX > botBoundY - this.y
          ? (this.vy = -this.vy)
          : (this.vx = -this.vx);
      } else if (this.vx < 0 && this.vy > 0) {
        rightBoundX - this.x > this.y - topBoundY
          ? (this.vy = -this.vy)
          : (this.vx = -this.vx);
      } else if (this.vx < 0 && this.vy < 0) {
        rightBoundX - this.x > botBoundY - this.y
          ? (this.vy = -this.vy)
          : (this.vx = -this.vx);
      }
    }
  }
}
