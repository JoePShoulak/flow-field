const xySpeed = 0.1;
const timeSpeed = 0.02;
const scale = 10;
const flowForce = 1;
const particleCount = 1000;
const bgColor = 0; // black

let cols;
let rows;
let flowField = [];
let particles = [];

function mouseHandler() {
  if (mouseIsPressed && mouseButton === RIGHT) setup();
}

function setup() {
  pixelDensity(1);
  resizeCanvas(innerWidth, innerHeight);

  cols = floor(width / scale);
  rows = floor(height / scale);

  flowField = new Array(cols * rows);

  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  background(bgColor);
}

let timeOff = 0;
function draw() {
  mouseHandler();
  // Clear the screen
  background(bgColor, 1);

  // Update flow field
  let yOff = 0;
  for (let y = 0; y < rows; y++) {
    let xOff = 0;
    for (let x = 0; x < cols; x++) {
      const index = x + y * cols;
      const r = noise(xOff, yOff, timeOff) * 4 * PI;
      const v = p5.Vector.fromAngle(r);

      v.setMag(flowForce);
      flowField[index] = v;

      // Draw flow field
      // stroke(0, 50);
      // strokeWeight(1);
      // push();
      // translate(x * scale, y * scale);
      // rotate(v.heading());
      // line(0, 0, scale, 0);
      // pop();

      xOff += xySpeed;
    }
    yOff += xySpeed;
  }

  // Update Particles
  particles.forEach((particle) => {
    particle.update();
  });

  timeOff += timeSpeed;
}

addEventListener("contextmenu", (e) => e.preventDefault());
