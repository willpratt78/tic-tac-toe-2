export function Board() {
  this.spaces= {}
}

Board.prototype.findSpace = function(id) {
  if (this.spaces[id] != undefined) {
    return this.spaces[id];
  }
  return false;
};

Board.prototype.buildSpaceObjects = function() {
  for (let i = 1; i < 10; i++) {
    const space = new Space(i, false)
    this.spaces[space.id] = space;
  }
}

Board.prototype.allSpacesMarked = function(board) {
  let bool = true;
  Object.keys(board.spaces).forEach(function(key) {
    const space = board.findSpace(key);
    if(space.isMarked === false) {
      bool = false;
    }
  });
  return bool;
}

Board.prototype.IsCompleted = function(board, player) {
  const options = [[1,2,3],[6,5,4],[7,8,9],[3,5,7],[4,1,7],[2,5,8],[9,6,3],[5,1,9]]
  for (let i = 0; i < options.length; i++) {
    const firstSpace = board.findSpace(options[i][0])
    if(firstSpace.isMarked === true && firstSpace.player === player.name) {
      let count = 0;
      options[i].forEach(spaceId => {
        const space = board.findSpace(spaceId);
        if(space.isMarked){
          if(space.player === player.name){
            count++
          }
        }
      });
      if(count === 3){
        // colorSquares(options[i]);
        return 1;
      }
    }
  }
  if(board.allSpacesMarked(board)){
    return 2;
  }
  return 3
}

export function Space(id, isMarked) {
  this.id = id
  this.isMarked = isMarked
}

Space.prototype.markSpace = function(player) {
  this.isMarked = true;
  this.player = player.name;
}

export function Player(mark, isTurn, name) {
  this.mark = mark
  this.isTurn = isTurn
  this.name = name
}

Player.prototype.turnChange = function() {
  
  if (this.isTurn === true) {
    this.isTurn = false;
  }else {
    this.isTurn = true;
  }
}

Player.prototype.makeMark = function() {
  return this.mark
}

Player.prototype.pickSpaceEasy = function(board, computer) {
  for (let i = 0; i < 100; i++) {
  const randomNumber = Math.floor(Math.random() * 9) + 1;
  const space = board.findSpace(randomNumber)
  if(space.isMarked === false){
    space.markSpace(computer)
    return space.id
  }
  }
}