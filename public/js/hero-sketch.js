let canvas;
let line;

function setup() {
  const hero = document.getElementById("hero");
  canvas = createCanvas(hero.offsetWidth, hero.offsetHeight);
  canvas.parent("p5-container");
  line = new Snake();
}

function draw() {
  background("#ffda00");
  line.draw();
}

function mouseMoved() {
  let currentPoint = createVector(mouseX, mouseY);
  line.push(currentPoint);
}
