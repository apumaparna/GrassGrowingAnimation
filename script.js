// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, 
          color, random, rect, ellipse, stroke, image, loadImage, keyCode,
          collideCircleCircle, text, textSize, mouseX, mouseY, strokeWeight, line, 
          mouseIsPressed, windowWidth, windowHeight, noStroke, UP_ARROW, triangle */

// let drop1x, drop1y, drop1d, drop1FallSpeed;

let grasses = [];
let drops = [];
let clouds = []; 

let GROUND_Y;

function setup() {
  createCanvas(500, 500);
  colorMode(HSB, 360, 100, 100);
  noStroke();
  
  GROUND_Y = height - 80; 

  for (var i = 0; i < 20; i++) {
    drops.push(new RainDrop());
  }
  
  for (var i = 0; i < 200; i++) {
    grasses.push(new Grass());
  }
  
  for (var i = 0; i<5 ; i++){
    clouds.push(new Cloud());
  }
}

function draw() {
  background(210, 5, 80);
  
  drops.forEach(function(drop) {
    drop.draw(); 
    drop.drip();
  })
  
  //clouds 
  clouds.forEach(function(cloud){
    cloud.draw(); 
  });
  
  // ground
  fill(120, 80, 50);
  rect(0, GROUND_Y, width, 80);
  
  
  grasses.forEach(function(grass) {
    grass.draw();
    grass.grow();
  });
}

class RainDrop {
  constructor() {
    // initialize properties
    this.dropX = random(width);
    this.dropY = random(height); 
    this.dropD = random(5, 12);
    this.dropFallSpeed = random(8, 20);
    this.dropColor = random(190, 230); 
  }

  draw() {
    // draw raindrop on canvas
    fill(this.dropColor, 60, 60);
    ellipse(this.dropX, this.dropY, this.dropD);
    triangle(this.dropX - 0.5*this.dropD,this.dropY,this.dropX + 0.5*this.dropD,this.dropY,this.dropX,this.dropY-this.dropFallSpeed);
  }

  drip() {
    // move raindrop down
    this.dropY += this.dropFallSpeed; 
    if (this.dropY > GROUND_Y) {
      this.dropY = 0;
      this.dropX = random(width); 
    }
  }
}

class Grass {
  constructor(){
    this.grassX = random(width); 
    this.grassY = random(GROUND_Y, height);
    this.grassHeight = random(10,20);
    this.grassColor = random(90,140); 
    this.grassGrowth = random(0.1, 0.5); 
  }
  draw() {
    fill(this.grassColor, 80, 50);
    triangle(this.grassX-3, this.grassY, this.grassX+3, this.grassY, this.grassX, this.grassY-this.grassHeight);
  }
  grow(){
    this.grassHeight = Math.min(100, this.grassHeight+this.grassGrowth);
  }
}


class CloudPuff {
  constructor(x,y,d,v, color, darkness) {
    this.x = x; // x position
    this.y = y; // y position
    this.d = d; // diameter
    this.v = v; // velocity
    this.color = color;
    this.darkness = darkness;
  }
  draw() {
    fill(this.color, 50, this.darkness);
    ellipse(this.x, this.y, this.d);
    this.x += this.v;
  }
  
  checkBounds() {
    if (this.x > width+this.d) this.x = 0 - this.d;
  }
}

class Cloud {
  constructor(){
    this.cloudX = random(width); 
    this.cloudY = random(10, 30); 
    this.puffs = random(3, 5); 
    this.cloudD = random(20, 40);
    this.halfWidth = random(15,20);
    this.cloudDarkness = random(15, 60);
    this.cloudColor = random(220, 250);
    
    this.puffCircles = [];
    for (var i = 0; i < this.puffs; i++) {
      this.puffCircles[i] = new CloudPuff(this.cloudX-this.halfWidth+(random(30,70)*i), this.cloudY+random(-10,10), random(70,100), 1, this.cloudColor, this.cloudDarkness);
    }
  }
  draw() {
    this.puffCircles.forEach(circle => {
      circle.draw();
      circle.checkBounds();
    });
    
    // ellipse(this.cloudX, this.cloudY, this.cloudD);
    // move cloud;
  }
}