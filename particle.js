const debrisCount = 30;
const debrisTime = 500;
const debrisSize = 1;
const debrisVelocity = 4;

class Particle {
  constructor(x, y, vx, vy, t) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.t = t;
  }

  static create(debris, asteroid) {
    const angle = Math.random() * radians(360);
    debris.push(
      new Particle(
        asteroid.x,
        asteroid.y,
        Math.floor((Math.random() * debrisVelocity) / 2) +
          (debrisVelocity / 2) * -Math.cos(angle),
        Math.floor((Math.random() * debrisVelocity) / 2) +
          (debrisVelocity / 2) * Math.sin(angle),
        Math.floor((Math.random() * debrisTime) / 2) + debrisTime / 2
      )
    );
  }

  static drawParticles(particles, size, colour) {
    particles = particles.filter(particle => particle.t > 0);
    particles.forEach(particle => {
      particle.t -= 1000 / 60;
      translate(particle);
      particle.draw(ctx, size, colour);
    });
    return particles;
  }

  static explosion(debris, asteroid) {
    for (let i = 0; i < debrisCount; i++) {
      Particle.create(debris, asteroid);
    }
  }

  draw(ctx, size, colour) {
    ctx.fillStyle = colour;
    ctx.fillRect(this.x - size / 2, this.y - size / 2, size, size);
  }
}
