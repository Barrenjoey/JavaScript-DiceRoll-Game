/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Declaring variables
var scores, roundScore, activePlayer, gamePlaying;

// Sets values and positions to 0 to start the game.
init();

// Event handling for 'ROLL DICE' button.
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // Selecting random number from 1-6
        var dice = Math.floor(Math.random() * 6) + 1;
        console.log(dice);
        // Displaying the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        
        // Update the score if number is not a 1.
        if (dice !== 1) {
            // Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
        else {
            // Next player
            nextPlayer();
        }
    }    
});

// Event handling for 'HOLD' button.
document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        // Add current score to global score
        scores[activePlayer] += roundScore;
        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        // Check if player won the game
        if (scores[activePlayer] >= 20) {
            document.getElementById('name-'+ activePlayer).textContent = 'WINNER!!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            gamePlaying = false;
        }
        else {
        // Change player
        nextPlayer();
        }
    }
});

// Function to switch between active players.
function nextPlayer() {
    // Changing player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    // Resetting score to 0.
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    // Changing active player visual
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    // Hide dice image after rolling 1.
    document.querySelector('.dice').style.display = 'none';
}

// Listens for 'NEW GAME' button to be pressed.
document.querySelector('.btn-new').addEventListener('click', init);

// Sets and resets elements ready for a new game.
function init() {
    gamePlaying = true;
    // Hiding dice image from view when page is first loaded.
    document.querySelector('.dice').style.display = 'none';
    // Setting values to 0.
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
}