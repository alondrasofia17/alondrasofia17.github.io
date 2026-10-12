let emotions = ["happy", "sad", "inLove"];
let currentEmotion = "happy";
let faceColor = [255, 210, 80];
let blinking = false;
let hearts = [];
let happySound;
let sadSound;
let loveSound;

function preload() {
  happySound = loadSound("sounds/happy.mp3");
  sadSound = loadSound("sounds/sad.mp3");
  loveSound = loadSound("sounds/in love.mp3");
}
function setup() {
  let canvas = createCanvas(600, 400);
  canvas.parent("sketch-holder");
}

function draw() {
  background(245, 220, 235);

  // Happy bouncing animation
  push();

  if (currentEmotion === "happy") {
    let bounce = abs(sin(frameCount * 0.08)) * 12;
    translate(0, -bounce);
  }

  // Face breathing animation
  let breathing = sin(frameCount * 0.04) * 8;

  // Face
  fill(faceColor);
  stroke(0);
  strokeWeight(4);
  circle(300, 200, 200 + breathing);

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

    // Blink every 3 seconds
    blinking = frameCount % 180 < 10;

    if (blinking) {
      stroke(0);
      strokeWeight(3);
      line(255, 175, 275, 175);
      line(325, 175, 345, 175);
    } else {
      circle(265 + eyeX, 175 + eyeY, 20);
      circle(335 + eyeX, 175 + eyeY, 20);
    }
  }

  // Nose
  noFill();
  stroke(0);
  strokeWeight(3);
  arc(300, 195, 14, 18, 0, PI);

  // Animated tears when sad
  if (currentEmotion === "sad") {
    let tearY = 190 + ((frameCount * 1.5) % 45);

    noStroke();
    fill(80, 170, 255);

    ellipse(265, tearY, 9, 16);
    ellipse(335, tearY + 10, 9, 16);
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

  // Floating hearts when in love
  if (currentEmotion === "inLove") {
    // Create a new heart every 12 frames
    if (frameCount % 12 === 0) {
      hearts.push({
        x: random(220, 380),
        y: 290,
        size: random(15, 30),
        speed: random(1, 3),
      });
    }

    // Animate hearts
    for (let heart of hearts) {
      heart.y -= heart.speed;

      noStroke();
      fill(255, 50, 120);
      textSize(heart.size);
      textAlign(CENTER, CENTER);
      text("♥", heart.x, heart.y);
    }

    // Remove hearts outside the canvas
    hearts = hearts.filter((heart) => heart.y > -30);
  } else {
    hearts = [];
  }
  pop();
}

// Click to change emotion

function mousePressed() {
  userStartAudio();

  let currentIndex = emotions.indexOf(currentEmotion);
  let nextIndex = (currentIndex + 1) % emotions.length;
  currentEmotion = emotions[nextIndex];

  // Stop previous sounds
  happySound.stop();
  sadSound.stop();
  loveSound.stop();

  // Play sound for the new emotion
  if (currentEmotion === "happy") {
    happySound.play();
  } else if (currentEmotion === "sad") {
    sadSound.play();
  } else if (currentEmotion === "inLove") {
    loveSound.play();
  }
}

// SPACE to change face color
function keyPressed() {
  if (key === " ") {
    faceColor = [random(150, 255), random(150, 255), random(150, 255)];
    return false;
  }
}
