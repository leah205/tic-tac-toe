const game = (()=>{
    let gameArr = [];
    const displayControls = ( () => {
    const grid = document.querySelector('#grid');
    for(let i = 0; i < 9; i++){
        square = document.createElement('div');
        square.classList.add('square');
        grid.appendChild(square);
        square.setAttribute('id', i);
        }
    
        squares = document.querySelectorAll('.square');
        
        const trial = () =>{};
        return(squares);
  
           

    })();
    ;

          const Player = string => {
              let winner;
              let tieGame;
  
               const checkForWin = ((symbol) => {
                   winner = false;
                   tieGame = false
                const reset = () =>{
                    const newGameBtn = document.createElement('button');
                    const buttonContainer = document.querySelector('.button-container');
                    newGameBtn.textContent = 'New Game';
                    newGameBtn.classList.add('reset-button');
                    buttonContainer.appendChild(newGameBtn);
                    newGameBtn.addEventListener('click', function clearAll(){
                        buttonContainer.removeChild(newGameBtn)
                        messageContainer.removeChild(winMessage);
                        gameArr = [];
                        squares.forEach((square)=>{
                            square.textContent = ''
                    })
                })}
                let playerArr = gameArr.filter(square => square.string === symbol);
                const winMessage = document.createElement('p');
                const messageContainer = document.querySelector('.message-container');
                let firstRow = playerArr.filter(square => square.arrayId <= 2);
                let middleRow = playerArr.filter(square => square.arrayId > 2 && square.arrayId <= 5 );
                let bottomRow = playerArr.filter(square => square.arrayId >= 6);
                let firstColumn = playerArr.filter(square => square.arrayId == 0 || square.arrayId ==3 || square.arrayId == 6);
                let middleColumn = playerArr.filter(square => square.arrayId == 1 || square.arrayId ==4 || square.arrayId == 7);
                let lastColumn = playerArr.filter(square => square.arrayId == 2 || square.arrayId ==5 || square.arrayId == 8);
                let leftToRight = playerArr.filter(square => square.arrayId == 0 || square.arrayId == 4 || square.arrayId == 8);
                let rightToLeft = playerArr.filter(square => square.arrayId == 2 || square.arrayId == 4 || square.arrayId == 6);
                if(middleRow.length === 3 || firstRow.length === 3 || bottomRow.length === 3 || firstColumn.length === 3 
                    || middleColumn.length === 3 || lastColumn.length ===3 || leftToRight.length === 3 || rightToLeft.length ===3) {
                        winner = true;
                       winMessage.textContent = `${symbol} has tic tac toe`;
                       messageContainer.appendChild(winMessage);



                        
                    }
                    else if(gameArr.length === 9 ){
                        tieGame = true;
                        winMessage.textContent = `It's a tie game`;
                       messageContainer.appendChild(winMessage);

                    }
                    else{return}
                    reset();
                    return{winner, tieGame}
                
              })
                
              
           const takeTurn = (item) =>{
            let arrayId = item.getAttribute('id');
            for(let i = 0; i < gameArr.length; i++){
                if (gameArr[i].arrayId === arrayId ){
                    return;
                }
            }
            item.textContent = string;
            position = {string, arrayId}
            gameArr.push(position);
            checkForWin(string);
            console.log(winner)
            if(winner === true || tieGame === true){
                playerTurn = playerOne;
            }
            else if (playerTurn == playerOne ){
                
                playerTurn = playerTwo;

           }
              else {
                  
                  playerTurn = playerOne
                }
           
             
           
     }
                    
           return {takeTurn}
          }
          const playerOne = Player('x');
          const playerTwo = Player('o');
          let playerTurn = playerOne;
          squares.forEach((item) => {
            item.addEventListener('click', () => {
                playerTurn.takeTurn(item)
                console.log('hello')
            })
           })
    
       

 


})();