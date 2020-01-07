const bulletSize = 3;
const bulletVelocity = 12;
const bulletTime = 600;
let loaded = true;

class Bullet extends Particle {
  constructor(x, y, vx, vy, t) {
    super();
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.t = t;
  }

  static create(bullets) {
    playSound("shoot.mp3");

    bullets.push(
      new Bullet(
        ship.x - ship.r * Math.cos(radians(ship.a)),
        ship.y - ship.r * Math.sin(radians(ship.a)),
        bulletVelocity * -Math.cos(radians(ship.a)) + ship.vx,
        bulletVelocity * Math.sin(radians(ship.a)) + ship.vy,
        bulletTime
      )
    );
  }

  collide(asteroid, asteroids, bullets, debris, canvas) {
    const a = Math.abs(this.x - asteroid.x);
    const b = Math.abs(this.y - asteroid.y);
    const c = Math.sqrt(a * a + b * b);
    if (c < asteroid.r) {
      incrementScore(asteroid.r);
      asteroid.break(asteroids, canvas);
      asteroids.splice(asteroids.indexOf(asteroid), 1);
      bullets.splice(bullets.indexOf(this), 1);
      Particle.explosion(debris, asteroid);
      playBoomSound(asteroid.r);
    }
  }
}
