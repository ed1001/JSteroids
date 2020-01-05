function radians(degrees) {
  return degrees * (Math.PI / 180);
}

function capNum(num, max) {
  return num > max ? max : num;
}

function translate(object) {
  object.x += object.vx;
  object.y -= object.vy;

  if (object.x > canvas.width) object.x = 0;
  if (object.x < 0) object.x = canvas.width;
  if (object.y > canvas.height) object.y = 0;
  if (object.y < 0) object.y = canvas.height;
}
