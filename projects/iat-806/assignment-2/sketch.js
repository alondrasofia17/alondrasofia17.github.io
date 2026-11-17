let balls = [];
let video;
let bodySegmentation;
let segmentation;

let options = {
  maskType: "person",
};

let score = 0;
let timeLeft = 30;
let gameState = "start";
let startTime = 0;

let targetScore = 20;
let gameDuration = 30;

// Store body masks to detect movement
let previousMask = null;
let currentMask = null;
let maskVersion = 0;
let checkedMaskVersion = -1;

let lastSpawnTime = 0;

async function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent("sketch-holder");

  textAlign(CENTER, CENTER);

  // Start the webcam
  video = createCapture(VIDEO);
  video.size(600, 600);
  video.hide();

  // Load body segmentation
  bodySegmentation = ml5.bodySegmentation("BodyPix", options);
  await bodySegmentation.ready;

  bodySegmentation.detectStart(video, gotResults);
}

// Save body segmentation results
function gotResults(results) {
  segmentation = results;

  if (results && results.mask) {
    previousMask = currentMask;
    currentMask = results.mask.get();
    maskVersion++;
  }
}

// Check several points around each ball
function bodyAt(mask, x, y, radius = 0) {
  if (!mask) {
    return false;
  }

  let points = [
    [0, 0],
    [-radius, 0],
    [radius, 0],
    [0, -radius],
    [0, radius],
    [-radius * 0.7, -radius * 0.7],
    [radius * 0.7, -radius * 0.7],
    [-radius * 0.7, radius * 0.7],
    [radius * 0.7, radius * 0.7],
  ];

  for (let point of points) {
    let px = floor(x + point[0]);
    let py = floor(y + point[1]);

    if (px >= 0 && py >= 0 && px < mask.width && py < mask.height) {
      let pixel = mask.get(px, py);

      if (pixel[3] > 0) {
        return true;
      }
    }
  }

  return false;
}

function draw() {
  background(20);

  if (gameState === "start") {
    fill(255);
    noStroke();

    textSize(38);
    text("POP THE BALLS!", width / 2, 180);

    textSize(20);
    text("Move your body to pop the balls!", width / 2, 270);
    text("Pop 20 balls in 30 seconds", width / 2, 310);
    text("Click to start", width / 2, 390);
  } else if (gameState === "playing") {
    // Show the webcam as a mirror
    if (video) {
      push();
      translate(width, 0);
      scale(-1, 1);
      tint(255, 180);
      image(video, 0, 0, width, height);
      noTint();
      pop();
    }

    // Update the timer
    timeLeft = max(0, gameDuration - floor((millis() - startTime) / 1000));

    // Check collisions only when a new mask arrives
    let newMask = maskVersion !== checkedMaskVersion;

    if (newMask) {
      checkedMaskVersion = maskVersion;
    }

    // Update balls and check contact
    for (let i = balls.length - 1; i >= 0; i--) {
      let ball = balls[i];

      ball.update();

      if (newMask && currentMask && previousMask) {
        // Mirror X coordinate to match webcam
        let cameraX = width - ball.x;
        let cameraY = ball.y;

        // Check the center and edges of each ball
        let touchingNow = bodyAt(
          currentMask,
          cameraX,
          cameraY,
          ball.r / 2 + 10,
        );

        let touchingBefore = bodyAt(
          previousMask,
          cameraX,
          cameraY,
          ball.r / 2 + 10,
        );

        // Pop when the body enters the ball
        if (touchingNow && !touchingBefore) {
          balls.splice(i, 1);
          score++;
        }
      }
    }

    // Add one new ball approximately every second
    if (millis() - lastSpawnTime > 1000 && balls.length < 8) {
      balls.push(Ball.createRandomBall());
      lastSpawnTime = millis();
    }

    // Score and timer background
    noStroke();
    fill(0, 180);
    rect(0, 0, width, 60);

    // Display score and timer
    fill(255);
    textSize(22);

    text("Score: " + score + "/" + targetScore, 130, 30);
    text("Time: " + timeLeft, 480, 30);

    // Check win or lose
    if (score >= targetScore || timeLeft <= 0) {
      gameState = "gameOver";
    }
  } else if (gameState === "gameOver") {
    fill(255);
    noStroke();

    textSize(40);

    if (score >= targetScore) {
      text("YOU WIN!", width / 2, 210);
    } else {
      text("TIME'S UP!", width / 2, 210);
    }

    textSize(24);
    text("Final Score: " + score, width / 2, 300);
    text("Click to play again", width / 2, 390);
  }
}

// Start or restart the game
function mousePressed() {
  if (gameState === "start" || gameState === "gameOver") {
    score = 0;
    timeLeft = gameDuration;
    balls = [];

    previousMask = null;
    checkedMaskVersion = maskVersion;

    // Create five starting balls
    for (let i = 0; i < 5; i++) {
      balls.push(Ball.createRandomBall());
    }

    startTime = millis();
    lastSpawnTime = millis();
    gameState = "playing";
  }
}
