var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var HanoiGame = function(disks) {
  this.disks = disks;
  this.towers = [[], [], []];
  for (var i = disks; i > 0; i--) {
    this.towers[0].push(i);}
};


HanoiGame.prototype.isWon = function() {
    if (this.towers[0].length === 0 && 
      (this.towers[1].length === 0 || this.towers[2].length === 0)) {
      return true;
    } else { 
      return false;
    }  
};

HanoiGame.prototype.isValidMove = function (startTowerIdx, endTowerIdx) {
  
    if (this.towers[startTowerIdx].length === 0) {
      return false;
    } else if (this.towers[endTowerIdx].length === 0 ) {
      return true;
    } else if (this.towers[startTowerIdx].slice(-1) < this.towers[endTowerIdx].slice(-1)) {
      return true;
    } else {
      return false;
    }
};

HanoiGame.prototype.move = function (startTowerIdx, endTowerIdx) {
    if (this.isValidMove(startTowerIdx, endTowerIdx)) {
      this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
    } else {
    throw "Invalid Move";    
    }
};

HanoiGame.prototype.print = function () {
  console.log("Tower 0: " + JSON.stringify(this.towers[0]));
  console.log("Tower 1: " + JSON.stringify(this.towers[1]));
  console.log("Tower 2: " + JSON.stringify(this.towers[2]));
};
    
HanoiGame.prototype.promptMove = function(callback) {
  this.print();

  reader.question("Enter From Tower", function (startTowerIdx) {
    reader.question("Enter To Tower", function (endTowerIdx) {
      var fromTower = parseInt(startTowerIdx);
      var toTower = parseInt(endTowerIdx);

      callback(fromTower, toTower, this);
    });
  });
}

HanoiGame.prototype.run = function(completionCallback) {
  if (this.isWon()) {
    completionCallback;
  } 
  else {
    this.promptMove( function (fromTower, toTower, context) {
      game.move(fromTower, toTower);
      game.run(completionCallback);
    });
  }  
};

game = new HanoiGame(3);
game.run(function () { 
  console.log("You Win!");
  reader.close();
})
;
