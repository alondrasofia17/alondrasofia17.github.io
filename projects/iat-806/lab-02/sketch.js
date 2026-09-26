console.log("I believe I can do this!");

let circleX = 50;
let circleY = 50;
let speedX = 5;
let speedY = 5;
let size = 100;
let sizeIncrement = 1;
let radius = size / 2;

let rightColor = "orange";
let leftColor = "pink";
let ballColor;

let paused = false;

function setup() {
  const canvas = createCanvas(800, 600);
  canvas.parent("sketch-holder");
}

function draw() {
  background(20);

  // I changed the original colors to make the ball my own
  if (circleX > width / 2) {
    ballColor = rightColor;
  } else {
    ballColor = leftColor;
  }

  fill(ballColor);

  // The ball only moves and changes size when it is not paused
  if (!paused) {
    circleX = circleX + speedX;
    circleY = circleY + speedY;

    size = size + sizeIncrement;
    radius = size / 2;
  }

  // Bounce off the left and right walls
  if (circleX >= width - radius || circleX < radius) {
    speedX = speedX * -1;
    sizeIncrement = sizeIncrement * -1;
  }

  // Bounce off the top and bottom walls
  if (circleY >= height - radius || circleY < radius) {
    speedY = speedY * -1;
  }

  circle(circleX, circleY, size);
}

// When I click, the ball changes direction
function mousePressed() {
  speedX = speedX * -1;
  speedY = speedY * -1;
}

// Pressing the space bar pauses and resumes the ball
function keyPressed() {
  if (key === " ") {
    paused = !paused;
  }
}
