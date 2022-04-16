/*
TODO:
- Online program and hook with a QR
- Multi-lane scaffold: less possible
- Color?
*/


let frame = 0;
let phaseDraw, phaseLw;
let vertex;
let l;
let dashLen = 4;  //
let scaffold;

let buffer;
let updateBuffer;

// let slCrossSec, slParaSkeleton, slPerpSkeleton, slPlank, slMesh;
let mSlCrossSec, mSlParaSkeleton, mSlPerpSkeleton, mSlPlank, mSlMesh;
// let myFont;

let mButSave, mButRefresh, mButConfirm;

// function preload() {
//   myFont = loadFont('thefont.ttf');
// }

function setup() {
  textFont('Source Code Pro');
  
  createCanvas(1200, 900);
  noFill();
  // noLoop();
  
  background(241);
  
  phaseDraw = true;
  phaseLw = false;
  vertex = [];
  
  buffer = createGraphics(width, height);
  updateBuffer = false;
  
  createSliders();
  createButtons();
}

function draw() {
  background(241);
  
  drawTrace();
  
  if(phaseLw) {
    // scaffold.testSilhouette();
    scaffold.pattern();
    
    // print(scaffold.paraSkeletonStart.length +", "+ scaffold.paraSkeletonEnd.length);
  }
  
  image(buffer, 0, 0);
  
  interactMySliders();
  interactMyButtons();
}

function createSliders() {
  let min = 0.1;
  let max = 4;
//   let step = 0.1;
//   slCrossSec = createSlider(min, max, min, step);
//   slCrossSec.position(10, 10);
//   slCrossSec.style('width', '200px');
  
//   slParaSkeleton = createSlider(min, max, min, step);
//   slParaSkeleton.position(10, 30);
//   slParaSkeleton.style('width', '200px');
  
//   slPerpSkeleton = createSlider(min, max, min, step);
//   slPerpSkeleton.position(10, 50);
//   slPerpSkeleton.style('width', '200px');
  
//   slPlank = createSlider(min, max, min, step);
//   slPlank.position(10, 70);
//   slPlank.style('width', '200px');
  
//   slMesh = createSlider(min, max, min, step);
//   slMesh.position(10, 90);
//   slMesh.style('width', '200px');
  
  let start = createVector(20, 20);
  let off = createVector(0, 20);
  let baseLen = 141;
  let size = 10;
  mSlCrossSec = new MySlider(start, baseLen, size, min, max, "Cross Section");
  start.add(off);
  mSlParaSkeleton = new MySlider(start, baseLen, size, min, max, "Parallel Skeleton");
  start.add(off);
  mSlPerpSkeleton = new MySlider(start, baseLen, size, min, max, "Bridging Skeleton");
  start.add(off);
  mSlPlank = new MySlider(start, baseLen, size, min, max, "Plank");
  start.add(off);
  mSlMesh = new MySlider(start, baseLen, size, min, max, "Mesh");
}

function createButtons() {
  let size = 10;
  let pos = createVector(15, height-45);
  mButSave = new MyButtons(pos, size, "Save");
  
  pos = createVector(15, height-25);
  mButRefresh = new MyButtons(pos, size, "Refresh");
  
  pos = createVector(15, 115);
  mButConfirm = new MyButtons(pos, size, "Confirm");
}

function mousePressed() {
  if(phaseDraw) {
    let ms = createVector(mouseX, mouseY);
    vertex.push(ms);
    l = random(30, 100);  //
  }
}

function mouseDragged() {
  if(phaseDraw) {
    let ms = createVector(mouseX, mouseY);
    let distance = ms.dist(vertex[vertex.length-1]);
    if(distance >= l) {  
      vertex.push(ms);
    }
  }
}

function mouseReleased() {
  if(vertex.length > 1) {
    scaffold = new Scaffold(vertex);
    scaffold.initiate();
    
    phaseDraw = false;
    phaseLw = true;
    
    activateMySliders();
    // loop();
  }
  
  vertex = [];
  // loop();
}

function keyPressed() {
//   if(key=='r') {
//     background(241);
//     buffer = createGraphics(width, height);
//   }
  
//   if(key=='d') {
//     updateBuffer = true;
//     if(updateBuffer) {
//       scaffoldToBuffer();
//       updateBuffer = false;
//     }
//     // resetSliders ?
//     phaseDraw = true;
//     phaseLw = false;
    
//     inactivateMySliders();
//   }
  
//   if(key == 's') {
//     saveCanvas('myScaffold', 'jpg');
//   }
}

