class Snake {
  constructor(maxLength) {
    this.points = [];
    this.maxLength = maxLength;
  }

  push(point) {
    this.points.push(point.copy());

    // limit the line length
    this.points = this.points.slice(-1 * this.maxLength);
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
