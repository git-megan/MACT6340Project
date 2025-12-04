class Letter {
  constructor(text, pos, rotation = 0) {
    this.text = text;
    this.pos = pos;
    this.rotation = rotation;
  }

  draw() {
    textSize(64);
    textFont("Karla");
    noStroke();
    fill("#111118");
    textAlign(CENTER, CENTER);

    push(); // new drawing state
    translate(this.pos.x, this.pos.y); // move into position for drawing
    rotate(this.rotation);
    text(this.text, 0, 0);
    pop(); // restore original drawing state
  }
}
