const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var leftW, rightW, ground;
var bridge, jointpoint;
var jointLink;
var stones = [];
var zombie, zombie1, zombie2, zombie3, zombie4, sadZombie;
var backImg, woodImg;
var stoneImg;


function preload(){
  zombie1 = loadImage("assets/zombie1.png");
  zombie2 = loadImage("assets/zombie2.png");
  zombie3 = loadImage("assets/zombie3.png");
  zombie4 = loadImage("assets/zombie4.png");

  backImg = loadImage("assets/background.png");
  sadZombie = loadImage("assets/sad_zombie.png");
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);
  
  ground = new Base(0, height - 10, width * 2, 20);
  leftW = new Base(100, 300, 200, 100);
  rightW = new Base(1250, height / 2 + 50, 200, 100);

  bridge = new Bridge(20, { x: 50, y: 250});
  //bridge.scale = 05;
 

  jointPoint = new Base(1150, 250, 40, 20);

  Matter.Composite.add(bridge.body, jointPoint);
  jointLink = new Link(bridge, jointPoint);

  for (var i = 0; i <= 8; i++) {
    var x = random(width / 2 - 200, width / 2 + 300);
    var y = random(-10, 140);
    var stone = new Stone(x, y, 80, 80);
    
    stones.push(stone);
    
  }
  
  zombie = createSprite(width / 2, height-110);
  zombie.addAnimation("lefttoright", zombie1, zombie2, zombie1);
  zombie.addAnimation("righttoleft", zombie3, zombie4, zombie3);
  zombie.addAnimation("sad",sadZombie);

  zombie.scale = 0.1;
  zombie.velocityX = 10;

 breakButton = createImg(axe.png);
 breakButton.position(1200,250);
 breakButton.size(50,50);
 breakButton.mouseClicked(handleButtonPress);
}

function draw() {
  background(51);
  image(backImg,0,0,windowWidth,windowHeight);
  Engine.update(engine);
  
  
  ground.show();
  bridge.show();

  for (var stone of stones) {
    stone.show();
    var pos = stone.body.position;
    var distance = dist(zombie.position.x, zombie.position.y, pos.x, pos.y);
    if (distance <= 50) {
      zombie.velocityX = 0;
      Matter.Body.setVelocity(stone.body, { x: 10, y: -10 });
      zombie.changeImage("sad");
      collided = true;
      World.remove(world, stone);
    }
  }

  if (zombie.position.x >= width - 300) {
    zombie.velocityX = -10;
    zombie.changeAnimation("righttoleft");
  }

  if (zombie.position.x <= 300) {
    zombie.velocityX = 10;
    zombie.changeAnimation("lefttoright");
  }

  drawSprites();

}

function handleButtonPress (){
  jointLink.detach();
  setTimeout(() => {
    bridge.break();
  },1500);
}