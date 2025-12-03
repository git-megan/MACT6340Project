class Snake {
  constructor() {}

  draw() {
    noFill();
    strokeWeight(4);
    stroke("#ffffff");
    beginShape();
    vertex(30, 20);
    vertex(85, 20);
    vertex(100, 60);
    vertex(85, 75);
    vertex(30, 75);
    endShape();
  }
}
