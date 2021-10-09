//  Creating a class Particle
//  The moving particles will compose the texture

class Particle {
  // Setting the particle parameters
  constructor() {
    //  Creates a 2D vector, an entity with an x and a y
    this.vector = createVector(random(width), random(height));
    this.vectorOld = this.vector.copy();
    //  Randomize the size of the particles
    this.stepSize = random(1, 5);
    //  The angle will be defined in the setNoise function
    this.angle;
    this.isOutside = false;

    // Random hue???
    this.color;
  }

  movePart(strokeWidth) {
    // Define the motion of the particles
    this.vector.x += sin(this.angle) * this.stepSize;
    this.vector.y += cos(this.angle) * this.stepSize;

    //  Checks if the particle is outside of the canvas
    this.isOutside =
      this.vector.x < 0 ||
      this.vector.x > width ||
      this.vector.y < 0 ||
      this.vector.y > height;

    //  If the Particle is outside reset the vector to be within the canvas
    if (this.isOutside) {
      this.vector.set(random(width), random(height));
      this.vectorOld = this.vector.copy();
    }

    // if (this.vector.x < -10) this.vector.x = this.vectorOld.x = width + 10;
    // if (this.vector.x > -width + 10) this.vector.x = this.vectorOld.x = -10;
    // if (this.vector.y < -10) this.vector.y = this.vectorOld.y = height + 10;
    // if (this.vector.y > -height + 10) this.vector.y = this.vectorOld.y = -10;

    //  Define
    strokeWeight(strokeWidth * this.stepSize);
    //line(this.vectorOld.x, this.vectorOld.y, this.vector.x, this.vector.y);
    circle(this.vector.x, this.vector.y, this.stepSize);

    this.vectorOld = this.vector.copy();
    this.isOutside = false;
  }

  setNoise(strokeWidth, noiseScale, noiseStrength) {
    this.angle =
      noise(this.vector.x / noiseScale, this.vector.y / noiseScale) *
      noiseStrength;

    this.movePart(strokeWidth);
  }
}

// Initializing Array and particles' parameters
let particles = [];
let partCount = 500;
let noiseScale = 200;
let noiseStrength = 10;
let overlayAlpha = 10;
let partAlpha = 90;
let strokeWidth = 1;
let seed = 30;
let increment = 0.02;
let oldSeed = seed;
let h = 0;
let s = 0;
let b = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);

  // Filling the array with particles
  for (let i = 0; i < partCount; i++) {
    particles[i] = new Particle();
  }
}

function draw() {
  background(255, overlayAlpha);
  //noStroke();

  particles.forEach((p) => {
    p.setNoise(strokeWidth, noiseScale, noiseStrength);
  });

  //seed = floor(seed);

  noiseSeed(seed);
  seed += increment;
  // if (b > 50) background(100, overlayAlpha);
  // else background(200, overlayAlpha);

  if (floor(seed) - oldSeed == 1) {
    oldSeed = floor(seed);
    console.log("seed:", seed);
    // Setting the particles color
    colorMode(HSB);
    h = random(360);
    s = random(100);
    b = random(100);
    stroke(color(h, s, b, partAlpha));
    h = random(360);
    s = random(100);
    b = random(100);
    fill(color(h, s, b, partAlpha));
    colorMode(RGB);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
