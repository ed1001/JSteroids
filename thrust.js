// class Thrust extends Particle {
//   constructor() {
//     super();
//     this.x = x;
//     this.y = y;
//     this.vx = vx;
//     this.vy = vy;
//     this.t = t;
//   }

//   static create(thrustParticles, ship) {
//     const angle =
//       Math.random() * (radians(ship.a + 22) - radians(ship.a - 22)) +
//       radians(ship.a - 22);
//     thrustParticles.push(
//       new Particle(
//         ship.x + ((ship.r * 3) / 5) * Math.cos(radians(ship.a)),
//         ship.y + ((ship.r * 3) / 5) * Math.sin(radians(ship.a)),
//         thrustVelocity * Math.cos(angle),
//         thrustVelocity * Math.sin(angle),
//         Math.floor((Math.random() * thrustTime) / 2) + thrustTime / 2
//       )
//     );
//   }
// }
