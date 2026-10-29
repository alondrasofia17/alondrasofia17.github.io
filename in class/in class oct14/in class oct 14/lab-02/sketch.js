
let balls = [];
let numberOfBalls = 1000;

function setup() {
  createCanvas(600, 600);

  for (let i = 0; i < numberOfBalls; i++) {
    let ballX = 300;
    let ballY = 300;
    let ballColor = color(120, 10, 140);
    let ballR = 25;

    let ball = new Ball(ballX, ballY, ballColor, ballR);
    balls.push(ball);
  }
}

function draw() {
  background(20);

  for (let ball of balls) {
    ball.move();
    ball.show();
  }
}

class Ball {
  // x x position, y position, c color, r radius
  constructor(x,y,c,r) {
    this.x = x;
    this.y = y;
    this.color = c;
    this.r = r;
  }

  move() {
    // this.x = this.x + random(-5, 5);
    this.x += random(-5, 5);
    this.y += random(-5, 5);
  }

  show() {
    fill(this.color);
    circle(this.x, this.y, this.r);
  }
}
