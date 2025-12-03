class Snake {
  constructor() {
    this.points = [
      createVector(30, 20),
      createVector(85, 20),
      createVector(100, 60),
      createVector(85, 75),
      createVector(30, 75),
    ];
  }

  push(point) {
    this.points.push(point);
  }

  draw() {
    noFill();
    strokeWeight(4);
    stroke("#ffffff");
    beginShape();
    for (let pt of this.points) {
      vertex(pt.x, pt.y);
    }
    endShape();
  }
}
