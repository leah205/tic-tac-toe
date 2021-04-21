const Player = (symbol, type, operation) => {
  return{symbol, type}
}
let playerOne; 
let playerTwo;
function setUpGame(mode){
  if(mode === 'multiplayer'){
    playerOne = Player('x', 'person');
    playerTwo = Player('o', 'person');
    
  }
  else{
    playerOne = Player('x', 'person');
    playerTwo = Player('o', 'robot')
  };
  return{mode}
}

const gameBoard = (() => {
    let arr = ['','','','','','','','',''];
    let availableSquareArr = arr;
    const logMove = (value, index) => {
       arr[index] = value;
    }
    const findRobotArr = () => {
  
    }
    const reset = () => {
      arr = ['','','','','','','','',''];
    }
    const checkForTie = () => {
      let tiegame = arr.every(square => square != '')
       return tiegame;
    }
    const checkForWin = (value) => {
      let isWin = false;
        let winningSets = [
          [arr[0], arr[1], arr[2]],
          [arr[3], arr[4], arr[5]],
          [arr[6], arr[7], arr[8]],
          [arr[0], arr[3], arr[6]],
          [arr[1], arr[4], arr[7]],
          [arr[2], arr[5], arr[8]],
          [arr[0], arr[4], arr[8]],
          [arr[2], arr[4], arr[6]]
          
        ]
        winningSets.forEach(row => {
          let checkRow = row.every(symbol => symbol === value);
          if(checkRow === true) isWin = true ;
        })
        return isWin;
 }

     
return{logMove, checkForWin, checkForTie, reset, findRobotArr}
})()

const Game = (() => {
  let turnName = playerTwo;
  const robotTurn = () => {
    const findRandomSquare = () => {
      let randomSquare = document.getElementById(Math.floor(Math.random()*9));
      if(randomSquare.textContent != '') return findRandomSquare();
      else return randomSquare;
      }
    takeATurn(findRandomSquare());
  }
  
  function newGame(mode){
    gameBoard.reset();
    displayControls.newGame();
    setUpGame(mode);
  }
  // make takeATurn a pure function
  //add options for different robot 'people' to play
  //add more freedom with player one and two and x and o and names
  // factory function
   const takeATurn = (square) => {
    turnName = switchTurns(turnName, playerOne, playerTwo);
    if(gameBoard.checkForWin(playerOne.symbol) || gameBoard.checkForWin(playerTwo.symbol)){return;}
    if(displayControls.addSymbol(turnName.symbol, square) == 'error'  )return;
    gameBoard.logMove(turnName.symbol, square.getAttribute('id'));
    if(gameBoard.checkForWin(turnName.symbol)){
      displayControls.displayWin(turnName.symbol);
    }
    else if(gameBoard.checkForTie()) displayControls.displayTie();
    else if(playerTwo.type === 'robot' && turnName === playerOne ){
      robotTurn()
  }}
  const switchTurns = (turn, a, b) => {
    let newTurn;
     if(turn != a){
         newTurn = a;
     }
     else{
       newTurn = b;
     }
     return(newTurn)
  };
  return {takeATurn, newGame}
 
  
})();




const DOM = (()=>{
    return {
      nameInputBox: document.createElement('input'),
      multiplayerBtn: document.querySelector(`#multiplayer-btn`),
      singlePlayerBtn : document.querySelector(`#singleplayer-btn`),
      resetBtn: document.createElement('button'),
      winMessage:document.createElement('p'), 
      exitBtn: document.createElement('button'),
      gameContainer: document.createElement('div'),
      chooseModeContainer: document.querySelector('.choose-div'),
      grid: document.createElement('div')}
})();
const displayControls = (() => {
  const addExitBtn = () => {
    console.log('exit btn')
    DOM.exitBtn.textContent = 'Exit';
    DOM.exitBtn.setAttribute('id', 'reset-btn');
    DOM.gameContainer.appendChild(DOM.exitBtn);
    DOM.exitBtn.addEventListener('click', () => {
       removeChildren(DOM.gameContainer);
       document.body.appendChild(DOM.chooseModeContainer);
    })
  }
  const addResetBtn = () => {
    DOM.resetBtn.textContent = 'New Game';
    DOM.resetBtn.setAttribute('id', 'reset-btn');
    DOM.gameContainer.appendChild(DOM.resetBtn);
    DOM.resetBtn.addEventListener('click', () => {
      if(playerTwo.type === 'robot') Game.newGame('singleplayer');
      else{Game.newGame('multiplayer')}})

  }
  const addSymbol = (symbol,square) => {
      if(square.textContent != '') return 'error';
     else square.textContent = symbol;
  }
  const displayTie = () => {
     addWinMessage(`Tie game`);
     addResetBtn()
  }
  const addWinMessage = (content) => {
      DOM.winMessage.classList.add('win-message')
      DOM.winMessage.textContent = content;
      DOM.gameContainer.appendChild(DOM.winMessage);
  }
  const displayWin = (winner) => {
    addWinMessage(`${winner} has tic-tac-toe`);
  };
  const setUpGrid = () =>{
    document.body.removeChild(DOM.chooseModeContainer);
    if(document.body.contains(DOM.gameContainer)!= true){document.body.appendChild(DOM.gameContainer)};
    DOM.gameContainer.classList.add('game-container')
    addExitBtn();
    addResetBtn();
    DOM.grid.setAttribute('id', 'grid');
    DOM.gameContainer.appendChild(DOM.grid);
    removeChildren(DOM.grid);
    for(let i = 0; i < 9; i++){
      square = document.createElement('div');
      square.classList.add('square');
      DOM.grid.appendChild(square);
      square.setAttribute('id', i);
      squares = document.querySelectorAll('.square');
      square.textContent = '';
      }  
      squares.forEach(square =>
        square.addEventListener('click', ()=> Game.takeATurn(square))
        ) }
  const newGame = () => {
    if(DOM.gameContainer.contains(DOM.grid) != true) setUpGrid();
    DOM.winMessage.textContent = '';
    squares.forEach(square => square.textContent = '');};

  DOM.multiplayerBtn.addEventListener('click', () =>{ 
    Game.newGame('multiplayer')
  });
  DOM.singlePlayerBtn.addEventListener('click', () => {
    Game.newGame('singleplayer')
  })
    return{addSymbol, displayWin, displayTie,  newGame, setUpGrid}
})();

const removeChildren = (parent) => {
  while(parent.lastChild){
     parent.removeChild(parent.lastChild)
}};



