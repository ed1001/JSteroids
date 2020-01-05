const shipSize = 20;
const rotateSpeed = 3;
const thrust = 8 / 60;
const maxSpeed = 10;
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
  }

  draw(ctx) {
    ctx.fillStyle = "white";
    let colour = "white";

    if (this.invulnerable) {
      colour = `rgba(255, 255, 255, ${opacity})`;
      opacity = descending ? opacity - 0.1 : opacity + 0.1;
      if (opacity > 1) descending = true;
      if (opacity < 0) descending = false;
    }
    drawShip(ctx, colour, this.x, this.y, this.r, this.a);
  }

  accelerate() {
    this.vx = capNum((this.vx -= thrust * Math.cos(radians(this.a))), maxSpeed);
    this.vy = capNum((this.vy += thrust * Math.sin(radians(this.a))), maxSpeed);
  }

  transform() {
    if (this.thrusting) this.accelerate();
    translate(this);
    ship.a += ship.rot;
  }
  collide(asteroid) {
    const a = Math.abs(this.x - asteroid.x);
    const b = Math.abs(this.y - asteroid.y);
    const c = Math.sqrt(a * a + b * b);
    if (c < asteroid.r + this.r && !this.invulnerable) {
      this.reset();
    }
  }

  reset() {
    lives--;
    this.x = this.startX;
    this.y = this.startY;
    this.vx = 0;
    this.vy = 0;
    this.invulnerable = true;
    setTimeout(() => {
      this.invulnerable = false;
    }, 3000);
  }
}
