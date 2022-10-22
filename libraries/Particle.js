class Particle {
  constructor() {
    this.pos = createVector(random(0, width), random(0, height));
    this.prevPos = this.pos.copy();

    this.vel = p5.Vector.random2D();
    this.acc = createVector(0, 0);
    this.maxSpeed = 4;

    this.alpha = 10;
    this.color = 255;
  }

  update() {
    this.handleFlow();
    this.handleMotion();

    // If we handle edges, update right away to avoid lines accross screen
    this.handleEdges() && this.updatePrev();

    this.draw();
    this.updatePrev();
  }

  handleMotion() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    this.vel.limit(this.maxSpeed);
  }

  updatePrev() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  handleFlow() {
    const x = floor(this.pos.x / scale);
    const y = floor(this.pos.y / scale);
    const index = x + y * cols;

    const force = flowField[index];

    this.applyForce(force);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  draw() {
    strokeWeight(1);
    stroke(this.color, this.alpha);
    line(this.prevPos.x, this.prevPos.y, this.pos.x, this.pos.y);
  }

  handleEdges() {
    let handled = false;

    if (this.pos.x < 0) {
      this.pos.x = width;
      handled = true;
    }

    if (this.pos.x > width) {
      this.pos.x = 0;
      handled = true;
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      handled = true;
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      handled = true;
    }

    return handled;
  }
}
