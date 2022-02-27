'use strict';

let randomDice;

// let p1CurrentScore = 0;
// let p2CurrentScore = 0;
let p1TotalScore = 0;
let p2TotalScore = 0;
let tempScore = 0;

//________________Dice Image______________
const diceImageSelector = document.querySelector('.dice');
diceImageSelector.classList.add('hidden');

//________________Buttons_________________
const newGameBtn = document.querySelector('.btn--new');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdScoreBtn = document.querySelector('.btn--hold');

//________________Players_________________
const p1 = document.querySelector('.player--0');
const p2 = document.querySelector('.player--1');

let currentPlayer = p1;

//________________Players' scores_________________
const p1TotalScoreSelector = document.getElementById('score--0');
const p2TotalScoreSelector = document.getElementById('score--1');
p1TotalScoreSelector.textContent = 0;
p2TotalScoreSelector.textContent = 0;

const p1CurrentScoreSelector = document.getElementById('current--0');
const p2CurrentScoreSelector = document.getElementById('current--1');
p1CurrentScoreSelector.textContent = 0;
p2CurrentScoreSelector.textContent = 0;

//________________BUTTON HANDLERS______________
//1. ---------------New Game Button--------------
newGameBtn.addEventListener('click', () => {
	// Reset Scores
	tempScore = 0;
	p1CurrentScoreSelector.textContent = 0;
	p2CurrentScoreSelector.textContent = 0;
	p1TotalScore = 0;
	p2TotalScore = 0;
	p1TotalScoreSelector.textContent = 0;
	p2TotalScoreSelector.textContent = 0;

	// Current Player
	currentPlayer = p1;
	p1.classList.add('player--active');
	p2.classList.remove('player--active');

	// Enable buttons
	rollDiceBtn.disabled = false;
	holdScoreBtn.disabled = false;

	// Unhide the dice
	diceImageSelector.classList.add('hidden');

	// Unhide previous winner
	p1.classList.remove('player--winner');
	p2.classList.remove('player--winner');
});

//2. --------------Roll Dice Button--------------
rollDiceBtn.addEventListener('click', () => {
	if (diceImageSelector.classList.contains('hidden')) {
		diceImageSelector.classList.remove('hidden');
	}
	randomDice = Math.trunc(Math.random() * 6) + 1;
	diceImageSelector.setAttribute('src', `dice-${randomDice}.png`);

	if (currentPlayer === p1) {
		if (randomDice === 1) {
			p1CurrentScoreSelector.textContent = 0;
			p1.classList.remove('player--active');
			p2.classList.add('player--active');
			currentPlayer = p2;
		} else {
			tempScore += randomDice;
			p1CurrentScoreSelector.textContent = tempScore;
		}
	} else if (currentPlayer === p2) {
		if (randomDice === 1) {
			p2CurrentScoreSelector.textContent = 0;
			p2.classList.remove('player--active');
			p1.classList.add('player--active');
			currentPlayer = p1;
		} else {
			tempScore += randomDice;
			p2CurrentScoreSelector.textContent = tempScore;
		}
	}
});

//3. --------------Hold Score Button-------------
holdScoreBtn.addEventListener('click', () => {
	if (currentPlayer === p1) {
		p1TotalScore += tempScore;
		p1TotalScoreSelector.textContent = p1TotalScore;
		tempScore = 0;
		p1CurrentScoreSelector.textContent = 0;

		if (p1TotalScore >= 100) {
			p1.classList.add('player--winner');
			rollDiceBtn.disabled = true;
			holdScoreBtn.disabled = true;
		} else {
			p1.classList.remove('player--active');
			p2.classList.add('player--active');
			currentPlayer = p2;
		}
	} else if (currentPlayer === p2) {
		p2TotalScore += tempScore;
		p2TotalScoreSelector.textContent = p2TotalScore;
		tempScore = 0;
		p2CurrentScoreSelector.textContent = 0;

		if (p2TotalScore >= 100) {
			p2.classList.add('player--winner');
			rollDiceBtn.disabled = true;
			holdScoreBtn.disabled = true;
		} else {
			p2.classList.remove('player--active');
			p1.classList.add('player--active');
			currentPlayer = p1;
		}
	}
});
