// IAT 806 · Lab 04 starter: the dancer grid from Week 4, ready for your website.
// Run with Live Server. Uses p5 2.x (async setup, await loadImage).

let frames = []; // the 8 dance poses
let frames2 = []; // TODO: load the jump poses into this array
let numFrames = 8;

let numCols = 20;
let numRows = 10;
let colWidth;
let rowHeight;

// 2D arrays: one color and one speed for every cell in the grid
let colors = [];
let speeds = [];

async function setup() {
  const canvas = createCanvas(800, 420);

  // puts the canvas inside <div id="sketch-holder"> in index.html
  canvas.parent("sketch-holder");

  for (let i = 0; i < numCols; i++) {
    colors[i] = [];
    speeds[i] = [];
    for (let j = 0; j < numRows; j++) {
      colors[i][j] = [random(1, 255), random(1, 255), random(1, 255)];
      speeds[i][j] = random(1, 10);
    }
  }

  rowHeight = height / numRows;

  for (let i = 0; i < numFrames; i++) {
    let fileName = "dance_frames/dance" + i + ".png";
    frames.push(await loadImage(fileName));
  }

  // Load the four jump poses for my second dance
  for (let i = 0; i < 4; i++) {
    let fileName = "jump_frames/jump" + i + ".png";
    frames2.push(await loadImage(fileName));
  }
}

function draw() {
  background(120);
  if (mouseX < width) {
    numCols = Math.floor(map(mouseX, 0, width, 2, 20));
    // dist the mouse position and the position of the dancing profs
    // in the grid, and then use that number to map to the speed.
    colWidth = width / numCols;
  }

  for (let i = 0; i < numCols; i++) {
    for (let j = 0; j < numRows; j++) {
      // Find the center of each dancer's cell
      let x = i * colWidth + colWidth / 2;
      let y = j * rowHeight + rowHeight / 2;

      // Calculate how far each dancer is from the mouse
      let d = dist(x, y, mouseX, mouseY);
      let maxDist = dist(0, 0, width, height);

      // Dancers close to the mouse move faster
      // Keep each dancer's original random speed
      let speed = speeds[i][j] * map(d, 0, maxDist, 0.5, 3);
      speed = max(1, speed);

      // Draw the colored background for each cell
      fill(colors[i][j][0], colors[i][j][1], colors[i][j][2], 120);
      rect(i * colWidth, j * rowHeight, colWidth, rowHeight);

      // Animate each dancer with its new speed

      // Alternate the two dances in a checkerboard pattern
      let danceFrames;

      if ((i + j) % 2 === 0) {
        danceFrames = frames;
      } else {
        danceFrames = frames2;
      }

      animate(
        danceFrames,
        speed,
        i * colWidth,
        j * rowHeight,
        colWidth,
        rowHeight,
      );
    }
  }
}

// draws one dancer: which poses, how fast, where, and how big

function animate(frames, speed, xPosition, yPosition, cellWidth, cellHeight) {
  let index = getFrameIndex(frames, speed);
  let currentFrame = frames[index];

  // Keep every dancer inside its own grid cell
  let scale = min(
    (cellWidth * 0.85) / currentFrame.width,
    (cellHeight * 0.85) / currentFrame.height,
  );

  let imageWidth = currentFrame.width * scale;
  let imageHeight = currentFrame.height * scale;

  // Center the dancer inside its cell
  let x = xPosition + (cellWidth - imageWidth) / 2;
  let y = yPosition + (cellHeight - imageHeight) / 2;

  image(currentFrame, x, y, imageWidth, imageHeight);
}

// which pose to show right now. speed = draw-frames per pose: smaller = faster
function getFrameIndex(danceFrames, speed) {
  // Use the number of poses in the selected dance
  let slowFrame = Math.floor(frameCount / speed);
  let index = slowFrame % danceFrames.length;
  return index;
}
