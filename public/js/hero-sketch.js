let canvas;

function setup() {
  const hero = document.getElementById("hero");
  canvas = createCanvas(hero.offsetWidth, hero.offsetHeight);
  canvas.parent("p5-container");
}

function draw() {
  background("#ffda00");
  let line = new Snake();
  line.draw();
}
