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

function drawTitleScreen() {
  ctx.font = "130px Ariel";
  let colour = "white";
  ctx.fillStyle = colour;
  ctx.fillText("JS-teroids", 360, 360);
  ctx.font = "40px Ariel";
  colour = flashFillStyle(0.03, 0.5, colour);
  ctx.fillStyle = colour;
  ctx.fillText("push space to start", 450, 420);
}

function flashFillStyle(speed, depth, colour) {
  opacity = descending ? opacity - speed : opacity + speed;
  if (opacity > 1) descending = true;
  if (opacity < 1 - depth) descending = false;
  return `rgba(255, 255, 255, ${opacity})`;
}

function drawGameOverScreen() {
  ctx.font = "80px Ariel";
  ctx.fillStyle = "white";
  ctx.fillText("GAME OVER", 360, 360);
}

function drawScore(ctx) {
  ctx.font = "20px Georgia";
  ctx.fillStyle = "white";
  ctx.fillText(`Score: ${score}`, 50, 50);
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
      score += 3;
      break;
    case asteroidSizes.medium:
      score += 5;
      break;
    case asteroidSizes.small:
      score += 7;
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
