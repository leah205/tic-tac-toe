const Player = (symbol) => {
   let type = 'person'
  return{symbol, type}
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
let playerOne = Player('x');
let playerTwo = Player('o');
const Game = (() => {
  let turnName = playerTwo;
  const resetGame= () =>{
    turnName = playerTwo;
    displayControls.reset();
    gameBoard.reset()
  }
  // make takeATurn a pure function
  //add options for different robot 'people' to play
  //add more freedom with player one and two and x and o and names
   const takeATurn = (square) => {
    turnName = switchTurns(turnName, playerOne, playerTwo);
    if(gameBoard.checkForWin(playerOne.symbol) || gameBoard.checkForWin(playerTwo.symbol)){return;}
    if(displayControls.addSymbol(turnName.symbol, square) == 'error'  )return;
    gameBoard.logMove(turnName.symbol, square.getAttribute('id'));
    if(gameBoard.checkForWin(turnName.symbol)){
      displayControls.displayWin(turnName.symbol);
    }
    else if(gameBoard.checkForTie()) displayControls.displayTie();
    if(playerTwo.type === 'robot' && turnName === playerOne ){
      console.log('robot turn')
      const findRandomSquare = () => {
        let randomSquare = document.getElementById(Math.floor(Math.random()*9));
        console.log(randomSquare)
        if(randomSquare.textContent != '') return findRandomSquare();
        else return randomSquare;
        }
      
      takeATurn(findRandomSquare())
    }
  }
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
  return {takeATurn, resetGame}
 
  
})();




const DOM = (()=>{
    return {
      multiplayerBtn: document.querySelector(`#multiplayer-btn`),
      singlePlayerBtn : document.querySelector(`#singleplayer-btn`),
      grid: document.querySelector('#grid'),
      resetBtn:document.createElement('button'),
      winMessage:document.createElement('p'), 
      exitBtn: document.createElement('button')}
})();
const displayControls = (() => {
  const reset = () => {
    squares.forEach(square => square.textContent = '');
    document.body.removeChild(DOM.resetBtn);
    document.body.removeChild(DOM.winMessage)
  }
  const addExitBtn = () => {

  }
  const addResetBtn = () => {
    DOM.resetBtn.textContent = 'New Game';
    DOM.resetBtn.classList.add('reset-btn');
    document.body.appendChild(DOM.resetBtn);
    DOM.resetBtn.addEventListener('click', () => Game.resetGame())

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
      document.body.appendChild(DOM.winMessage);
  }
  const displayWin = (winner) => {
    addWinMessage(`${winner} has tic-tac-toe`);
    addResetBtn();
  }
  const setUpGrid = () => {
    document.body.removeChild(DOM.singlePlayerBtn);
    document.body.removeChild(DOM.multiplayerBtn);
    for(let i = 0; i < 9; i++){
      square = document.createElement('div');
      square.classList.add('square');
      grid.appendChild(square);
      square.setAttribute('id', i);
      squares = document.querySelectorAll('.square');
      square.textContent = '';
      }  
      squares.forEach(square =>
        square.addEventListener('click', ()=> Game.takeATurn(square))
        ) 
  };
  DOM.multiplayerBtn.addEventListener('click', () =>{ 
    setUpGrid();
    
  });
  DOM.singlePlayerBtn.addEventListener('click', () => {
    playerTwo.type = 'robot';
    setUpGrid()
  })
    return{addSymbol, displayWin, displayTie, reset}
})();



