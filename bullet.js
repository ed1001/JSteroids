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

  // static create(bullets) {
  //   bullets.push(
  //     new Bullet(
  //       ship.x - ship.r * Math.cos(radians(ship.a)),
  //       ship.y - ship.r * Math.sin(radians(ship.a)),
  //       bulletVelocity * -Math.cos(radians(ship.a)) + ship.vx,
  //       bulletVelocity * -Math.sin(radians(ship.a)) + ship.vy,
  //       bulletTime
  //     )
  //   );
  // }
}
