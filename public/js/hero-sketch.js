let canvas;

function setup() {
  const hero = document.getElementById("hero");
  canvas = createCanvas(hero.offsetWidth, hero.offsetHeight);
  canvas.parent("p5-container");
}

function draw() {
  background("#000000");
  circle(100, 100, 50);
}
