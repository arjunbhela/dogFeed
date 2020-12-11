//Create variables here
var dog
var happyDog,database,foodS,foodStock, dogImg
function preload()
{
happyDog = loadImage("images/dogImg1.png");
happyDog.scale = 0.5
dogImg = loadImage("images/dogImg.png")
dogImg.scale = 0.5


}

function setup() {
  createCanvas(500, 500);
  dog = createSprite(250,250,10,10)
  dog.addImage(dogImg);
  dog.scale = 0.3
  database = firebase.database();
  foodStock=database.ref("Food")
  foodStock.on("value",readStock)
  
}


function draw() {  
background(46, 139, 87)
if (keyWentDown(UP_ARROW)) {
writeStock(foodS)
dog.addImage(happyDog);
var foodCountRef = database.ref('Food')
foodCountRef.on("value",readStock)
}
  drawSprites();
  //add styles here
  textSize(25)
  stroke(3)
  fill("white")
  text("Note: click the up arrow to feed Drago Milk!",15,67)
  text("Food remaining: "+foodS,100,340)

}

function readStock(data) {
  foodS = data.val()
}

function writeStock(x) {
if (x<=0) {
x=0;
} else{
x=x-1;
}
database.ref("/").update({
  Food:x
})
}
