'use strict';

let dice; // Stores the dice numbers (between 1 and 6)
let currentScore; // Keeps track of the current score for the current player
let totalScore; // Keeps track of the total score for the current player
let cpIndex; // Keeps track of the index of current player (0 or 1)
let cpEl; // Keeps track of current player
let cpCurrentScoreEl; // Keeps track of current score of the current player
let cpTotalScoreEl; // Keeps track of total score of the current player


// Selecting elements
// 1. Dice Element
const diceEl = document.querySelector('.dice');
// 2. Current Score Elements
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
// 3. Total Score Elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
// 4. Player Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
// 5. Button Elements
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');


// Actions to be performed at the start of game
const startActions = function () {
    // 1. Initialize the declared variables
    dice = 0;
    currentScore = 0;
    totalScore = [0, 0];
    cpIndex = 0;
    // 2. Unhide the dice, which hidden by default at the start
    diceEl.classList.remove('hidden');
    // 3. Set both players' current scores to zero
    current0El.textContent = 0;
    current1El.textContent = 0;
    // 4. Set both players' total scores to zero
    score0El.textContent = 0;
    score1El.textContent = 0;
    // 5. Enable the "ROLL DICE" and "HOLD" buttons
    btnRoll.disabled = false;
    btnHold.disabled = false;
    // 6. Whiten the background of Player 1, who will be playing first
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    // 7. Remove the black background for the winner of the previous game
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
}

startActions();

// When "ROLL DICE" button is clicked
btnRoll.addEventListener('click', function () {
    dice = Math.ceil(Math.random() * 6);
    console.log(dice);
    diceEl.src = `dice-${dice}.png`;
    
    cpEl = (cpIndex === 0) ? current0El : current1El;
    if (dice === 1) {
        currentScore = 0;
        cpEl.textContent = currentScore; 
        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active');
        cpIndex = 1 - cpIndex;
    }
    else {
        currentScore += dice;
        cpEl.textContent = currentScore;
    }
});

// When "HOLD" button is clicked
btnHold.addEventListener('click', function () {
    cpEl = (cpIndex === 0) ? player0El : player1El;
    cpCurrentScoreEl = (cpIndex === 0) ? current0El : current1El;
    cpTotalScoreEl = (cpIndex === 0) ? score0El : score1El;
    
    totalScore[cpIndex] += currentScore;
    cpTotalScoreEl.textContent = totalScore[cpIndex];
    currentScore = 0;
    cpCurrentScoreEl.textContent = currentScore;

    if (totalScore[cpIndex] >= 100) {
        cpEl.classList.add('player--winner');
        btnRoll.disabled = true;
        btnHold.disabled = true;
    }
    else {
        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active');
    }
    cpIndex = 1 - cpIndex;
});

// When "NEW GAME" button is clicked
btnNew.addEventListener('click', startActions());
