import { Board } from "../src/tic-tac-toe";
import { Space } from "../src/tic-tac-toe";
import { Player } from "../src/tic-tac-toe";

describe('Board', () => {
  
  test('should return board object', () => {
    const newBoard = new Board();
    expect(newBoard.spaces).toEqual({});
  });
  test('should return a space object based on id', () => {
    const newBoard = new Board()
    const space = new Space(5, true);
    newBoard.spaces[space.id] = space;
    const foundSpace = newBoard.findSpace(space.id);
    expect(foundSpace.id).toEqual(5);
  });

  test('should return false', () => {
    const newBoard = new Board()
    const space = new Space(5, true);
    newBoard.spaces[space.id] = space;
    const foundSpace = newBoard.findSpace(9);
    expect(foundSpace).toEqual(false);
  });

  test('should build 9 space objects and add them to the board', () => {
    const newBoard = new Board()
    newBoard.buildSpaceObjects();
    expect(Object.keys(newBoard.spaces).length).toEqual(9);
  });

   test('should return true since all spaces are marked', () => {
    const newBoard = new Board()
    newBoard.buildSpaceObjects();
    Object.keys(newBoard.spaces).forEach(function(key) {
    const space = newBoard.findSpace(key);
    space.isMarked = true
    });
    const bool = newBoard.allSpacesMarked(newBoard);
    expect(bool).toEqual(true);
    });

    test('should return false since all spaces are false', () => {
    const newBoard = new Board()
    newBoard.buildSpaceObjects();
    const bool = newBoard.allSpacesMarked(newBoard);
    expect(bool).toEqual(false);
    });

    test('should return 1 since all spaces are marked by player', () => {
    const newBoard = new Board()
    const player = {name: "player"}
    newBoard.buildSpaceObjects();
    Object.keys(newBoard.spaces).forEach(function(key) {
    const space = newBoard.findSpace(key);
    space.isMarked = true
    space.player = "player"
    });
    const number = newBoard.IsCompleted(newBoard, player);
    expect(number).toEqual(1);
    });

    test('should return 2 since its a tie', () => {
    const newBoard = new Board()
    const player = {name: "player"}
    newBoard.buildSpaceObjects();
    let index;
    Object.keys(newBoard.spaces).forEach(function(key) {
    const space = newBoard.findSpace(key);
    space.isMarked = true
    if(index % 2 == 0 ) {
      space.player = "player"
    }else {
      space.player = "computer"
    }
    index++
    });
    const number = newBoard.IsCompleted(newBoard, player);
    expect(number).toEqual(2);
    });

    test('should return 3 since there is no winner', () => {
    const newBoard = new Board()
    const player = {name: "player"}
    newBoard.buildSpaceObjects();
    const space = newBoard.findSpace(1)
    space.isMarked = true;
    space.player = player.name
    const space2 = newBoard.findSpace(2)
    space2.isMarked = true;
    space2.player = player.name
    const number = newBoard.IsCompleted(newBoard, player);
    expect(number).toEqual(3);
    });
  });


describe('Space', () => { 

  test('should return space object', () => {
    const space = new Space(5, true);
    expect(space.id).toEqual(5);
    expect(space.isMarked).toEqual(true);
  });

    test('should mark a space', () => {
    const space = new Space(5, false);
    const player = {name: "player"}
    space.markSpace(player)
    expect(space.isMarked).toEqual(true);
    expect(space.player).toEqual("player");
  });
});

describe('Player', () => {
  test('should return X, True, and player1', () => {
    const player = new Player("x", true, 'player1');
    expect(player.mark).toEqual("x");
    expect(player.isTurn).toEqual(true);
    expect(player.name).toEqual("player1");
  });
  test('should return isTurn === false', () => {
    const player = new Player("x", true, "player1");
    player.turnChange();
    expect(player.isTurn).toEqual(false);
  });
  test('should return isTurn === true', () => {
    const player = new Player("x", false, "player1");
    player.turnChange();
    expect(player.isTurn).toEqual(true);
  });
  test('should return x', () => {
    const player = new Player("x");
    let mark = player.makeMark();
    expect(mark).toEqual("x");
  });
  test('should return random number from 1 to 9', () => {
    const board = new Board ();
    board.buildSpaceObjects();
    let player1 = new Player("x", true, "player1");
    let computer = new Player("o", false, "computer");
    // player1.makeMark(player1);
    // player1.turnChange();
    // space.markSpace()
    console.log(board);
    // console.log(player1);
    const randomNumber = computer.pickSpaceEasy(board, computer);
    console.log(board)
    expect(randomNumber).toBeGreaterThanOrEqual(1);
    expect(randomNumber).toBeLessThan(10);
  });
});


