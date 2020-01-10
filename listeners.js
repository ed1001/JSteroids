document.addEventListener("keydown", e => {
  switch (e.key) {
    case "ArrowRight":
      ship.rot = rotateSpeed;
      break;
    case "ArrowLeft":
      ship.rot = -rotateSpeed;
      break;
    case "ArrowUp":
      ship.thrusting = true;
      if (!playingThrustSound && gameState === gameStates.play) {
        playPauseLoop(thrustSound, true);
        playingThrustSound = true;
      }
      break;
    case " ":
      if (loaded && gameState === gameStates.play) {
        ship.shoot();
        playSound("shoot.mp3");
      }
      if (gameState === gameStates.pre) {
        playSound("start_game.mp3");
        gameState = gameStates.play;
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
      ship.rot = 0;
      break;
    case "ArrowLeft":
      ship.rot = 0;
      break;
    case "ArrowUp":
      ship.thrusting = false;
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
