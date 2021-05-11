//Create variables here
var pet, pet2;
var database;
var foodStock, food;
var foodS;
var feedTime, lastFed;
var Feed, addFood;
var changeGameState, readGameState;
var bedroom, garden, washroom, livingroom;
var currentTime;

function preload()
{
  //load images here
  dogImg = loadImage("Dog.png");
  dog2Img = loadImage("happydog.png");
  room1 = loadImage("images/Bed Room.png");
  room2= loadImage("images/Garden.png");
  room3 = loadImage("images/Living Room.png");
  room4 = loadImage("images/Wash Room.png");
}

function setup() {
  createCanvas(500,500);
  pet = createSprite(370,300,20,20);
  pet.addImage(dogImg);
  pet.scale = 0.3;
  room2.scale = 0.3;
  database = firebase.database();
 foodStock =  database.ref('Food');
  foodStock.on("value",readStock);
 // dog = new Dog(300,200,20,20);
  Feed = createButton("Feed the Dog");
  Feed.position(500,95);
  Feed.mousePressed(feedDog);
  food = new Food();
  addFood = createButton("Add Food");
  addFood.position(600,95);
  addFood.mousePressed(addFoodS);
  readGameState = database.ref('gameState');
  readGameState.on("value",function(data){
    gameState = data.val();
  })

}

function draw() {  
  background(46,139,87);
  food.display();
  database.ref('feedTime').on("value",function(data){
    lastFed = data.val()
  })
  textSize(15);
  fill("black");
  if(lastFed>=12){
    text("Last Feed : " + lastFed%12+" pm",200,30);
  }
  else if(lastFed==0){
    text("Last Feed : 12 am ",200,30);
      }
    else{
      text("Last Feed : " + lastFed+" am",200,30);
      }
      currentTime = hour();
      if(currentTime==(lastFed+1)){
        update("playing");
        food.garden();
      }
      else if(currentTime ==(lastFed+2)){
        update("sleeping");
        food.bedroom();
      }
      else if(currentTime ==(lastFed+3)){
        update("bathing");
        food.washroom();
      }
      else{
        update("hungry");
        food.display();
      }
    if(gameState!="hungry"){
      Feed.hide();
      addFood.hide();
      pet.remove();
       }
    else{
      Feed.show();
      addFood.show();
     // pet.addImage("images/deadDog.png");
    }
  drawSprites();
  
}
function readStock(data){
  foodS = data.val();
  food.updateFoodStock(foodS);
}
function feedDog(){
  pet.addImage(dog2Img);
  if(food.getFoodStock()<=0){
    food.updateFoodStock(food.getFoodStock()*0);
  }
  else{
    food.updateFoodStock(food.getFoodStock()-1);
  }
  database.ref('/').update({
    Food : food.getFoodStock(),
    feedTime : hour()
  })
}
function addFoodS(){
  foodS++;
  database.ref('/').update({
    Food : foodS
  })
}
function update(state){
  database.ref('/').update({
    gameState:state
  })
}

