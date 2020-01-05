const bulletSize = 3;
const bulletVelocity = 12;
let loaded = true;

class Bullet {
  constructor(angle, x, y, vx, vy) {
    this.t = 600;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
  }

  static create(bullets) {
    bullets.push(
      new Bullet(
        ship.a,
        ship.x - ship.r * Math.cos(radians(ship.a)),
        ship.y - ship.r * Math.sin(radians(ship.a)),
        bulletVelocity * -Math.cos(radians(ship.a)) + ship.vx,
        bulletVelocity * Math.sin(radians(ship.a)) + ship.vy
      )
    );
  }

  draw(ctx) {
    ctx.fillRect(
      this.x - bulletSize / 2,
      this.y - bulletSize / 2,
      bulletSize,
      bulletSize
    );
  }

  collide(asteroid, asteroids, bullets, canvas) {
    const a = Math.abs(this.x - asteroid.x);
    const b = Math.abs(this.y - asteroid.y);
    const c = Math.sqrt(a * a + b * b);
    if (c < asteroid.r) {
      incrementScore(asteroid.r);
      asteroid.break(asteroids, canvas);
      asteroids.splice(asteroids.indexOf(asteroid), 1);
      bullets.splice(bullets.indexOf(this), 1);
    }
  }
}
