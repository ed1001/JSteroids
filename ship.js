const shipSize = 20;
const rotateSpeed = 3;
const thrust = 8 / 60;
const maxSpeed = 10;

const shipDebrisTime = 1500;
const shipDebrisSize = 4;

let shipDebrisOpacity = 1;
let opacity = 1;
let opacityDesc = true;

const thrustTime = 85;
const thrustVelocity = 5;
const thrustSize = 4;
const thrustVariance = 22;
let thrustRed;
let playingThrustSound = false;
const thrustSound = new Audio("thrust.mp3");
thrustSound.loop = true;

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

  draw(ctx, colour) {
    ctx.fillStyle = colour;

    if (this.invulnerable) colour = flashFillStyle(0.1, 1, colour);
    if (this.thrusting) this.thrust();
    drawShip(ctx, colour, this.x, this.y, this.r, this.a);
  }

  accelerate() {
    this.vx = capNum((this.vx -= thrust * Math.cos(radians(this.a))), maxSpeed);
    this.vy = capNum((this.vy -= thrust * Math.sin(radians(this.a))), maxSpeed);
  }

  transform() {
    if (this.thrusting) this.accelerate();
    translate(this);
    this.a += this.rot;
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
      `${gameColour.slice(0, -2)}${shipDebrisOpacity})`
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

  thrust() {
    const angle =
      Math.random() *
        (radians(this.a + thrustVariance) - radians(this.a - thrustVariance)) +
      radians(this.a - thrustVariance);
    thrustParticles.push(
      new Particle(
        this.x + ((this.r * 3) / 5) * Math.cos(radians(this.a)),
        this.y + ((this.r * 3) / 5) * Math.sin(radians(this.a)),
        thrustVelocity * Math.cos(angle),
        thrustVelocity * Math.sin(angle),
        Math.floor((Math.random() * thrustTime) / 2) + thrustTime / 2
      )
    );
  }
}
