
let points = [];
let idx;
let mp = false;
let hiddenToggle = false;

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(51);
}

function draw() {
  background(51);

  if (!hiddenToggle) {
    stroke(80);
    fill(230);
    strokeWeight(2);
    textSize(height / 20);
    textAlign(CENTER);
    text('Press Space to add new points', width / 2, height / 4);
    text('Click to drag the points', width / 2, height * 2 / 4);
    text('Press "h" to hide the points and this text', width / 2, height * 3 / 4);
    strokeWeight(3);
  }

  if (!hiddenToggle) {

    beginShape()
    for (let point of points) {

      if (p5.Vector.dist(createVector(mouseX, mouseY), point) < (width / 100) / 2) {

        if (mouseIsPressed) {
          idx = points.indexOf(point);
          mp = true;
        } else {
          mp = false;
        }
      }

      fill(255);
      stroke(255)
      ellipse(point.x, point.y, width / 100);

      noFill();
      stroke(120);
      vertex(point.x, point.y);

    }
    endShape()
  }

  beginShape();
  for (let t = 0.0; t <= 1.00001; t += 0.001) {
    let f = nPointBezier(points, t);
    stroke(255);
    noFill();
    if (f) {
      vertex(f.x, f.y);
    }

  }
  endShape();

  if (mp && !hiddenToggle) {
    points[idx].x = mouseX;
    points[idx].y = mouseY;
    fill(255, 0, 0);
    ellipse(mouseX, mouseY, width / 100);
  }


}

function lerpV(a, b, t) {
  return p5.Vector.lerp(a, b, t);
}

function nPointBezier(array, t) {
  if (array.length == 0) {
    return null;
  }
  if (array.length == 1) {
    return array[0];
  }
  let newArray = [];
  for (let i = 0; i < array.length - 1; i++) {
    newArray[i] = lerpV(array[i], array[i + 1], t)
  }
  return nPointBezier(newArray, t)

}

function keyPressed() {
  if (keyCode == 32) {
    points.push(createVector(mouseX, mouseY))
  }
  if (keyCode == 72) {
    hiddenToggle = !hiddenToggle;
    console.log(hiddenToggle);
  }
}