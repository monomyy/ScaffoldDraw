class Scaffold{
  constructor(vetex) {
    this.vertex = vertex;  
    // Only register vertex when it reaches certain random distance
    this.width = random(20, 50);  //
    this.radius = random(1, 3);  //
    this.side = int(random(0, 1)) * 2 - 1;  // -1 or 1
    this.texDen = int(random(7, 20));
    
    this.paraVertex = [];
    this.paraSkeletonStart = [];
    this.paraSkeletonEnd = [];
    // Use vertex and paraVertex to draw perpSkeleton
    this.meshVertexA = [];
    this.meshVertexB = [];
    this.whatMesh = int(random(0, 3));  // 0:A; 1:B; 2:Both; 3:None
  }
  
  testSilhouette() {
    stroke(255, 0, 0);
    strokeWeight(0.5);
    noFill();
    for(let i=0; i<this.vertex.length-1; i++) {
      line(this.vertex[i].x, this.vertex[i].y, 
           this.vertex[i+1].x, this.vertex[i+1].y);
    }
  }
  
  initiate() {
    this.iniParaVertex();
    
    this.iniParaSkeVertex(this.vertex);
    this.iniParaSkeVertex(this.paraVertex);
    
    this.iniMeshVertex(this.vertex, this.meshVertexA, 1);
    this.iniMeshVertex(this.paraVertex, this.meshVertexB, -1);
  }
  
  iniParaVertex() {
    let lastVec;
    for(let i=0; i<this.vertex.length; i++) {
      if(i<this.vertex.length-1) {
        let startVer = this.vertex[i];
        let endVer = this.vertex[i+1];
        let vecFromSta = p5.Vector.sub(endVer, startVer);
        vecFromSta.rotate(this.side * HALF_PI);
        vecFromSta.setMag(this.width);
        
        if(i==0) {
          let thisVer = p5.Vector.add(this.vertex[i], vecFromSta);
          this.paraVertex.push(thisVer);
          
          lastVec = vecFromSta.copy();
        } else {
          let vec = createVector();
          vec.x = (vecFromSta.x + lastVec.x) / 2;
          vec.y = (vecFromSta.y + lastVec.y) / 2;
          vec.setMag(this.width);
          let thisVer = p5.Vector.add(this.vertex[i], vec);
          this.paraVertex.push(thisVer);
          
          lastVec = vec.copy();
        }
        
      } else {  // Last vertex
        let thisVer = p5.Vector.add(this.vertex[i], lastVec);
        this.paraVertex.push(thisVer);
      }
    }
  }
  
  testParallelVertex() {
    stroke(255, 0, 0);
    strokeWeight(0.5);
    noFill();
    for(let i=0; i<this.paraVertex.length-1; i++) {
      line(this.paraVertex[i].x, this.paraVertex[i].y, 
           this.paraVertex[i+1].x, this.paraVertex[i+1].y);
    }
  }
  
  iniParaSkeVertex(vertex) {
    for(let i=0; i<vertex.length-1; i++) {
      let startVer = vertex[i].copy();
      let endVer = vertex[i+1].copy();
      let vecFromSta = p5.Vector.sub(endVer, startVer);
      vecFromSta.rotate(HALF_PI);
      vecFromSta.setMag(this.radius);
      
      startVer.add(vecFromSta);
      endVer.add(vecFromSta);
      this.paraSkeletonStart.push(startVer.copy());
      this.paraSkeletonEnd.push(endVer.copy());
      
      vecFromSta.setMag(this.radius * -2);
      startVer.add(vecFromSta);
      endVer.add(vecFromSta);
      this.paraSkeletonStart.push(startVer.copy());
      this.paraSkeletonEnd.push(endVer.copy());
    }
  }
  
  iniMeshVertex(vertex, meshVer, symbol) {
    let vecFromSta;  // Use the last vec on the last vertex
    for(let i=0; i<vertex.length-1; i++) {
      let startVer = vertex[i];
      let endVer = vertex[i+1];
      vecFromSta = p5.Vector.sub(endVer, startVer);
      vecFromSta.rotate(this.side * -HALF_PI * symbol);  //
      vecFromSta.setMag(this.radius);
      
      let num = int(random(3, 7));  //
      for(let j=0; j<num; j++) {
        let jx = lerp(startVer.x, endVer.x, j/num);
        let jy = lerp(startVer.y, endVer.y, j/num);
        let ver = createVector(jx, jy);
        
        let thisVec = vecFromSta.copy();
        let off = random(0, 2);
        thisVec.add(off);
        ver.add(thisVec);
        
        meshVer.push(ver);
      }
    }
    
    let thisVec = vecFromSta.copy();
    let off = random(0, 2);
    thisVec.add(off);
    
    let ver = p5.Vector.add(vertex[vertex.length-1], thisVec);
    meshVer.push(ver);
  }
  
  pattern() {
    // print(this.vertex.length + ", " +  this.paraVertex.length);
    noFill();
    
    this.drawCrossSec();
    this.drawParaSkeleton();
    this.drawPerpSkeleton();
    this.drawPlank();
    
    if(this.whatMesh == 0)  this.drawMesh(this.meshVertexA);
    else if(this.whatMesh == 1)  this.drawMesh(this.meshVertexB);
    else if(this.whatMesh == 2) {
      this.drawMesh(this.meshVertexA);
      this.drawMesh(this.meshVertexB);
    }
  }
  
  drawCrossSec() {
    stroke(11);
    strokeWeight(mSlCrossSec.value);
    for(let i=0; i<this.vertex.length; i++) {
      circle(this.vertex[i].x, this.vertex[i].y, this.radius*2);
      circle(this.paraVertex[i].x, this.paraVertex[i].y, this.radius*2);
    }
  }
  
  drawParaSkeleton() {
    stroke(11);
    strokeWeight(mSlParaSkeleton.value);
    for(let i=0; i<this.paraSkeletonStart.length; i++) {
      line(this.paraSkeletonStart[i].x, this.paraSkeletonStart[i].y, this.paraSkeletonEnd[i].x, this.paraSkeletonEnd[i].y);
    }
  }
  
  drawPerpSkeleton() {
    stroke(11);
    strokeWeight(mSlPerpSkeleton.value);
    for(let i=0; i<this.vertex.length; i++) {
      let startVer = this.vertex[i].copy();
      let endVer = this.paraVertex[i].copy();
      let vecFromSta = p5.Vector.sub(endVer, startVer);
      vecFromSta.rotate(HALF_PI);
      vecFromSta.setMag(this.radius);
      
      startVer.add(vecFromSta);
      endVer.add(vecFromSta);
      line(startVer.x, startVer.y, endVer.x, endVer.y);
      
      vecFromSta.setMag(this.radius * -2);
      startVer.add(vecFromSta);
      endVer.add(vecFromSta);
      line(startVer.x, startVer.y, endVer.x, endVer.y);
    }
  }
  
  drawPlank() {
    stroke(11);
    strokeWeight(mSlPlank.value);
    for(let i=0; i<this.vertex.length-1; i++) {
      for(let j=1; j<this.texDen; j++) {
        let f = 1 / float(this.texDen) * float(j);
        let x1 = lerp(this.vertex[i].x, this.paraVertex[i].x, f);
        let y1 = lerp(this.vertex[i].y, this.paraVertex[i].y, f);
        let x2 = lerp(this.vertex[i+1].x, this.paraVertex[i+1].x, f);
        let y2 = lerp(this.vertex[i+1].y, this.paraVertex[i+1].y, f);
        line(x1, y1, x2, y2);
      }
    }
  }
  
  drawMesh(meshVertex) {
    stroke(11);
    strokeWeight(mSlMesh.value);
    
    beginShape();
    curveVertex(meshVertex[0].x, meshVertex[0].y);
    for(let i=0; i<meshVertex.length; i++) { 
      curveVertex(meshVertex[i].x, meshVertex[i].y);
    }
    curveVertex(meshVertex[meshVertex.length-1].x, meshVertex[meshVertex.length-1].y);
    endShape();
  }
}