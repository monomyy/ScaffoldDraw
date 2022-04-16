function bufferCrossSec() {
  buffer.noFill();
  buffer.stroke(11);
  buffer.strokeWeight(mSlCrossSec.value);
  for(let i=0; i<scaffold.vertex.length; i++) {
    buffer.circle(scaffold.vertex[i].x, scaffold.vertex[i].y, scaffold.radius*2);
    buffer.circle(scaffold.paraVertex[i].x, scaffold.paraVertex[i].y, scaffold.radius*2);
  }
}

function bufferParaSkeleton() {
  buffer.stroke(11);
  buffer.strokeWeight(mSlParaSkeleton.value);
  for(let i=0; i<scaffold.paraSkeletonStart.length; i++) {
    let startVer = scaffold.paraSkeletonStart[i].copy();
    let endVer = scaffold.paraSkeletonEnd[i].copy();
    buffer.line(startVer.x, startVer.y, endVer.x, endVer.y);
  }
}

function bufferPerpSkeleton() {
  buffer.stroke(11);
  buffer.strokeWeight(mSlPerpSkeleton.value);
  for(let i=0; i<scaffold.vertex.length; i++) {
    let startVer = scaffold.vertex[i].copy();
    let endVer = scaffold.paraVertex[i].copy();
    let vecFromSta = p5.Vector.sub(endVer, startVer);
    vecFromSta.rotate(HALF_PI);
    vecFromSta.setMag(scaffold.radius);

    startVer.add(vecFromSta);
    endVer.add(vecFromSta);
    buffer.line(startVer.x, startVer.y, endVer.x, endVer.y);

    vecFromSta.setMag(scaffold.radius * -2);
    startVer.add(vecFromSta);
    endVer.add(vecFromSta);
    buffer.line(startVer.x, startVer.y, endVer.x, endVer.y);
  }
}

function bufferPlank() {
  buffer.stroke(11);
  buffer.strokeWeight(mSlPlank.value);
  for(let i=0; i<scaffold.vertex.length-1; i++) {
    for(let j=1; j<scaffold.texDen; j++) {
      let f = 1 / float(scaffold.texDen) * float(j);
      let x1 = lerp(scaffold.vertex[i].x, scaffold.paraVertex[i].x, f);
      let y1 = lerp(scaffold.vertex[i].y, scaffold.paraVertex[i].y, f);
      let x2 = lerp(scaffold.vertex[i+1].x, scaffold.paraVertex[i+1].x, f);
      let y2 = lerp(scaffold.vertex[i+1].y, scaffold.paraVertex[i+1].y, f);
      buffer.line(x1, y1, x2, y2);
    }
  }
}

function bufferMesh(meshVer) {
  buffer.noFill();
  buffer.stroke(11);
  buffer.strokeWeight(mSlMesh.value);
  buffer.beginShape();
  buffer.curveVertex(meshVer[0].x, meshVer[0].y);
  for(let i=0; i<meshVer.length; i++) { 
    buffer.curveVertex(meshVer[i].x, meshVer[i].y);
  }
  buffer.curveVertex(meshVer[meshVer.length-1].x, meshVer[meshVer.length-1].y);
  buffer.endShape();
}
