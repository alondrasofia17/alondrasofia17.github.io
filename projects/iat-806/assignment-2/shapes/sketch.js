console.log("I believe I can do this!");

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(20);

  // Heart color
  fill(255, 120, 60);
  noStroke();

  // Top of the heart
  circle(200, 180, 140);
  circle(320, 180, 140);

  // Bottom / point of the heart
  triangle(
    140, 200,  // left
    380, 200,  // right
    260, 360   // bottom point
  );
}

