class Star {
  constructor(pos, spd, r, fillCol, world, npoints = 5) {
    this.pos = pos.copy();
    this.spd = spd.copy();
    this.r1 = r / 2; // Inner radius for star points
    this.r2 = r; // Outer radius for star points
    this.fillCol = fillCol;
    this.world = world;
    this.npoints = npoints;
  }

  move(windowWidth, windowHeight) {
    fill(this.fillCol);
    noStroke();

    let burst = this.collision(windowWidth, windowHeight);
    this.draw();

    this.spd.y += this.world.gravity; // Apply main star gravity
    this.pos.add(this.spd);

    return burst; // Return burst status directly
  }

  draw() {
    let angle = TWO_PI / this.npoints;
    let halfAngle = angle / 2.0;

    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = this.pos.x + cos(a) * this.r2;
      let sy = this.pos.y + sin(a) * this.r2;
      vertex(sx, sy);
      sx = this.pos.x + cos(a + halfAngle) * this.r1;
      sy = this.pos.y + sin(a + halfAngle) * this.r1;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }

  collision(xBound, yBound) {
    if (this.pos.y > yBound - this.r2) {
      this.pos.y = yBound - this.r2; // Prevent going out of bounds
      this.spd.y *= -1; // Bounce back
      return true;
    }

    if (this.pos.x > xBound - this.r2 || this.pos.x < this.r2) {
      this.spd.x *= -1; // Bounce back on sides
    }

    if (this.pos.y < this.r2) {
      this.spd.y *= -1; // Bounce back at top
    }

    return false;
  }
}

class World {
  constructor(growthRate, gravity, friction, damp, bkgCol) {
    this.growthRate = growthRate;
    this.gravity = gravity;
    this.friction = friction;
    this.damp = damp;
    this.bkgCol = bkgCol;
    this.stars = [];
  }
}

let world;

function setup() {
  createCanvas(windowWidth, windowHeight);
  const pos = createVector(random(100, 200), random(100, 200));
  const spd = createVector(5, 5); // Speed for main star
  const r = random(15, 50);
  const fillCol = "#ffffff";

  world = new World(
    1.01,
    0.1,
    0.99,
    1,
    color(random(255), random(255), random(255))
  );

  mainStar = new Star(pos, spd, r, fillCol, world);
  world.stars.push(mainStar);
}

function draw() {
  background(world.bkgCol);

  for (let i = world.stars.length - 1; i >= 0; i--) {
    // Loop backward for safe removal
    let burst = world.stars[i].move(windowWidth, windowHeight);
    if (burst) {
      let burstPos = world.stars[i].pos.copy(); // Use copy for the burst position
      let burstR = world.stars[i].r1 / 4; // Use r1 for small stars
      let burstCol = color(random(255), random(255), random(255));

      for (let j = 0; j < 4; j++) {
        let tinyStarSpd = createVector(random(-1, 1), random(-1, 1)); // Lower speed for tiny stars
        let tinyStarGravity = 0.02; // Reduced gravity for tiny stars

        // Create tiny stars with lower gravity
        let tinyStar = new Star(burstPos, tinyStarSpd, burstR, burstCol, world);
        tinyStar.gravity = tinyStarGravity; // Set tiny star gravity
        world.stars.push(tinyStar); // Add tiny star to the world
      }
      world.stars.splice(i, 1); // Remove the main star that burst
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
