let balls = [];
let video;
let bodySegmentation;
let segmentation;

let options = {
  maskType: "person",
};

async function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent("sketch-holder");

  // Create random balls
  for (let i = 0; i < 100; i++) {
    balls.push(Ball.createRandomBall());
  }

  // Start the webcam
  video = createCapture(VIDEO);
  video.size(600, 600);
  video.hide();

  // Load the body segmentation model
  bodySegmentation = ml5.bodySegmentation("BodyPix", options);
  await bodySegmentation.ready;

  bodySegmentation.detectStart(video, gotResults);
}

// Store the segmentation results
function gotResults(results) {
  segmentation = results;
  console.log("Segmentation results:", results);
}
function draw() {
  background(20);

  if (segmentation && segmentation.mask) {
    image(segmentation.mask, 0, 0, width, height);
  }

  for (let ball of balls) {
    if (segmentation && segmentation.mask) {
      ball.respond(ball.isOnBody(segmentation.mask));
    }

    ball.update();
  }
}
