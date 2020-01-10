document.addEventListener("keydown", e => {
  switch (e.key) {
    case "ArrowRight":
      if (game.state === gameStates.pre) {
        if (currentMode++ > 2) currentMode = 1;
        game.setMode(currentMode);
      }
      game.ship.rot = rotateSpeed;
      break;
    case "ArrowLeft":
      if (game.state === gameStates.pre) {
        if (currentMode-- < 2) currentMode = 3;
        game.setMode(currentMode);
      }
      game.ship.rot = -rotateSpeed;
      break;
    case "ArrowUp":
      game.ship.thrusting = true;
      if (!playingThrustSound && game.state === gameStates.play) {
        playPauseLoop(thrustSound, true);
        playingThrustSound = true;
      }
      break;
    case " ":
      if (loaded && game.state === gameStates.play) {
        game.ship.shoot();
        playSound("../sounds/shoot.mp3");
      }
      if (game.state === gameStates.pre) {
        playSound("../sounds/start_game.mp3");
        game.state = gameStates.play;
      }
      loaded = false;
      break;
    default:
      break;
  }
});

document.addEventListener("keyup", e => {
  switch (e.key) {
    case "ArrowRight":
      game.ship.rot = 0;
      break;
    case "ArrowLeft":
      game.ship.rot = 0;
      break;
    case "ArrowUp":
      game.ship.thrusting = false;
      playingThrustSound = false;
      playPauseLoop(thrustSound, false);
      break;
    case " ":
      loaded = true;
      break;
    default:
      break;
  }
});