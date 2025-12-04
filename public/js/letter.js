class Letter {
  constructor(text, pos) {
    this.text = text;
    this.pos = pos;
  }

  draw() {
    textSize(32);
    this.text(this.text, this.pos.x, this.pos.y);
  }
}
