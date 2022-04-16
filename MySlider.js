class MySlider {
  constructor(start, baseLen, size, min, max, label) {
    this.start = start.copy();  // start is a vector
    this.baseLen = baseLen;
    
    this.pos = createVector(random(this.start.x, this.start.x+this.baseLen), this.start.y);
    this.size = size;
    
    this.min = min;
    this.max = max;
    this.value;
    this.calculateValue();
    
    this.ifActive = false; 
    this.ifMovable = false;
    
    this.label =label;
  }  
  
  interact() {
    if(this.ifActive) {
      // this.display();
      this.ifMove();
      if(this.ifMovable) {
        this.move();
      }
      // print(this.value);
      
      this.display();
    } else {
      this.reset();
    }
  }
  
  display() {
    // Base
    rectMode(CORNER);
    stroke(11);
    strokeWeight(1);
    fill(11);
    rect(this.start.x-this.size/2, this.start.y-this.size/2, this.baseLen+this.size, this.size);
    // Button
    stroke(11);
    strokeWeight(1);
    fill(241);
    rectMode(CENTER);
    rect(this.pos.x, this.pos.y, this.size, this.size);
    // Label
    fill(11);
    textAlign(LEFT, BOTTOM);
    textSize(this.size);
    // textFont('Helvetica');
    text(this.label, this.start.x+this.baseLen+this.size, this.start.y+this.size/2);
  }
  
  calculateValue() {
    let staToPos = p5.Vector.sub(this.pos, this.start);
    let len = staToPos.mag();
    this.value = this.min + (len / this.baseLen) * (this.max-this.min);
    // Quantize
    this.value = int(this.value * 10) / 10;
  }
  
  ifMove() {
    if(!this.ifMovable) {
      let mxLogic = mouseX > this.pos.x-this.size/2 && mouseX < this.pos.x+this.size/2;
      let myLogic = mouseY > this.pos.y-this.size/2 && mouseY < this.pos.y+this.size/2;
      if(mxLogic && myLogic && mouseIsPressed) {
        this.ifMovable = true;
      }
    } else {
      if(!mouseIsPressed) this.ifMovable = false;
    }
  }
  
  move() {
    let mx = constrain(mouseX, this.start.x, this.start.x+this.baseLen);
    this.pos = createVector(mx, this.start.y);
    this.calculateValue();
  }
  
  reset() {
    this.pos = createVector(random(this.start.x, this.start.x+this.baseLen), this.start.y);
    this.calculateValue();
    this.ifMovable = false;
  }
}





