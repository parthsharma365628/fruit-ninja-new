var back, back1
var points = 0
var knife, knife1
var fruit, fruit1, fruitG
var edges
var monster, monster1, monster2, monG;
var Gstate = "play"
var over, over1
var re,re1

function preload() {
  back1 = loadImage("back.jpg")
  knife1 = loadImage("knife.png")

  img1 = loadImage("fruit1.png")
  img2 = loadImage("fruit2.png")
  img3 = loadImage("fruit3.png")
  img4 = loadImage("fruit4.png")

  sound = loadSound("sound.mp3")
  monster1 = loadImage("alien1.png")
  monster2 = loadImage("alien2.png")

  over1 = loadImage("gameover.png")
  re1=loadImage("reload.png")

}



function setup() {
  createCanvas(windowWidth,windowHeight);
  
  back = createSprite(width/2,height/2, width, height)
  back.addImage(back1)
  back.scale = 1

  knife = createSprite(width/2,height/2, 10, 10)
  knife.addImage(knife1)
  knife.setCollider("rectangle", -10, -29, 30, 100)
 

  fruitG = createGroup()
  monG = createGroup()

  over = createSprite(width/2, height/2, 10, 10)
  over.addImage(over1)
  over.scale = 2.9
  over.visible = false;
  
  re=createSprite(width/2,height-200,10,10)
  re.addImage(re1)
  re.scale=0.17
  re.visible=false
  
  //edges=createEdgeSprites()
}

function draw() {
  background("lightblue");
  
  if (Gstate === "play") {
    knife.x = mouseX
    knife.y = mouseY

    monsters()
    fruits()

    if (fruitG.isTouching(knife)) {
      fruitG.destroyEach()
      points = points + 1
      sound.play()

    }
    if (monG.isTouching(knife)) {
      
      Gstate = "over"
     
      
      
    }}

  
  else if(Gstate==="over"){
      over.visible = true
      fruitG.destroyEach()
      knife.visible=false;
      re.visible=true
      monG.destroyEach()
    if(mousePressedOver(re)){
       reset()  
      

  }
  }
  
  
  
  
  
console.log(Gstate)
  drawSprites();
  textSize(25)
  fill("yellow")
  text("Points: " + points, 2, 20)

  
  
}

function fruits() {
  if (World.frameCount % 90 === 0) {
    fruit = createSprite(round(random(20, width-20)), -30, 10, 10)

    num = round(random(1, 4))
    if (num === 1) {
      fruit.addImage(img1)
    } else if (num === 2) {
      fruit.addImage(img2)
    } else if (num === 3) {
      fruit.addImage(img3)
    } else if (num === 4) {
      fruit.addImage(img4)
    }

    fruit.setLifetime = 100
    fruit.scale = 0.25
    fruit.velocityY = points * 2 + 3
    fruitG.add(fruit)
  }
}

function monsters() {
  if (World.frameCount % 220 === 0) {
    monster = createSprite(round(random(20, width-20)), -30, 10, 10)
    monster.setLifetime = 100
    monster.addImage(monster1)
    monster.velocityY = points * 2 + 3
    monG.add(monster)

    num1 = round(random(1, 2))
    if (num1 === 1) {
      monster.addImage(monster1)
    } else if (num1 === 2) {
      monster.addImage(monster2)
    }
  }
}

function reset(){
  Gstate="play"
  over.visible=false;
  re.visible=false;
  points=0
  knife.visible=true
  
}