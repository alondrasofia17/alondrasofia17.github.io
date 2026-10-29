class Ball {
  constructor(x, y, c, r) {
    this.x = x;
    this.y = y;
    this.color = c;
    this.r = r;
    this.originalColor = c;
    this.highlightColor = color(255, 50, 100);
  }

  // Moves the ball randomly around the canvas
  move() {
    this.x += random(-5, 5);
    this.y += random(-5, 5);
  }

  // Changes the ball's size randomly
  changeSize() {
    this.r = constrain(this.r + random(-2, 2), 2, 50);
  }

  // Draws the ball on the canvas
  show() {
    fill(this.color);
    circle(this.x, this.y, this.r);
  }

  // Updates the ball's movement, size, and appearance
  update() {
    this.move();
    this.changeSize();
    this.show();
  }
  // Creates a new ball with a random position and color
  static createRandomBall() {
    let x = random(width);
    let y = random(height);
    let c = color(random(255), random(255), random(255));
    let r = random(10, 40);

    return new Ball(x, y, c, r);
  }

  // Changes the ball to its highlight color
  highlight() {
    this.color = color(255, 0, 0);
  }

  // Restores the ball's original color
  deHighlight() {
    this.color = this.originalColor;
  }

  // Chooses the color depending on whether the ball is active
  respond(active) {
    if (active) {
      this.highlight();
    } else {
      this.deHighlight();
    }
  }
  // Checks whether the mouse is inside the ball
  contains(px, py) {
    let d = dist(this.x, this.y, px, py);
    return d < this.r / 2;
  }

  // Checks if the ball is positioned on the detected body
  isOnBody(mask) {
    if (!mask) {
      return false;
    }

    let x = floor(this.x);
    let y = floor(this.y);

    if (x < 0 || x >= mask.width || y < 0 || y >= mask.height) {
      return false;
    }

    let pixel = mask.get(x, y);
    return pixel[3] > 0;
  }
}
