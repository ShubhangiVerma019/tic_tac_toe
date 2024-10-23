function resetGameStatus(){
    activePlayer = 0;
    currentRound = 1;
    gameIsOver = false;
    gameOverElement.firstElementChild.innerHTML = 'You won, <span id="winner-name"> PLAYER NAME</span>!';
    gameOverElement.style.display = 'none';

    let gameBoardIndex = 0;
    for(let i = 0; i < 3; i++){
        for(let j=0;j<3;j++){
            gameData[i][j] = 0;
            const gameBoardItemElement = gameBoardElement.children[gameBoardIndex];
            gameBoardItemElement.textContent = '';
            gameBoardItemElement.classList.remove('disabled');
            gameBoardIndex++;
        }
    }
}

function startNewGame(){
    if(players[0].name === '' || players[1].name === ''){
        alert('Please set custom player names for both players!!');
        return;
    }

    resetGameStatus();

    activePlayerNameElement.textContent = players[activePlayer].name;
    gameAreaElement.style.display = 'block';
}

function switchPlayer(){
    if(activePlayer === 0){
        activePlayer = 1;
    } else{
        activePlayer = 0;
    }
    activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event){
    //console.log(event.target.tagName);
    // if(event.target.tagName !== 'LI' || gameIsOver === true) OR SIMPLY WRITE IT AS => DOWN BELOW STATEMENT
    if(event.target.tagName !== 'LI' || gameIsOver){
        return;
    }

    const selectedField = event.target;
    const selectedColumn = selectedField.dataset.col - 1; // we deuct one since array starts with 0 not 1
    const selectedRow = selectedField.dataset.row - 1; //since we deduct one we automatically convert it into a number from string

    if(gameData[selectedRow][selectedColumn]>0){
        alert('Please select an empty field!');
        return;
    }

    selectedField.textContent = players[activePlayer].symbol; // players[0]
    selectedField.classList.add('disabled');


    gameData[selectedRow][selectedColumn] = activePlayer + 1;
    //console.log(gameData); //2d array representing the game board is displayed.

    const winnerId = checkForGameOver();
    //console.log(winnerId);

    if(winnerId !== 0){
        endGame(winnerId);
    }

    if(winnerId !== 0){
        endGame(winnerId);
    }

    currentRound++;
    switchPlayer();
}

function checkForGameOver(){
    //Checking the rows for equality
    for(let i = 0; i < 3; i++){
        if(
            gameData[i][0] > 0 &&
            gameData[i][0] === gameData[i][1] &&
            gameData[i][0] === gameData[i][2]
        ){
            return gameData[i][0];
        }
    }

    //Checking the columns for equality
    for(let i = 0; i < 3; i++){
        if(
            gameData[0][i] > 0 &&
            gameData[0][i] === gameData[1][i] &&
            gameData[0][i] === gameData[2][i]
        ){
            return gameData[0][i];
        }
    }

    //Diagonal: Top left to bottom right
    if(gameData[0][0] > 0 && gameData[0][0] === gameData[1][1] && gameData[1][1] === gameData[2][2]){
        return gameData[0][0];
    }

    //Diagonal: Bottom left to top right
    if(gameData[2][0] > 0 && gameData[2][0] === gameData[1][1] && gameData[1][1] === gameData[0][2]){
         return gameData[2][0];
     }

     if(currentRound === 9){
        /* we return -1, if we have no winner, but the game is over because we exhausted all rounds, 
        and then minus one signals that we'll have a draw. */
        return -1;
     }

     // we return 0 if we still have rounds left, and we simply don't have a winner yet and the game is also not over yet. 
     return 0;
}

//check for we have a winner
function endGame(winnerId){
    gameIsOver = true;
    gameOverElement.style.display = 'block';

    if(winnerId > 0){

        const winnerName = players[winnerId - 1].name;
        gameOverElement.firstElementChild.firstElementChild.textContent = winnerName;
        winnerName;
    }else{
        gameOverElement.firstElementChild.textContent = 'It\'s a draw!!'
    }
}