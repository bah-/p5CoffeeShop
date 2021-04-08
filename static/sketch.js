
var game;




function setup() {
    var canvas = createCanvas(1,1);

    // jumbo-canvas is a string
    canvas.parent('jumbo-canvas');
    resetEverything();
}



function draw() {
  game.update();
}

function buyCoffeMachine(){
  game.buyCoffeeMachine();
}

function buyCoffe(){
  game.buyCoffee();
}

function prepareCoffee(){
  game.prepareCoffee();
}

function orderCoffee(){
  game.orderCoffee();  
}


function resetEverything(){
  game= new Game();
  game.update();
  game.updateBudget();
  game.updateSatisfaction();
  game.updateCoffeeQueue();
  game.updateRemainCoffee();
  game.updateCoffeeSold();
}
// var w = 600;
// var h = 400;
// var n;

// function setup(){
//   // ...
//   createCanvas(w, h).parent('canvasHolder');
//   // ...
//   n = createSlider(1, 1000, 500, 1).parent('nParticles');
//   // ...
// }