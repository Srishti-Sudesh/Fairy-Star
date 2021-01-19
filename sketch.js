var starImg, fairyImg, bgImg;
var fairy;
var star, starBody;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	starImg = loadImage("star.png");
	fairyImg = loadAnimation("fairyImage1.png","fairyImage2.png");
	bgImg = loadImage("starNight.png");

}

function setup() {
	createCanvas(800, 750);

	fairy = createSprite(130, 520);
	fairy.addAnimation("fairyflying",fairyImg);  
	fairy.scale =0.25;

	star = createSprite(650,30);
	star.addImage(starImg);
	star.scale = 0.2;

	engine = Engine.create();
	world = engine.world;

	starBody = Bodies.circle(650 , 30 , 5 , {restitution:0.5, isStatic : true});
	World.add(world, starBody);
	
	Engine.run(engine);

}


function draw() {
	background(bgImg);
	Engine.update(engine);
  
	star.positionX = starBody.position.x;
	star.positionY = starBody.position.y;

	if (keyDown(LEFT_ARROW)){
		fairy.velocityX = -5;
	}
	if (keyDown(RIGHT_ARROW)){
	  fairy.velocityX = 5;
  }
  
	if (keyWentUp(LEFT_ARROW)||keyWentUp(RIGHT_ARROW)){
	  fairy.velocityX = 0;
  }

  if(keyDown(DOWN_ARROW)){
		Matter.Body.setStatic(starBody, false);
		star.velocityY = 4;	
		console.log("Star is falling");
  }

  if(star.positionY > 7000){
	Matter.Body.setStatic(starBody, true);
	console.log("Star stop!");
	star.setVelocity(0,0);
  }

	drawSprites();
}
