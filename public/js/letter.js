class Letter {
  constructor(text, pos) {
    this.text = text;
    this.pos = pos;
  }

  draw() {
    textSize(64);
    textFont("Karla");
    this.text(this.text, this.pos.x, this.pos.y);
  }
}
