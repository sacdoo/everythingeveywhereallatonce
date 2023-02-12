let vertexCount;
let centerX;
let centerY;
let radius;
let eyeSpacing;
let r, g, b;
let shapeY = 0;
let shapeSpeed = 5;
let gravity = 0.7;
let spaceBarPressed = false;
let spaceBarStartTime = 0;
let jumpDuration = 80; // 0.5 seconds in milliseconds
let shapeX = 0;
let shapeSpeedX = 5;
let shadowX = shapeX + 10;
let shadowY = shapeY + 10;

function preload() {
  bg = loadImage("eea.png");
}

function setup() {
  createCanvas(800, 800);
  background(255);
}

function draw() {
  image(bg,0,0,800,800);
  let ground = height/1.82;
  if (shapeY + radius > ground) {
    shapeSpeed = -shapeSpeed * 0.2;
    shapeY = ground - radius;
  }
  
  image(bg,0,0,800,800);

  shapeY += shapeSpeed;
  shapeSpeed += gravity;
  shapeX += shapeSpeedX;

  if (keyIsPressed && key == ' ') {
    if (!spaceBarPressed) {
      // The spacebar was just pressed
      spaceBarPressed = true;
      spaceBarStartTime = millis();
      jumpDirection = (mouseX > centerX) ? 1 : -1;
    } else if (millis() - spaceBarStartTime < jumpDuration) {
      // The spacebar is currently pressed and within the jumpDuration
      shapeSpeed = -1;
      shapeSpeedX = jumpDirection * 1;
    }
  } else {
    spaceBarPressed = false;
    shapeSpeedX = 0;
  }

  if (shapeY > height) {
    shapeY = 0;
  }

  strokeWeight(50);
  strokeJoin(ROUND);
  stroke(r, g, b);

  fill(r, g, b);

  beginShape();
  for (let i = 0; i < vertexCount; i++) {
    let x = vertices[i][0] + shapeX;
    let y = vertices[i][1] + shapeY;
    vertex(x, y);
  }
  endShape(CLOSE);

  // Add eyes
  let eyeSize = radius * 0.5;
  eyeSpacing = radius / 3;
  noStroke();
  fill(240);
  ellipse(centerX - eyeSpacing + shapeX, centerY+50 - eyeSpacing + shapeY, eyeSize, eyeSize);
  ellipse(centerX + eyeSpacing + shapeX, centerY+50 - eyeSpacing + shapeY, eyeSize, eyeSize);
  
  // Add pupils
  fill(0);
  let pupilSize = eyeSize * 0.65;
  let yDiff = mouseY - (centerY - eyeSpacing + shapeY);
  let xDiff = mouseX - (centerX - eyeSpacing + shapeX);
  let angleJitter = 0.4;
  let speed = 0.1;
  let eyeAngle = atan2(yDiff, xDiff) + sin(frameCount * speed) * angleJitter;
  let pupilX = centerX - eyeSpacing + shapeX + cos(eyeAngle) * 0.7 * eyeSize * 0.25;
  let pupil2X = centerX + eyeSpacing + shapeX + cos(eyeAngle) * 0.7 * eyeSize * 0.25;
let pupilY = centerY - eyeSpacing + shapeY + sin(eyeAngle) * 0.7 * eyeSize * 0.25;
 
fill(0);
ellipse(pupilX, pupilY+50, pupilSize, pupilSize);
ellipse(pupil2X, pupilY+50,pupilSize, pupilSize);
}
  




function mousePressed() {
  
  image(bg,0,0,800,800);
  vertexCount = floor(random(9, 12));

  vertices = [];
  centerX = width / 2;
  centerY = height / 2;
  radius = min(width, height) / 4;
  bottomThreshold = centerY + radius / 2;

  for (let i = 0; i < vertexCount; i++) {
    let angle = map(i, 0, vertexCount, 0, TWO_PI);
    let x = centerX + radius * cos(angle);
    let y = centerY + radius * sin(angle);
    x += random(-radius/5, radius/5);
    y += random(-radius/5, radius/5);
    if (y > bottomThreshold) {
      y = bottomThreshold;
    }
    vertices.push([x, y]);
  }

  let maxDistance = 10;
  let valid = false;
  while (!valid) {
    valid = true;
    for (let i = 0; i < vertexCount - 1; i++) {
      let x1 = vertices[i][0];
      let y1 = vertices[i][1];
      let x2 = vertices[i + 1][0];
      let y2 = vertices[i + 1][1];
      let distance = dist(x1, y1, x2, y2);
      if (distance < maxDistance) {
        valid = false;
        vertices[i + 1][0] = random(0, width);
        vertices[i + 1][1] = random(0, height);
        break;
      }
    }

  }
   randomSeed(Date.now());
  r = random(100, 120);
  g = random(100, 130);
  b = random(100, 160);
  
  shapeY = 0;  // Add this line to set shapeY back to 0
}