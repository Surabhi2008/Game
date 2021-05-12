var monkey , monkey_running
var banana ,bananaImage, stone, stoneImage
var FoodGroup, obstacleGroup
var Survival_Time=0 
var ground,groundImage
var  invisibleGround
var banana,bananaImage
var jungle1,jungle1Image,jungle2,jungle2Image
var monkey10,monkey10Image
var gameState="play"
var reset,resetImage,resetGroup
var sound 
var sound1

function preload(){
  
 monkey =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png")
 monkey1_running=loadAnimation("Horsee.jpg")
  
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("obstacle.png");
 groundImage=loadImage("ground2.png")
  jungle1Image= loadImage("background.jpg")
  jungle2Image= loadImage("jungle2.jpg")
 resetImage=loadImage("restart.png")
 sound=loadSound("jump.mp3")
   sound1=loadSound("checkPoint.mp3")
   
  
}



function setup() {
var Survival_Time=0  
  
  jungle1=createSprite(0,0,700,2000)
  jungle1.addImage(jungle1Image)
  jungle1.scale=2.7  


 
  monkey1=createSprite(66,334,10,10)
  monkey1.addAnimation("running",monkey)
  monkey1.scale=0.2
 
  
 ground()
  
  
     reset=createSprite(312,316,10,10)
      reset.addImage(resetImage)
 
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
   
  bananaGroup= new Group()
  stoneGroup=new Group()
 
 
}


function draw() {
createCanvas(400, 400);
  background("0")
 
  if(gameState==="play"){
  
    
    jungle1.velocityX = -10

    if (jungle1.x < 0){
    jungle1.x = jungle1.width/2;
    }
    
    
    
    //jumping monkey
    if(keyDown("space")&& monkey1.y>=250){
    monkey1.velocityY = -12;
      sound.play()
    }
  //creating gravitational pull
   monkey1.velocityY = monkey1.velocityY + 0.8
  
   //function stone
   stone()
   
   //function bannana
   banana();
  
   //creating ground again and again
    if (ground.x < 0){
    ground.x = ground.width/10;}
  
    //increasing speed
   if(Survival_Time===100){
     stone.velocityX=-20
   }
  // colliding monkey to the ground
  monkey1.collide(ground)
    reset.visible=false
  }
  
  //destroying banana
   if(bananaGroup.isTouching(monkey1)){
    bananaGroup.destroyEach()
      sound1.play()
    }
  
   if(mousePressedOver(reset)){
    gameState="play"
    monkey1.changeAnimation("running",monkey)
    monkey1.scale=0.2
    reset.invisible = true;
   Survival_Time=0 
}
  
  
 if(stoneGroup.isTouching(monkey1)){
  monkey1.changeAnimation("collide",monkey1_running)
  gameState="end"
    }

  drawSprites()
  
   if(gameState==="end"){
     textSize(30)
     fill("black")
     text("Game Over",230,250)
     jungle1.velocityX=0
     ground.velocityX=0
     stoneGroup.destroyEach()
     bananaGroup.velocityX=0
     monkey1.velocityY=0
     monkey1.scale=0.3
     reset.visible=true
     
    }
   fill("black")
   text(" Survival_Time" +Survival_Time,282,48);
 Survival_Time=Math.round( Survival_Time+(frameCount/600))
  
}

function banana(){
   if(World.frameCount%80===0){var banana=createSprite(600,165,10,40)
  banana.addImage(bananaImage)
  banana.y=Math.round(random(70,300))
  banana.scale=0.1
  banana.velocityX=-8
 bananaGroup.add(banana)
}}


function stone(){
  if(World.frameCount%80===0){
   var stone=createSprite(390,355,10,10)
   stone.velocityX=-(20+(Survival_Time/600))
    stone.addImage(stoneImage)
    stone.scale=0.1
    stone.velocityX=-10
  stoneGroup.add(stone)
  }
}

function ground(){
   ground = createSprite(306,370,400,20);
  ground.addImage(groundImage)
 ground.x = ground.width /2;
  ground.velocityX = -10;
} 

   


