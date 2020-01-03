var canvas = document.getElementById('game-area');
var ctx = canvas.getContext('2d');

function radians(degrees) {
  return degrees * (Math.PI/180);
}

function capNum(num, max) {
  return num > max ? max : num;
}

const rotateSpeed = 2;
const thrust = 8 / 60;
const maxSpeed = 10;
const bulletVelocity = 12;
const asteroidCount = 4;

let bullets = [];
const asteroids = [];

const ship = {
  x: canvas.width / 2,
  y: canvas.height / 2,
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

//listeners
document.addEventListener('keydown', (e) => {
  switch(e.key) {
    case 'ArrowRight':
      ship.rot = rotateSpeed;
      break;
    case 'ArrowLeft':
      ship.rot = -rotateSpeed;
      break;
    case 'ArrowUp':
      ship.thrusting = true;
      break;
    case ' ':
      createBullet();
      break;
    default:
      break;
  }
});

document.addEventListener('keyup', (e) => {
  switch(e.key) {
    case 'ArrowRight':
      ship.rot = 0;
      break;
    case 'ArrowLeft':
      ship.rot = 0;
      break;
    case 'ArrowUp':
      ship.thrusting = false;
      break;
    default:
      break;
  }
});

function translate(object) {
  object.x += object.vx;
  object.y -= object.vy;

  if (object.x > canvas.width) object.x = 0;
  if (object.x < 0) object.x = canvas.width;
  if (object.y > canvas.height) object.y = 0;
  if (object.y < 0) object.y = canvas.height;
}

function accelerate(ship) {
    ship.vx = capNum(ship.vx -= thrust * Math.cos(radians(ship.a)), maxSpeed);
    ship.vy = capNum(ship.vy += thrust * Math.sin(radians(ship.a)), maxSpeed);

}

function collideBullet(bullet, asteroid) {
  const a = Math.abs(bullet.x - asteroid.x);
  const b = Math.abs(bullet.y - asteroid.y);
  const c = Math.sqrt((a * a) + (b * b));
  if (c < asteroid.r) {
    asteroids.splice(asteroids.indexOf(asteroid), 1);
    bullets.splice(bullets.indexOf(bullet), 1);
  }
}

function collideShip(asteroid) {
  const a = Math.abs(ship.x - asteroid.x);
  const b = Math.abs(ship.y - asteroid.y);
  const c = Math.sqrt((a * a) + (b * b));
  if (c < asteroid.r + ship.r) {
    ship.x = canvas.width / 2;
    ship.x = canvas.width / 2;
  }
}

function createBullet() {
  bullets.push(new Bullet(ship.a,
                          ship.x - ship.r * Math.cos(radians(ship.a)),
                          ship.y - ship.r * Math.sin(radians(ship.a)),
                          bulletVelocity * -(Math.cos(radians(ship.a))) + ship.vx,
                          bulletVelocity * (Math.sin(radians(ship.a))) + ship.vy
                          )
              )
}

function createAsteroid() {
  const asteroid = new Asteroid(Math.floor(Math.random() * 4) + 5,
                            Math.floor(Math.random() * canvas.width),
                            Math.floor(Math.random() * canvas.height),
                            Math.floor(Math.random() * 80) + 80,
                            Math.random() * 2 - 1,
                            Math.random() * 2 - 1,
                          )
  for (let i = 0; i < asteroid.sides; i++) {
    asteroid.rVar.push(Math.floor(Math.random() * 60) - 30)
  }
  return asteroid;
}

for (let i = 0; i < asteroidCount; i++) {
  asteroids.push(createAsteroid());
}

window.requestAnimationFrame(update);

function update() {
  //fill BG
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //draw ship
  ctx.fillStyle = "white";
  ctx.strokeStyle = "white";
  ctx.beginPath();
  ctx.moveTo(ship.x - ship.r * Math.cos(radians(ship.a)), ship.y - ship.r * Math.sin(radians(ship.a)));
  ctx.lineTo(ship.x + ship.r * Math.cos(radians(40  + ship.a - 90)), ship.y + ship.r * Math.sin(radians(40  + ship.a - 90)));
  ctx.lineTo(ship.x + ship.r * Math.cos(radians(140  + ship.a - 90)), ship.y + ship.r * Math.sin(radians(140  + ship.a - 90)));
  ctx.closePath();
  ctx.stroke();

  asteroids.forEach((asteroid) => {
    translate(asteroid);
    bullets.forEach((bullet) => {
      collideBullet(bullet, asteroid);
    });
    collideShip(asteroid);
    ctx.moveTo(asteroid.x, asteroid.y + asteroid.r);
    let angle = asteroid.a;
    let radiusVar = asteroid.r;
    for (let i = 0; i <= asteroid.sides; i++) {
      // radiusVar = asteroid.r - asteroid.rVar[i];
      ctx.lineTo(asteroid.x + radiusVar * Math.cos(radians(angle)), asteroid.y + radiusVar * Math.sin(radians(angle)));
      angle = (angle += asteroid.a) % 360;
    }
    ctx.stroke();
  });

  // transform and draw bullets
  bullets = bullets.filter(bullet => bullet.t > 0);
  bullets.forEach((bullet) => {
    bullet.t -= 1000/60;
    translate(bullet);
    ctx.fillRect(bullet.x - 1, bullet.y - 1, 2, 2);
  });

  // move ship
  if (ship.thrusting) accelerate(ship);
  translate(ship);
  ship.a += ship.rot;


  window.requestAnimationFrame(update);
}
