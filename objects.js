const ship = {
  x: canvas.width/2,
  y: canvas.height/2,
  r: 25,
  vx: 0,
  vy: 0,
  a: 90.0,
  rot: 0,
  thrusting: false
}

class Bullet {
  constructor(angle, x, y, vx, vy) {
    this.t = 600;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
  }
}

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
}

export { ship, Bullet, Asteroid }
