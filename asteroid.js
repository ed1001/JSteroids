const asteroidSizes = Object.freeze({ large: 90, medium: 35, small: 12 });
const asteroidSpeed = 4;
const spacing = 400;
const leftBoundX = 360 - asteroidSizes["large"];
const rightBoundX = 875 + asteroidSizes["large"];
const topBoundY = 270 - asteroidSizes["large"];
const botBoundY = 430 + asteroidSizes["large"];

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
      } while (Asteroid.checkProximity(x, y, ship.x, ship.y));
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

  static checkProximity(x, y, x1, y1) {
    const a = Math.abs(x - x1);
    const b = Math.abs(y - y1);
    const c = Math.sqrt(a * a + b * b);
    return c < spacing;
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
      const a = Math.abs(this.x - bullet.x);
      const b = Math.abs(this.y - bullet.y);
      const c = Math.sqrt(a * a + b * b);
      if (c < this.r) {
        incrementScore(this.r);
        this.break(asteroids, canvas);
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
    Asteroid.create(asteroids, size, this.x, this.y, this.vy, this.vx);
    Asteroid.create(asteroids, size, this.x, this.y, -this.vy, -this.vx);
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
