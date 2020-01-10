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

  static drawParticles(particles, size, colour) {
    particles = particles.filter(particle => particle.t > 0);
    particles.forEach(particle => {
      particle.t -= 1000 / 60;
      translate(particle);
      ctx.fillStyle = colour;
      ctx.fillRect(particle.x - size / 2, particle.y - size / 2, size, size);
    });
    return particles;
  }

  static burst(array, count, reference, t, minA, maxA) {
    for (let i = 0; i < count; i++) {
      const angle =
        Math.random() * (radians(maxA) - radians(minA)) + radians(minA);
      array.push(
        new Particle(
          reference.x,
          reference.y,
          Math.floor((Math.random() * debrisVelocity) / 2) +
            (debrisVelocity / 2) * -Math.cos(angle),
          Math.floor((Math.random() * debrisVelocity) / 2) +
            (debrisVelocity / 2) * Math.sin(angle),
          t
        )
      );
    }
  }
}

// Math.random() * (radians(ship.a + 22) - radians(ship.a - 22)) +
// radians(ship.a - 22);
