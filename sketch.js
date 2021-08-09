var PLAY = 1;
var END = 0;
var LOAD =2;
var gameState = PLAY;
var rocketImg,m1Img,m2Img,m3Img,bgImg;
var gameStartAudio, gameOverAudio, rocketHitAudio;
var gameOverImg, restartImg
var score = 1;

function preload() {
    rocketImg = loadImage("Rocket.png")

    m1Img = loadImage("M1.png")
    m2Img = loadImage("m2.png")
    m3Img = loadImage("m3.png")

    bgImg = loadImage("Space.JPG")

    gameOverImg = loadImage("gameOver.png")

    restartImg = loadImage("restart.png")

 
    gameStartAudio = loadSound("StartSound.wav")
    rocketHitAudio = loadSound("RocketHit.wav")
    gameOverAudio = loadSound("GameOver.wav")
}

function setup() {
  createCanvas(1200,800)
  
  rocket = createSprite(1000,400,20,50);
  rocket.velocityY=0

  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);

  backGround = createSprite(200,180,400,20);
  backGround.addImage(bgImg);
  backGround.x = backGround.width /2;
  backGround.velocityX = -(6 + 3*score/100);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup = new Group();
}

function draw() {
    background("white");
    text("Score: "+ score, 500,50);
    
    if (gameState===PLAY){
      score = score + Math.round(getFrameRate()/60);
      backGround.velocityX = -(6 + 3*score/100);
    
      if(keyWentDown(UP_ARROW)) {
        rocket.velocityY = -12;
      }

      if(keyWentDown(DOWN_ARROW)) {
        rocket.velocityY = 12;
      }

      if (backGround.x < 0){
        backGround.x = backGround.width/2;
      }

      spawnObstacles();
    
      if(obstaclesGroup.isTouching(rocket)){
        score = score - 1
        
      }
    }
    else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
      
      //set velcity of each game object to 0
      backGround.velocityX = 0;
      obstaclesGroup.setVelocityXEach(0);
      
      //set lifetime of the game objects so that they are never destroyed
      obstaclesGroup.setLifetimeEach(-1);
      
      if(mousePressedOver(restart)) {
        reset();
      }
    }
    
    
    drawSprites();
  
}

function spawnObstacles() {
    if(frameCount % 60 === 0) {
      var obstacle = createSprite(600,165,10,40);
      //obstacle.debug = true;
      obstacle.velocityX = -(6 + 3*score/100);
      
      //generate random obstacles
      var rand = Math.round(random(1,6));
      switch(rand) {
        case 1: obstacle.addImage(m1Img);
                break;
        case 2: obstacle.addImage(m2Img);
                break;
        case 3: obstacle.addImage(m3Img);
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