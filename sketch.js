//Create variables here
var dog, dogImg, happyDog, database, foodS, foodStock;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(300,250,10,10);
  dog.addImage(dogImg)
  foodStock = database.ref('Food');
    foodStock.on("value",readStock);
}


function draw() {  
background(46,139,87);
  //add styles here


if (keyWentDown(UP_ARROW)) {
  writeStock(foodS);
  dog.addImage(happyDog)
}

drawSprites();
textSize(20);
fill ("black");
stroke ("blue");
text("FOOD REMAINING: " + foodS,170,200);
text("PRESS UP ARROW TO FEED DRAGO MILK",250,450);

}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  if (x<=0) {
    x = 0;
  } else {
    x = x-1;
  }
  database.ref('/').update({
    Food:x
  })
}

