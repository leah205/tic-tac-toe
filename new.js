let playerOne;
let playerTwo;

const gameBoard = (() => {
    let isTie = false;
    let isWin = false;
    const getTie = () => {return(isTie)};
    const getWin = () => {return(isWin) }
    let board = [];
    const checkForWin = (symbol) => {
       
       
        playerArr = board.filter(square => square.sign == symbol);
        playerIndex = playerArr.map(square => square.index);
        const checkArr = (() =>{
          
            let firstRow = playerIndex.filter(square => square <= 2);
            let middleRow = playerIndex.filter(square => square > 2 && square <= 5 );
            let bottomRow = playerIndex.filter(square => square >= 6);
            let firstColumn = playerIndex.filter(square => square == 0 || square ==3 || square == 6);
            let middleColumn = playerIndex.filter(square => square == 1 || square ==4 || square == 7);
            let lastColumn = playerIndex.filter(square => square == 2 || square ==5 || square == 8);
            let leftToRight = playerIndex.filter(square => square == 0 || square == 4 || square == 8);
            let rightToLeft = playerIndex.filter(square => square == 2 || square == 4 || square == 6);
            if(middleRow.length === 3 || firstRow.length === 3 || bottomRow.length === 3 || firstColumn.length === 3 
                || middleColumn.length === 3 || lastColumn.length ===3 || leftToRight.length === 3 || rightToLeft.length ===3) {
                     isWin = true;
            
                } 
                else if(board.length === 9){
                    isTie= true;
                    console.log('tie game');
                  
                }
            })();
        }
    const reset = () =>{ 
        isTie = false;
        isWin = false;
        board = []};
    const addSign = (index, sign) =>{
        board.push({index, sign});
        console.log(board[0].index)
    }
return {addSign, checkForWin, getTie, reset, getWin}

})();

const Player = string => {
    const getSign = () => string;
   return{getSign}
 }

const displayControls = (()=>{
    let squares;
    const modeBtns = document.querySelectorAll('.choose-btn')
   const grid = document.querySelector('#grid');
   const messageContainer = document.querySelector('.message-container');
   const selectMode = (() => {
    const multiplayerBtn = document.querySelector('#multiplayer-btn');
    const singlePlayerBtn = document.querySelector('#singleplayer-btn');
    multiplayerBtn.addEventListener('click',()=>{
        playerTwo = Player('o')
         playerOne = Player('x');
        createGrid();
        takeTurns(playerTwo);
   })
   singlePlayerBtn.addEventListener('click', ()=>{
    playerRobot = Player('o');
     playerOne = Player('x');
       createGrid();
       takeTurns(playerRobot)
   })


})()
   function takeTurns(playerType){
    squares.forEach((square)=>{
        square.addEventListener('click', () => {
            gameFlow.takeATurn(square.getAttribute('id'));
            gameFlow.switchTurn(playerType);
            if(playerType == playerRobot){
                gameFlow.robotTurn();
            };
        
        })
   })};
   const createGrid = () => {
       removeAllChildren(grid);
       removeAllChildren(messageContainer);
    for(let i = 0; i < 9; i++){
        square = document.createElement('div');
        square.classList.add('square');
        grid.appendChild(square);
        square.setAttribute('id', i);
        squares = document.querySelectorAll('.square');
        square.textContent = '';
        } 
        
        }
       const addResetBtn = () =>{
        const resetBtn = document.createElement('button');
        resetBtn.classList.add('reset-btn')
        resetBtn.textContent = 'New Game';
        document.body.appendChild(resetBtn);
        resetBtn.addEventListener('click', () =>{
            document.body.removeChild(resetBtn)
            gameBoard.reset();
            createGrid();
            takeTurns()})
       }
        const placeASign = (square, sign) => {
            square.textContent = sign;
        }
        
     
        const displayWin = (symbol) =>{
            const winMessage = document.createElement('p');
            winMessage.textContent =''
            if(gameBoard.getTie()){
                console.log('display controls reads tie game')
                console.log('draw');
                winMessage.textContent = 'draw';
            }
            else{
                winMessage.textContent = `${symbol} has tic tac toe`;
                console.log('win')}
                messageContainer.appendChild(winMessage);
        }
        
       
        return {placeASign, createGrid, addResetBtn, displayWin}
        
})()
const gameFlow = (() => {
const takeATurn = (square) => {
    if(typeof(playerSign) == 'undefined'){
     playerSign = playerOne.getSign();
     console.log('yessir')
    }
    console.log(playerSign)
    if(gameBoard.getTie() || gameBoard.getWin() || square.textContent){
        return;
    }
    let index = square;

    displayControls.placeASign(document.getElementById(square),playerSign);
    gameBoard.addSign(index, playerSign);
    gameBoard.checkForWin(playerSign);
   if(gameBoard.getWin()|| gameBoard.getTie()){
       displayControls.addResetBtn();
       displayControls.displayWin(playerSign);
   }
console.log('made it to the bottom of take a turn')
}
const robotTurn = () => {
    let robotIndex = ((Math.floor(Math.random()*9)));
    takeATurn(robotIndex)
}
const switchTurn = ((playerType) => {
    if(playerSign == playerOne.getSign()){
       playerSign = playerType.getSign();
       console.log('hello')
   }
   else if(playerSign == playerOne && playerType == playerRobot ){
       playerSign = playerType.getSign()
      robotTurn();
   }
   else if(playerSign == playerType.getSign()){
       playerSign = playerOne.getSign()
   }
   
})  
return{switchTurn, takeATurn, robotTurn}
})()

