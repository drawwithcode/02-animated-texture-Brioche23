/*
Brioschi Alessio
Creative Coding 2021-22

Assignment_02
"Create an animated texture"

KEYS
s           : save a png of the artwork
*/

//  Creating a class Particle
//  The moving particles will compose the texture
class Particle {
  // Setting the particle parameters
  constructor(x, y) {
    //  Creates a 2D vector, an entity with an x and a y
    this.vector = createVector(x, y);
    //  Randomize the stroke of the particles
    this.stepSize = random(1, 5);
    //  The dimension of the particles
    this.rad;
    //  Randomize the type of the shape
    this.type = floor(random(0, 2));
    //  Used to offset the noise of each particle's color
    this.colorOffset = random(100);
  }

  //  Function to set visual properties of the particle
  setPart(strokeWidth, noiseStrength) {
    //  Size and stroke color change continuously
    this.rad = noise(seed) * noiseStrength;
    stroke(randomizeHSB(1, this.colorOffset));

    strokeWeight(strokeWidth * this.stepSize);

    //  The particles can be squares or circles
    if (this.type == 0) ellipse(this.vector.x, this.vector.y, this.rad);
    else rect(this.vector.x, this.vector.y, this.rad);

    //  Call the move function
    this.movePart();
  }

  //  Function to move the particles
  movePart() {
    // Define the motion of the particles --> Slight wiggle
    this.vector.x += noise(seed + 4) * random(-1, 1);
    this.vector.y += noise(seed + 3) * random(-1, 1);
  }
}

// Initializing Array, grid and particles' variables
let particles = [];
let noiseScale = 300;
let noiseStrength = 50;
let partAlpha = 90;
let strokeWidth = 1;
let seed = 20;
let oldSeed = seed;
let increment = 0.01;
let hue = 0;
let sat = 0;
let bri = 0;
let w;
let h;
let columns;
let rows;
let board;
let n_rows;
let n_cols;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  ellipseMode(CENTER);
  rectMode(CENTER);
  //  HSB comes in handy to keep Saturation and Brightness consistent
  colorMode(HSB, 360, 255, 100);
  noFill();

  //  Calling the grid function
  createGrid();
}

function draw() {
  //  randomizing BG color
  background(randomizeHSB(2, 0));

  //  Double forEach because it's a 2D array
  particles.forEach((p) => {
    p.forEach((pp) => {
      pp.setPart(strokeWidth, noiseStrength);
    });
  });

  //  Gradually incrementing the noise seed
  seed += increment;
}

function randomizeHSB(mode, noiseOffset) {
  //  noiseOffset used to give each particle a differnet colour
  hue = noise(seed + noiseOffset) * 720;
  // Limiting the minimum saturation at 50
  sat = noise(seed + 20) * 50 + 155;
  // Limiting the minimum brightness at 50
  bri = noise(seed + 30) * 50 + 50;

  //  Mode 2 --> Same S and B but opposite Hue for the Background
  if (mode == 1) return color(hue, sat, bri);
  else return color(hue - 180, sat, bri);
}

//  Function to arrange the particles on a grid
function createGrid() {
  //  Random int number of rows and columns
  n_rows = floor(random(30, 50));
  n_cols = floor(random(40, 60));

  //  Subdividing the resolution exactly, to make te grid (almost) perfectly fit the res
  //  Adding 100 just to make sure it completely fits
  w = (width + 100) / n_cols;
  h = (height + 100) / n_rows;

  //  Counting the numbers of particles needed to fill the grid
  let tot_particles = n_rows * n_cols;

  //  Creating a 2D array
  for (let i = 0; i < tot_particles; i++) particles[i] = new Array();

  //  Filling the Array with particles
  for (let j = 0; j < n_cols; j++)
    for (let i = 0; i < n_rows; i++)
      particles[j][i] = new Particle(j * w, i * h); //  index*subdivision  = x or y coordinate
}

//  The artwork resizes automatically
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  createGrid();
}

// Function to save the artwork with today's date
function keyPressed() {
  let d = day();
  let m = month();
  let y = year();

  if (key == "s" || key == "S")
    saveCanvas(y + "_" + m + "_" + d + "_Texture", "png");
}
