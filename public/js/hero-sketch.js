let canvas;
let line;
let lastPoint;

function setup() {
  const hero = document.getElementById("hero");
  canvas = createCanvas(hero.offsetWidth, hero.offsetHeight);
  canvas.parent("p5-container");
  line = new Snake();
}

function draw() {
  background("#ffda00");
  line.draw();

  let letter = new Letter("M", createVector(mouseX, mouseY));
  letter.draw();
}

function mouseMoved() {
  let currentPoint = createVector(mouseX, mouseY);
  let distance = 10000;

  if (lastPoint) {
    distance = p5.Vector.dist(lastPoint, currentPoint);
  }

  if (distance > 40) {
    line.push(currentPoint);
    lastPoint = currentPoint;
  }
}
