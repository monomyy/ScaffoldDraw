class MyButtons {
  constructor(pos, size, label) {
    this.pos = pos.copy();
    this.size = size;
    this.state = 0;  // 0:Inactivated; 1:Activated
    this.ifActivate = true;
    this.ifExcute = false;
    this.label = label;
  }
  
  interact() {
    if(this.ifActivate) {
      this.click();
      this.display();
    } else {
      this.state = 0;
      this.ifExcute = false;
    }
  }
  
  display() {
    rectMode(CORNER);
    stroke(11);
    strokeWeight(1);
    fill(241);
    rect(this.pos.x, this.pos.y, this.size, this.size);
    // Label
    fill(11);
    textAlign(LEFT, BOTTOM);
    textSize(this.size);
    // textFont('Helvetica');
    text(this.label, this.pos.x+this.size*1.5, this.pos.y+this.size);
  }
  
  click() {
    let mxLogic = mouseX>this.pos.x && mouseX<this.pos.x+this.size;
    let myLogic = mouseY>this.pos.y && mouseY<this.pos.y+this.size;
    if(mxLogic && myLogic && mouseIsPressed) {
      if(!this.ifExcute) {
        this.state = 1;
        this.ifExcute = true;
      } else {
        this.state = 0;
      }
    } else {
      this.state = 0;
      this.ifExcute = false;
    }
  }
}








