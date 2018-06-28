// "use stricst"

var cardDeck = document.getElementById('card-deck');
var cards = document.getElementsByClassName('card');
var arrayOfCards = [...cards];
var closeIcon = document.getElementById("close-icon");
var clicks = 0;
var openCards = [];
var matchedCardsList = [];
var modal = document.getElementById("popup1");
var finalMoves = 0;
var finalMoves = document.getElementById('finalMove');
var totalTime = document.getElementById('totalTime');
var secs = document.getElementById('secs');
var mins  = document.getElementById('mins');
var timers = document.getElementsByClassName('timer');

var time;

function startTimer() {
    var seconds = 0;
    timer =  setInterval(function() {
        seconds++;
        secs.innerHTML = seconds % 60;
        mins.innerHTML = parseInt(seconds / 60);
        totalTime.innerHTML = mins +' : ' + secs;
    }, 1000);

}



function cardOpen() {
  openCards.push(this);
    if (openCards.length == 2) {
    clicks++;
    document.getElementsByClassName('moves')[0].innerHTML = clicks;
        finalMoves.innerHTML = clicks;
    if (openCards[0].type == openCards[1].type) {
      matchedCards(...openCards);
    } else {
      unmatchedCards(...openCards);
    }
  }
}



function matchedCards(firstCard, secondCard) {
  firstCard.classList.add("match", "disabled");
  secondCard.classList.add("match", "disabled");
  firstCard.classList.remove("open", "show");
  secondCard.classList.remove("open", "show");
  matchedCardsList.push(firstCard, secondCard);
  openCards = [];
}



function unmatchedCards(firstCard, secondCard) {
  firstCard.classList.add("unmatched");
  secondCard.classList.add("unmatched");
  disabled();
  setTimeout(function () {
    firstCard.classList.remove("unmatched", "open", "disabled", "show");
    secondCard.classList.remove("unmatched", "open", "disabled", "show");
    enabled();
    openCards = [];
  }, 1000);
}



function Shuffle(inputArray) {
  for (var currentIndex = 0; currentIndex < inputArray.length; currentIndex++) {
    var temporaryValue = inputArray[currentIndex];
    //
    var randomIndex = Math.floor(Math.random() * currentIndex);
    inputArray[currentIndex] = inputArray[randomIndex];
    inputArray[randomIndex] = temporaryValue;
  }
  return inputArray;
}



function startGame() {
  startTimer();
  cardDeck.innerHTML = "";
  arrayOfCards = Shuffle(arrayOfCards);
  for (var i = 0; i < arrayOfCards.length; i++) {
    cardDeck.appendChild(arrayOfCards[i]);
    arrayOfCards[i].addEventListener("click", displayCard);
    arrayOfCards[i].classList.remove('open', 'show', 'match', 'disabled');
    arrayOfCards[i].addEventListener("click", cardOpen);
    clicks = 0;
    document.getElementById('checkMoves').innerHTML = clicks;
    arrayOfCards[i].addEventListener("click", congrats);
  }
}

document.body.onload = startGame;
// document.body.onload = startTimer;


function displayCard() {
  this.classList.toggle('open');
  this.classList.toggle('show');
  this.classList.toggle('disabled');
}


function disabled() {
  arrayOfCards.forEach(function (card) {
    card.classList.add('disabled');
  });
}


function enabled() {
  arrayOfCards.forEach(function (card) {
    card.classList.remove('disabled');
  });
  matchedCardsList.forEach(function(card) {
    card.classList.add('disabled');
  });
}


function congrats(){
  if(matchedCardsList.length == arrayOfCards.length){
    // mins = this.mins;
    // secs = this.secs;
    modal.classList.add("show");
    totalTime.innerHTML = time;
    clearInterval(interval);
    // totalTime.innerHTML = mins +' : ' + secs;
  }
  closeIcon.addEventListener("click", closeCongrats);
}


function closeCongrats(){
  window.location.reload(true);
  modal.classList.remove("show");
  startGame();
}


function playAgain(){
  window.body.reload(true);
  modal.classList.remove("show");
  startGame();
}
