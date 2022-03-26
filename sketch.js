var PLAY = 1;
var END = 0;
var gameState = PLAY;

var person, person_flying, person_collided;
var ground, invisibleGround, groundImage;

var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var gameOverImg,restartImg

function preload(){
  person_flying = loadAnimation("abc.jpg");
  person_collided = loadAnimation("person_collided.jpg");
  
  ///groundImage = loadImage("ground.png");
  
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  
  person = createSprite(50,160,20,50);
  person.addAnimation("flying", person_flying);
  person.addAnimation("collided", person_collided);
  

  person.scale = 0.05;
  
  ///ground = createSprite(200,180,400,20);
  ///ground.addImage("ground",groundImage);
  ///ground.x = ground.width /2;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,180);
  restart.addImage(restartImg);
  
 
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();

  
  person.setCollider("rectangle",0,0,100,person.height);
  person.debug = true
  
  score = 0;
  
}

function draw() {
  
  background(180);
  //displaying score
  text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    
    invisibleGround.velocityX = -(4 + 3* score/100)

    score = Math.round(frameCount/10);
    

    
    if (invisibleGround.x < 0){
      invisibleGround.x = invisibleGround.width/2;
    }
    
    if(keyDown("space")&& person.y >= 160) {
      person.velocityY = -12;
    }
    
    person.velocityY = person.velocityY + 0.8
  
  
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(person)){
        person.velocityY = -12;
        gameState = END;
        frameCount=0;
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;

      person.changeAnimation("collided", person_collided);
    
     
     
      invisibleGround.velocityX = 0;
      person.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
   }
  
 
  person.collide(invisibleGround);
  
  if(mousePressedOver(restart)) {
      reset();
    }


  drawSprites();
}

function reset(){
  gameState=PLAY;
  obstaclesGroup.destroyEach();
  score=0;
  person.changeAnimation("flying", person_flying);
}


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(6 + score/100);
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}
