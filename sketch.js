  var PLAY = 1;
  var END = 0;
  var gameState = PLAY;
  var monkey , monkey_running;
  var banana ,bananaImage,bananaGroup, obstacle,      obstacleImage;
  var bananaGroup, obstacleGroup;
  var score, bananaScore;
  var invisibalGround;
  var gameover, gameOverImage, jumpSound,  restartImage, restart;
  var dieScound,checkpointSound;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  gameOverImage = loadImage("gameOver.png")
  jumpSound = loadSound("jump.mp3");
  restartImage = loadImage("restart.png");
  dieSound= loadSound("die.mp3");
  checkpointSound=loadSound("checkPoint.mp3");
}

function setup() {
  createCanvas(600,400);
  score = 0;
  bananaScore = 0;
  
  invisibalGround = createSprite(350,350,900,10);
  
  restart = createSprite(320,140,20,20);
  restart.addImage(restartImage);
  restart.scale = 0.5;
  
   gameOver = createSprite(320,100,20,20);
   gameOver.addImage(gameOverImage);
   gameOver.scale = 0.10;
        
  
  // Creating Monkey
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.12;
  
  // Creating Ground
  ground = createSprite(350,350,900,10);
  ground.velocityX = 4;
  ground.x = ground.width/2;
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
}


function draw() {
  background("skyblue");
  
  textSize(20);
  stroke("yellow");
  fill("yellow");
  
  text("Survival Time - "+score,400,30);
  text("Bananas Collected - "+bananaScore,160,30);
  
 
  
  if(gameState === PLAY){
    
    restart.scale=0.01;
    gameOver.scale=0.01
    
     if(score>200 &&score<500){
      
      background("black")
       
         stroke("white")
        strokeWeight(1)
        text("Survival Time - "+score,400,30);
    text("Bananas Collected - "+bananaScore,160,30);
       
      
    }      
    if(score>1000 &&score<1500){
      
      background("black")
      stroke("white")
       strokeWeight(1)
       text("Survival Time - "+score,400,30);
     text("Bananas Collected - "+bananaScore,160,30);
       
      
    }    
    
      restartImage.visible=false;
      gameOver.visible=true;
     
    
    if(keyDown("space")&& monkey.y >= 300){
    monkey.velocityY = -19;
    jumpSound.play();  
  }
  
  if(monkey.isTouching(bananaGroup)){
    bananaScore = bananaScore + 1;
    bananaGroup.destroyEach();
  }
    
  score = score + Math.round(getFrameRate()/60);
    
  monkey.velocityY = monkey.velocityY + 0.9;
    
  if(ground.x < 150){
     ground.x = ground.width/2; 
  }
     monkey.collide(invisibalGround);
    
      if(score>0 && score%100 === 0){
       checkpointSound.play() 
    }
    
  }
  
   if(gameState === END){
     
     
     restart.scale=0.6
     gameOver.scale=0.5
     
     
     background("black")
    gameOverImage.visible=true;
   restartImage.visible = true;  
   monkey.visible = false;
   ground.visible = false;  
   invisibalGround.visible = false;   
   bananaGroup.destroyEach();
   obstacleGroup.destroyEach();
   monkey.setVelocity(0,0);
   textSize(25);
   stroke("red");
   fill("pink");  
   text("Press above  button to restart",220,215);  
 }
   
 if(monkey.isTouching(obstacleGroup)){
   dieSound.play();
   gameState = END;
 }
  
  if(mousePressedOver(restart)&& gameState === END) {
    gameState = PLAY;
    monkey.visible = true;
    ground.visible = true;
    invisibalGround.visible = true;
    score = 0;
    bananaScore = 0;
    gameOver.visible=true;
  }
  
  drawSprites(); 
  createBananas();
  spawnObstacles();
}

function createBananas(){
  if (frameCount% 80 === 0){
    var banana = createSprite(400,400,20,20);
    banana.addImage(bananaImage);
    banana.scale = 0.115;
    banana.velocityX = -(4 + bananaScore/5);
    banana.lifetime = 200;
    banana.y = Math.round(random(120,200));
    bananaGroup.add(banana);
  }
  
}

function spawnObstacles(){
  if (frameCount% 300===0){
    obstacle = createSprite(400,320,50,50);
    obstacle.velocityX = -(6 + bananaScore/7);
    obstacle.addImage("rock",obstacleImage);
    obstacle.scale = 0.14;
    obstacle.lifetime = 200;
    obstacle.setCollider("circle", 0, 0, 180);
    obstacleGroup.add(obstacle);
  }
  
}


  


