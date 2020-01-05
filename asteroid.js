const asteroidCount = 4;
const asteroidSizes = Object.freeze({ large: 90, medium: 35, small: 12 });

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

  static create(asteroids, radius, canvas) {
    const asteroid = new Asteroid(
      Math.floor(Math.random() * 4) + 10,
      Math.floor(Math.random() * canvas.width),
      Math.floor(Math.random() * canvas.height),
      radius,
      Math.random() * 2 - 1,
      Math.random() * 2 - 1
    );
    for (let i = 0; i < asteroid.sides; i++) {
      asteroid.rVar.push(
        Math.floor((Math.random() * asteroid.r) / 4) -
          (Math.random() * asteroid.r) / 8
      );
    }
    asteroids.push(asteroid);
  }

  static init(count) {
    for (let i = 0; i < count; i++) {
      Asteroid.create(asteroids, asteroidSizes.large, canvas);
    }
  }

  draw(ctx) {
    let angle = this.a;
    let radiusVar;
    ctx.strokeStyle = "white";
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
}
