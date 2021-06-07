// game
const gameStates = Object.freeze({ pre: 1, play: 2, post: 3 });
const gameModes = Object.freeze({ 0: 1, 1: 2, 2: 3 });
const gameColours = Object.freeze({
  0: "rgba(255, 255, 255, 1)",
  1: "rgba(0, 255, 255, 1)",
  2: "rgba(255, 255, 0, 1)"
});
let menuLevel = 0;

// ship
const shipSize = 20;
const rotateSpeed = 3;
const thrust = 8 / 60;
const maxSpeed = 10;
let opacity = 1;
let opacityDesc = true;

const shipDebrisTime = 1500;
const shipDebrisSize = 4;
let shipDebrisOpacity = 1;

const thrustTime = 85;
const thrustVelocity = 5;
const thrustSize = 4;
const thrustVariance = 22;
let thrustRed;
let playingThrustSound = false;
const thrustSound = new Audio("sounds/thrust.mp3");
thrustSound.loop = true;

// asteroid
const asteroidSizes = Object.freeze({ large: 90, medium: 35, small: 12 });
const asteroidSpeed = 4;
const spacing = 400;
const leftBoundX = 360 - asteroidSizes["large"];
const rightBoundX = 875 + asteroidSizes["large"];
const topBoundY = 270 - asteroidSizes["large"];
const botBoundY = 460 + asteroidSizes["large"];

// particle
const bulletSize = 3;
const bulletVelocity = 12;
const bulletTime = 600;
let loaded = true;

const debrisCount = 30;
const debrisTime = 500;
const debrisSize = 1;
const debrisVelocity = 4;

// containers
let bullets = [];
let asteroids = [];
let debris = [];
let shipDebris = [];
let thrustParticles = [];
