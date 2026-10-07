// IAT 806 - Lab 03

const FRAME_COUNT = 8;

let frames = [];
let sounds = [];

let index = 0;
let soundIndex = 0;
let bgColor = 240;

let xs = [200, 360, 520];
let speeds = [4, 8, 16];

async function setup() {
  const canvas = createCanvas(700, 420);
  canvas.parent("sketch-holder");

  textFont("monospace");
  textSize(14);

  // Load my eight dance poses
  for (let i = 0; i < FRAME_COUNT; i++) {
    frames.push(await loadImage("dance_frames/dance" + i + ".png"));
  }

  // Load my four sounds
  for (let i = 0; i < 4; i++) {
    sounds.push(await loadSound("sounds/sound" + i + ".mp3"));
  }
}

function draw() {
  background(bgColor);
  // Show all eight poses at the top
  for (let i = 0; i < frames.length; i++) {
    image(frames[i], i * 85, 0, 80, 100);
  }

  // Click-controlled dancer
  image(frames[index], 20, 140, 160, 200);

  fill(0);
  text("click: frames[" + index + "]", 20, 370);

  // Animate the other dancers at different speeds
  for (let i = 0; i < xs.length; i++) {
    let pose = floor(frameCount / speeds[i]) % frames.length;
    image(frames[pose], xs[i], 140, 160, 200);
  }
}

// Each click changes the dancer and plays the next sound
function mousePressed() {
  userStartAudio();
  // Each click changes the background to a random disco color
  bgColor = color(random(255), random(255), random(255));

  index = (index + 1) % frames.length;

  sounds[soundIndex].play();
  soundIndex = (soundIndex + 1) % sounds.length;
}

// Space bar pauses and resumes the animation
function keyPressed() {
  if (key === " ") {
    if (isLooping()) {
      noLoop();
    } else {
      loop();
    }
  }
}
