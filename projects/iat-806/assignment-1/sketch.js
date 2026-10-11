
let emotions = ["happy", "sad", "inLove"];
let currentEmotion = "happy";
let faceColor = [255, 210, 80];

function setup() {
  let canvas = createCanvas(600, 400);
  canvas.parent("sketch-holder");
}

function draw() {
  background(245, 220, 235);

  // Face
  fill(faceColor);
  stroke(0);
  strokeWeight(4);
  circle(300, 200, 200);

  // Eyes follow the mouse
  let eyeX = constrain((mouseX - 300) * 0.05, -8, 8);
  let eyeY = constrain((mouseY - 200) * 0.05, -8, 8);

  if (currentEmotion === "inLove") {
    noStroke();
    fill(255, 50, 100);
    textSize(40);
    textAlign(CENTER, CENTER);
    text("♥", 265, 175);
    text("♥", 335, 175);
  } else {
    noStroke();
    fill(0);
    circle(265 + eyeX, 175 + eyeY, 20);
    circle(335 + eyeX, 175 + eyeY, 20);
  }

  // Mouth
  noFill();
  stroke(0);
  strokeWeight(4);

  if (currentEmotion === "happy") {
    arc(300, 220, 80, 50, 0, PI);
  } else if (currentEmotion === "sad") {
    arc(300, 245, 80, 50, PI, TWO_PI);
  } else if (currentEmotion === "inLove") {
    arc(300, 220, 80, 50, 0, PI);
  }
}

// Click to change emotion
function mousePressed() {
  currentEmotion = random(emotions);
}

// SPACE to change face color
function keyPressed() {
  if (key === " ") {
    faceColor = [
      random(150, 255),
      random(150, 255),
      random(150, 255)
    ];
    return false;
  }
}
