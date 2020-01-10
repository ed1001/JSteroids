function radians(degrees) {
  return degrees * (Math.PI / 180);
}

function capNum(num, max) {
  return num > max ? max : num;
}

function translate(object) {
  object.x += object.vx;
  object.y += object.vy;

  if (object.x > canvas.width) object.x = 0;
  if (object.x < 0) object.x = canvas.width;
  if (object.y > canvas.height) object.y = 0;
  if (object.y < 0) object.y = canvas.height;
}

function drawBg(ctx) {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawText(font, text, x, y, flash, colour = gameColour) {
  ctx.font = font;
  ctx.fillStyle = flash ? flashFillStyle(0.03, 0.5, colour) : colour;
  ctx.fillText(text, x, y);
}

function flashFillStyle(speed, depth, colour) {
  opacity = opacityDesc ? opacity - speed : opacity + speed;
  if (opacity > 1) opacityDesc = true;
  if (opacity < 1 - depth) opacityDesc = false;
  return `${colour.slice(0, -2)}${opacity})`;
}

function drawShip(ctx, colour, x, y, r, a) {
  ctx.strokeStyle = colour;
  ctx.beginPath();
  ctx.moveTo(x - r * Math.cos(radians(a)), y - r * Math.sin(radians(a)));
  ctx.lineTo(
    x + r * Math.cos(radians(-50 + a)),
    y + r * Math.sin(radians(-50 + a))
  );
  ctx.lineTo(
    x + r * Math.cos(radians(50 + a)),
    y + r * Math.sin(radians(50 + a))
  );
  ctx.closePath();
  ctx.stroke();
}

function incrementScore(size) {
  switch (size) {
    case asteroidSizes.large:
      game.score += 3;
      break;
    case asteroidSizes.medium:
      game.score += 5;
      break;
    case asteroidSizes.small:
      game.score += 7;
      break;
    default:
      break;
  }
}

function playSound(file) {
  const sound = new Audio(file);
  sound.play();
}

function playPauseLoop(sound, play) {
  play ? sound.play() : sound.pause();
}

function playBoomSound(size) {
  let sound;

  switch (size) {
    case asteroidSizes.large:
      sound = new Audio("boom_big.mp3");
      break;
    case asteroidSizes.medium:
      sound = new Audio("boom_mid.mp3");
      break;
    case asteroidSizes.small:
      sound = new Audio("boom_small.mp3");
      break;
    default:
      break;
  }
  sound.play();
}

function between(a, b, x) {
  return x > a && x < b;
}
