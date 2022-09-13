var x = 100,
  y = 100,
  angle1 = 0.0,
  segLength = 50;



// function setup() {
//   // var myDiv = select('sketch');
//   // var myWidth =myDiv.style.width;
//   var cnv= createCanvas(windowWidth*.82, 400);
  
//   cnv.parent('sketch');
//   //cnv.style('display', 'flex');
// }


let system;

class grid{
  constructor(xbox,ybox){
    this.x=1000/xbox;
    this.y=1000/ybox;
    this.areas=[];
    
    for (let i=1; i<this.x+1; i+=1){
        this.t= [];
      for (let j=1; j< this.y+1; j+=1){
          let t_box= new box( (i-1)*xbox,(j-1)*ybox,i*xbox,j*xbox,i+j*this.x);
          this.t.push(t_box );
      }
      this.areas.push(this.t)
    }
        
  }
}
class box{
  constructor(xMin, yMin, xMax,yMax,id){
    this.xMax=xMax;
    this.yMax=yMax;
    this.xMin=xMin;
    this.yMin=yMin;
    this.id=id;
  }
  display( ){
    stroke(1000, 1000,80);
    noFill();
            rect(this.xMin,this.yMin,this.xMax-this.xMin,this.yMax-this.yMin);
    textSize(10);
    fill(this.xMin%100-20,this.yMin%100-10,100);
    text(str(this.id),this.xMin,this.yMin);
  
  }
}
let boxsize= 25;
function setup() {
  var cnv= createCanvas(windowWidth*.82, 400);
  
  cnv.parent('sketch');
  
  
  colorMode(HSB,255);
  
   boxes= new grid(boxsize,boxsize).areas;
   system= new ParticleSystem(createVector(width / 2, height/2));
  for (let i=0; i<500; i++){
    system.addParticle();
  }
  write=[createVector(width / 2, height/2),createVector(width / 2, height/2)];
  for (let i=0; i<50; i++){
    write.push(createVector(width -width*0.2, height/5+height*0.1*i))
  }
  for (let i=0; i<50; i++){
    write.push(createVector(width -width*0.01*i,height*0.1 ))
  }
  for (let i=0; i<50; i++){
    write.push(createVector(width -width*0.01*i, height*0.9))
  }
  for (let i=0; i<50; i++){
    write.push(createVector(width -width*0.9, height*0.05*i))
  }
  for (let i=0; i<50; i++){
    write.push(createVector(width -width*0.6, height*0.05*i))
  }
  for (let i=0; i<50; i++){
    write.push(createVector(width*0.01*i, height*0.5))
  }
  
  background(255,255,255);
}

function draw() {
  
  
  if(frameCount%1==0){
    background(255,0,254);
  }
//   for(let i=0; i<system.particles.length-1; i++){
//     let row=ceil(system.particles[i].position.y/boxsize)-1;
//     let col=ceil(system.particles[i].position.x/boxsize)-1;
    
//     //let curr= boxes[col][row];
    
//     //system.particles[i].run()
//     //curr.display();
    
//   }
  for(let i=0; i<system.particles.length-1; i++){
//     let row=ceil(system.particles[i].position.y/boxsize)-1;
//     let col=ceil(system.particles[i].position.x/boxsize)-1;
    
    //let curr= boxes[col][row];
    //system.particles[i].run()
    //curr.display();
    let p=p5.Vector.sub(write[i%(write.length-1)],system.particles[i].position).normalize();
    system.particles[i].update(p)
    system.particles[i].display()
    
    
  }
  
}

let Particle = function(position) {
  this.acceleration = createVector(random(-.1, .1),random(-.1, .1));
  this.velocity = createVector(random(-1, 1), random(-1, 1));
  this.position = position.copy();
  this.lifespan = 255;
};

Particle.prototype.run = function() {
  this.update(createVector(random(-0.1, 0.1),random(-0.1,0.1)));
  this.display();
};

// Method to update position
Particle.prototype.update = function(force){
  this.velocity.add( force);
  this.position.add(this.velocity);
  if (this.velocity.magSq()>60){
    this.velocity=createVector(random(-0.1, 0.1),random(-0.1,0.1));
  }
      
  this.lifespan -= 2;
  if (this.position.x>width){
    this.position.x=2
    this.velocity=createVector(random(-0.1, 0.1),random(-0.1,0.1));
  }
  if (this.position.x<1){
    this.position.x=width-1
    this.velocity=createVector(random(-0.1, 0.1),random(-0.1,0.1));
  }
  if (this.position.y>height){
    this.position.y=2
    this.velocity=createVector(random(-0.1, 0.1),random(-0.1,0.1));
  }
  if (this.position.y<1){
    this.position.y=height-1
    this.velocity=createVector(random(-0.1, 0.1),random(-0.1,0.1));
  }
};

// Method to display
Particle.prototype.display = function() {
  stroke(200, 255);
  strokeWeight(2);
  fill(abs(this.velocity.x+ this.velocity.y)*10+20,0,0);
  ellipse(this.position.x, this.position.y, (this.velocity.x+ this.velocity.y)*1, (this.velocity.x+ this.velocity.y)*1);
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
  return this.lifespan < 0;
};

let ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};

function mousePressed(){
  
}
function mouseDragged(){
  write.push(createVector(mouseX, mouseY))
}
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    write=[createVector(width / 2, height/2),createVector(width / 2, height/2)]
    
  } 
}


// function draw() {
//   strokeWeight(20.0);
//   stroke(255, 100);
//   background(50);

//   dx = mouseX - x;
//   dy = mouseY - y;
//   angle1 = atan2(dy, dx);
//   x = mouseX - (cos(angle1) * segLength);
//   y = mouseY - (sin(angle1) * segLength);

//   segment(x, y, angle1);
//   ellipse(x, y, 20, 20);
// }

// function segment(x, y, a) {
//   push();
//   translate(x, y);
//   rotate(a);
//   line(0, 0, segLength, 0);
//   pop();
// }


function windowResized() {
  
  resizeCanvas(windowWidth*.81, 400);
}

