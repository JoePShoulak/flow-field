function setup() {
  createCanvas(200, 200);
  pixelDensity(1);
}

const increment = 0.01;
// const scale = 20;

function draw() {
  loadPixels();

  let yOff = 0;
  for (let y = 0; y < width; y++) {
    let xOff = 0;
    for (let x = 0; x < width; x++) {
      let index = (x + y * width) * 4;
      const r = noise(xOff, yOff) * 255;
      pixels[index + 0] = r;
      pixels[index + 1] = r;
      pixels[index + 2] = r;
      pixels[index + 3] = 255;

      xOff += increment;
    }
    yOff += increment;
  }

  updatePixels();
  noLoop();
}
