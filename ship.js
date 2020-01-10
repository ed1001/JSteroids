const shipSize = 20;
const rotateSpeed = 3;
const thrust = 8 / 60;
const maxSpeed = 10;
const shipDebrisTime = 1500;
const shipDebrisSize = 4;
let shipDebrisOpacity = 1;
let opacity = 1;
let descending = true;

class Ship {
  constructor(canvas, radius) {
    this.startX = this.x = canvas.width / 2;
    this.startY = this.y = canvas.height / 2;
    this.r = radius;
    this.vx = 0;
    this.vy = 0;
    this.a = 90;
    this.rot = 0;
    this.thrusting = false;
    this.invulnerable = false;
    this.lives = lives;
  }

  draw(ctx) {
    let colour = "white";
    ctx.fillStyle = colour;

    if (this.invulnerable) colour = flashFillStyle(0.1, 1, colour);
    if (this.thrusting) Thrust.create(thrustParticles, this);
    drawShip(ctx, colour, this.x, this.y, this.r, this.a);
  }

  accelerate() {
    this.vx = capNum((this.vx -= thrust * Math.cos(radians(this.a))), maxSpeed);
    this.vy = capNum((this.vy -= thrust * Math.sin(radians(this.a))), maxSpeed);
  }

  transform() {
    if (this.thrusting) this.accelerate();
    translate(this);
    ship.a += ship.rot;
  }

  shoot() {
    bullets.push(
      new Particle(
        this.x - this.r * Math.cos(radians(this.a)),
        this.y - this.r * Math.sin(radians(this.a)),
        bulletVelocity * -Math.cos(radians(this.a)) + this.vx,
        bulletVelocity * -Math.sin(radians(this.a)) + this.vy,
        bulletTime
      )
    );
  }

  collide(asteroid) {
    const a = Math.abs(this.x - asteroid.x);
    const b = Math.abs(this.y - asteroid.y);
    const c = Math.sqrt(a * a + b * b);
    if (c < asteroid.r + this.r && !this.invulnerable) {
      Particle.burst(
        shipDebris,
        debrisCount,
        this,
        Math.floor((Math.random() * shipDebrisTime) / 2) + shipDebrisTime / 2,
        0,
        360
      );
      this.reset();
      playSound("ship_crash.mp3");
      shipDebrisOpacity = 1;
    }
  }

  drawDebris() {
    shipDebrisOpacity =
      shipDebrisOpacity < 0
        ? 1
        : shipDebrisOpacity - 0.016 / (shipDebrisTime / 1000);
    shipDebris = Particle.drawParticles(
      shipDebris,
      shipDebrisSize,
      `rgba(255, 255, 255, ${shipDebrisOpacity})`
    );
  }

  reset() {
    this.lives--;
    this.x = this.startX;
    this.y = this.startY;
    this.vx = 0;
    this.vy = 0;
    this.a = 90;
    this.invulnerable = true;
    setTimeout(() => {
      this.invulnerable = false;
    }, 3000);
  }
}
