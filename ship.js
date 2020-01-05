const shipSize = 20;
const rotateSpeed = 2;
const thrust = 8 / 60;
const maxSpeed = 10;

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
    ctx.strokeStyle = this.invulnerable ? "red" : "white";
    ctx.beginPath();
    ctx.moveTo(
      this.x - this.r * Math.cos(radians(this.a)),
      this.y - this.r * Math.sin(radians(this.a))
    );
    ctx.lineTo(
      this.x + this.r * Math.cos(radians(40 + this.a - 90)),
      this.y + this.r * Math.sin(radians(40 + this.a - 90))
    );
    ctx.lineTo(
      this.x + this.r * Math.cos(radians(140 + this.a - 90)),
      this.y + this.r * Math.sin(radians(140 + this.a - 90))
    );
    ctx.closePath();
    ctx.stroke();
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
    if (c < asteroid.r + this.r) {
      this.reset();
    }
  }

  reset() {
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
