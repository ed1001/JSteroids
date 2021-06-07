document.addEventListener("keydown", e => {
  switch (e.key) {
    case "ArrowRight":
      if (game.state === gameStates.pre) {
        menuLevel ? game.setColour(true) : game.setMode(true);
      }
      game.ship.rot = rotateSpeed;
      break;
    case "ArrowLeft":
      if (game.state === gameStates.pre) {
        menuLevel ? game.setColour(false) : game.setMode(false);
      }
      game.ship.rot = -rotateSpeed;
      break;
    case "ArrowUp":
      if (game.state === gameStates.pre) {
        playSound("sounds/menu_vert.mp3");
        menuLevel = 0;
      }
      game.ship.thrusting = true;
      if (!playingThrustSound && game.state === gameStates.play) {
        playPauseLoop(thrustSound, true);
        playingThrustSound = true;
      }
      break;
    case "ArrowDown":
      if (game.state === gameStates.pre) {
        playSound("sounds/menu_vert.mp3");
        menuLevel = 1;
      }
      break;
    case " ":
      if (loaded && game.state === gameStates.play) {
        game.ship.shoot();
        playSound("sounds/shoot.mp3");
      }
      if (game.state === gameStates.pre) {
        playSound("sounds/start_game.mp3");
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
