var PLAY = 1;
var END = 0;
var gameState = PLAY;
var tower, towerImage;
var door, doorImage, doorGroup;
var climber, climberImage, climberGroup;
var ghost, ghostImageJumping, ghostImageStanding;
var bg;

function preload() {
  towerImage = loadImage("tower.png");

  doorImage = loadImage("door.png");

  climberImage = loadImage("climber.png");

  ghostImageJumping = loadImage("ghost-jumping.png");
  ghostImageStanding = loadImage("ghost-standing.png");
}

function setup() {
  createCanvas(500, 500);

  //creating tower
  tower = createSprite(250, 250, 20, 20);
  tower.addImage(towerImage);
  tower.velocityY = 2;
  tower.scale = 0.9;

  //creating ghost
  ghost = createSprite(200, 200, 20, 20);
  ghost.addImage(ghostImageStanding);
  ghost.scale = 0.3;
  
  
  bg = createSprite(250,250,500,500);
  bg.shapeColor = "black";
  bg.visible = false;

  doorGroup = new Group();
  climberGroup = new Group();
}

function draw() {
  background(220);
  
  camera.position.x = ghost.x;
  camera.position.y = ghost.y;
  
  if (gameState === PLAY) {
    //reseting the tower
    if (tower.y > 300) {
      tower.y = 200;
    }

    if (keyDown("space")) {
      ghost.velocityY = -5;
      ghost.changeAnimation(ghostImageJumping);
    }

    ghost.velocityY = ghost.velocityY + 0.8;

    if (keyDown("left")) {
      ghost.x = ghost.x - 5;
    }

    if (keyDown("right")) {
      ghost.x = ghost.x + 5;

      if (ghost.isTouching(climberGroup)) {
        gameState = END;
      }
      
      bg.visible = false;
    }

    DOOR();
  }
  
  drawSprites();
  
  if (gameState === END) {
    bg.visible = true;
    ghost.velocityY = 0;
    ghost.destroy();
    tower.velocityY = 0;
    
    climberGroup.destroyEach();
    doorGroup.destroyEach();
    
    climberGroup.setVelocityYEach(0);
    doorGroup.setVelocityYEach(0);
    
    doorGroup.setLifetimeEach(-1);
    climberGroup.setLifetimeEach(-1);
    
    text("GAME OVER", 140, 240, fill("yellow"),textSize(40));
  }
}

function DOOR() {
  if (frameCount % 100 === 0) {
    door = createSprite(250, 80, 20, 20);
    door.addImage(doorImage);
    door.x = Math.round(random(100, 400));
    door.velocityY = 2;
    door.lifetime = 125;
    doorGroup.add(door);
    door.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;

    //for climber
    climber = createSprite(250, 130, 20, 20);
    climber.addImage(climberImage);
    climber.x = door.x;
    climber.velocityY = 2;
    climber.lifetime = 125;
    climberGroup.add(climber);
    
    climber.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;
    
    //door.debug = true;
  //ghost.debug = true;
  //climber.debug = true;
  }
}