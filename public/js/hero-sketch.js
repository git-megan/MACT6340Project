let canvas;
let line;
let lastPoint;
let letters;
let choices;
let choiceNum;

function setup() {
  const hero = document.getElementById("hero");
  canvas = createCanvas(hero.offsetWidth, hero.offsetHeight);
  canvas.parent("p5-container");

  letters = [];
  choices = "Megan is a creative technologist and UX researcher - ".split("");
  choiceNum = 0;

  line = new Snake(choices.length);
}

function draw() {
  background("#ffda00");
  line.draw();

  for (let letter of letters) {
    letter.draw();
  }
}

function mouseMoved() {
  let currentPoint = createVector(mouseX, mouseY);
  let distance = 10000;

  if (lastPoint) {
    distance = p5.Vector.dist(lastPoint, currentPoint);
  }

  let rotation = 0;

  if (lastPoint) {
    let diffVector = currentPoint.copy().sub(lastPoint);
    rotation = diffVector.heading(); // calculate the angle that the vector is heading
  }

  if (distance > 40) {
    line.push(currentPoint);

    letters.push(new Letter(choices[choiceNum], currentPoint, rotation));

    letters = letter.slice(-1 * choices.length); // limit number of letters on screen

    lastPoint = currentPoint;

    choiceNum = choiceNum + 1;
    if (choiceNum >= choices.length) {
      choiceNum = 0;
    }
  }
}
