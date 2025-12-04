class Letter {
  constructor(text, pos) {
    this.text = text;
    this.pos = pos;
  }

  draw() {
    textSize(64);
    textFont("Karla");
    noStroke();
    fill("#111118");
    textAlign(CENTER, CENTER);
    text(this.text, this.pos.x, this.pos.y);
  }
}