function drawTrace() {
  // Draw trace: dash lines
  stroke(11);
  strokeWeight(2);
  if(phaseDraw) {
    if(vertex.length > 0) {
      ms = createVector(mouseX, mouseY);
        
      if(vertex.length > 1) {
        for(let i=0; i<vertex.length-1; i++) {
          let vec = p5.Vector.sub(vertex[i+1], vertex[i]);
          let len = p5.Vector.mag(vec);
          let num = floor(len / (2*dashLen) ); //
          vec.setMag(dashLen);
          let doubleVec = p5.Vector.mult(vec, 2);
          let translate = createVector();
          for(let j=0; j<num; j++) {
            let start = p5.Vector.add(vertex[i], translate);
            let end = p5.Vector.add(start, vec);
            line(start.x, start.y, end.x, end.y);
            
            translate.add(doubleVec);
          }
        }
      }
      // To mouse
      let vec = p5.Vector.sub(ms, vertex[vertex.length-1]);
      let len = p5.Vector.mag(vec);
      let num = floor(len / (2*dashLen) ); //
      vec.setMag(dashLen);
      let doubleVec = p5.Vector.mult(vec, 2);
      let translate = createVector();
      for(let j=0; j<num; j++) {
        let start = p5.Vector.add(vertex[vertex.length-1], translate);
        let end = p5.Vector.add(start, vec);
        line(start.x, start.y, end.x, end.y);

        translate.add(doubleVec);
      }
    }
  }
}

function scaffoldToBuffer() {
  bufferCrossSec();
  bufferParaSkeleton();
  bufferPerpSkeleton();
  bufferPlank();
  
  if(scaffold.whatMesh < 3) {
    if(scaffold.whatMesh < 1)  bufferMesh(scaffold.meshVertexA);
    else if(scaffold.whatMesh < 2)  bufferMesh(scaffold.meshVertexB);
    else {
      bufferMesh(scaffold.meshVertexA);
      bufferMesh(scaffold.meshVertexB);
    }
  }
}

function interactMySliders() {
  mSlCrossSec.interact();
  mSlParaSkeleton.interact();
  mSlPerpSkeleton.interact();
  mSlPlank.interact();
  mSlMesh.interact();
}

function activateMySliders() {
  mSlCrossSec.ifActive = true;
  mSlParaSkeleton.ifActive = true;
  mSlPerpSkeleton.ifActive = true;
  mSlPlank.ifActive = true;
  mSlMesh.ifActive = true;
}

function inactivateMySliders() {
  mSlCrossSec.ifActive = false;
  mSlParaSkeleton.ifActive = false;
  mSlPerpSkeleton.ifActive = false;
  mSlPlank.ifActive = false;
  mSlMesh.ifActive = false;
}

function interactMyButtons() {
  
  if(phaseDraw) {
    mButSave.ifActivate = true;
    mButSave.interact();
    mButRefresh.ifActivate = true;
    mButRefresh.interact();
    
    mButConfirm.ifActivate = false;
    mButConfirm.interact();
  } 
  if(phaseLw){
    mButSave.ifActivate = false;
    mButSave.interact();
    mButRefresh.ifActivate = false;
    mButRefresh.interact();
    
    mButConfirm.ifActivate = true;
    mButConfirm.interact();
  }
  
  // print(mButSave.state + ", " + mButRefresh.state + ", " + mButConfirm.state);
  // print(mButConfirm.state + ", " + mButConfirm.ifExcute);
  // print(mButSave.state + ", " + mButSave.ifExcute);
  // print(mButRefresh.state + ", " + mButRefresh.ifExcute);
  
  if(mButSave.state == 1) {
    save(buffer,'myScaffold.png');
    
    // mButSave.state == 0;
  }
  
  if(mButRefresh.state == 1) {
    background(241);
    buffer = createGraphics(width, height);
    // phaseDraw = true;
    // phaseLw = false;
    
    mButRefresh.state == 0;
  }
  
  if(mButConfirm.state == 1) {
    updateBuffer = true;
    if(updateBuffer) {
      scaffoldToBuffer();
      updateBuffer = false;
    }
    // resetSliders ?
    phaseDraw = true;
    phaseLw = false;
    
    inactivateMySliders();
    // mButConfirm.state == 0;
  }
}







