/*
 * Create a list that holds all of your cards
 */
//an array of 8 possible icons classes
const distinctCardsList = ["fa-gem", "fa-paper-plane", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
//duplicate the 8 icons classes to create a list of all cards contents
let cardsList = distinctCardsList.concat(distinctCardsList);
//Display the cards on the page
displayCards();

// Initialise an empty list of open cards
let openCards = [];
// Initialise valid clicks counter
let validClicks = 0;
// Initialize timer settinigs
let timer = null;
let startTime = 0;
// Initialise matched cards counter
let matchedCount = 0;
// Get stars list
let stars = document.querySelector(".stars").querySelectorAll("li");

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// Get a list of all cards li elements
let cards = document.querySelector(".deck").querySelectorAll("li.card");
// Loop on cards
cards.forEach(function(currentValue, currentIndex, listObj) {
  // set event listener on each card
  currentValue.addEventListener("click", function() {
    // get this elelemnt classes list
    let itemClassList = currentValue.classList;
    // if card is not open
    if (!itemClassList.contains("show") && !itemClassList.contains("match")) {
      // increment moves counter;
      incrementMoves();
      // adjust star rating
      setStarRating();
      // if this is the first valid click, start timer
      if (validClicks === 1) {
        startTime = new Date().getTime();
        timer = setInterval(displayTimer, 1000);
      }
      // show card
      showCard(currentValue);
      // if there's no other open card, add this element to open cards list
      if (openCards.length == 0) {
        openCards.push(currentValue);
      } else { // if there's another open card
        // if open cards matched, set both cards styles as matched
        if (currentValue.querySelector("i").className == openCards[0].querySelector("i").className) {
          matchCard(currentValue);
          // if all cards are matched, end game
          if (matchedCount === 16) {
            endGame();
          }
        } else { //if open cards do not match, close both cards
          closeUnmatchedCards(currentValue);
        }
        // empty open cards list
        openCards.pop();
      }
    }
  });
});

/*
 * set up the event listener to restart the Game
 */
document.getElementById("restart").addEventListener("click", function() {
  // Reset game settinigs
  resetGameSettings();
  // Redisplay the cards
  displayCards();
});

/*
 * Reset game settings to restart
 */
function resetGameSettings() {
  // Empty list of open cards
  if (openCards.length > 0) {
    openCards.pop();
  }

  // Restart valid clicks and moves counter
  validClicks = 0;
  document.getElementById("moves-count").innerHTML = "0";

  // Restart timer settinigs
  clearInterval(timer);
  timer = null;
  startTime = 0;
  document.getElementById("timer").innerHTML = "0:00";

  // Reset matched cards counter
  matchedCount = 0;

  // Reset star rating
  stars.forEach(function(currentValue, currentIndex, listObj) {
    currentValue.className = "";
  });
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function displayCards() {
  //shuffle the cards content list
  shuffle(cardsList);

  //get the li elements that hold the cards
  const cards = document.querySelector(".deck").querySelectorAll("li");

  //loop on cards and set each to an icon class from the array and style it as closed
  cards.forEach(function(currentValue, currentIndex, listObj) {
    currentValue.className = "card";
    currentValue.querySelector("i").className = "fa " + cardsList[currentIndex];
  });
}

/*
 * Shuffle function from http://stackoverflow.com/a/2450976
 */
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/*
 * Counting up the seconds taken to complete the game
 */
function displayTimer() {
  var newTime = new Date().getTime();
  document.getElementById("timer").innerHTML = millisToMinutesAndSeconds(newTime - startTime);
}

/*
 * Show the card content
 */
function showCard(card) {
  card.className = "card open show";
}

/*
 * Mark open cards as matched
 */
function matchCard(card) {
  card.className = "card match";
  openCards[0].className = "card match";
  // increment matched cards counter
  incrementMatched();
}

/*
 * Hide content of unmatched open cards
 */
function closeUnmatchedCards(card) {
  card.className = "card";
  openCards[0].className = "card";
}

/*
 * Update the number of moves
 */
function incrementMoves() {
  validClicks += 1;
  if (validClicks % 2 === 0) {
    document.getElementById("moves-count").innerHTML = validClicks / 2;
  }
}

/*
 * Adjust stars rating according to progress
 */
function setStarRating() {
  if (validClicks >= 12 && validClicks < 24) {
    if (matchedCount < 3) {
      stars[2].className = "hide";
    }
  } else if (validClicks >= 24 && validClicks < 32) {
    if (matchedCount < 6) {
      stars[2].className = "hide";
    } else {
      stars[2].className = "";
    }
    if (matchedCount < 3) {
      stars[1].className = "hide";
    }
  } else if (validClicks >= 32 && validClicks < 48) {
    if (matchedCount < 8) {
      stars[2].className = "hide";
    } else {
      stars[2].className = "";
    }
    if (matchedCount < 5) {
      stars[1].className = "hide";
    } else {
      stars[1].className = "";
    }
  } else if (validClicks >= 48 && validClicks < 54) {
    if (matchedCount < 12) {
      stars[2].className = "hide";
    } else {
      stars[2].className = "";
    }
    if (matchedCount < 8) {
      stars[1].className = "hide";
    } else {
      stars[1].className = "";
    }
  } else if (validClicks >= 54) {
    stars[2].className = "hide";
    stars[1].className = "hide";
  }
}
/*
 * Update the number of matched cards
 */
function incrementMatched() {
  matchedCount += 2;
}

/*
 * Display milliseconds as mm:ss
 * From stackoverflow link: https://stackoverflow.com/questions/21294302
 */
function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

/*
 * End game and show results when all cards are matched
 */
function endGame() {
  clearInterval(timer);
  let winModal = document.getElementById("win-modal");

  document.getElementById("win-stars").innerHTML = "<ul class=\"stars\">"+stars[0].outerHTML+stars[1].outerHTML+stars[2].outerHTML+"</ul>";
  document.getElementById("win-time").innerHTML = document.getElementById("timer").innerHTML;
  document.getElementById("win-moves").innerHTML = document.getElementById("moves-count").innerHTML;

  winModal.style.display = "block";
  // When the user clicks on <span> (x), close the modal
  document.getElementById("close").onclick = function() {
    winModal.style.display = "none";
  }
  // When the user clicks anywhere outside of the modal, close the modal
  window.onclick = function(event) {
    if (event.target == winModal) {
      winModal.style.display = "none";
    }
  }
  // When the user clicks on No (don't want to play again), clost the modal
  document.getElementById("no-play").onclick = function() {
    winModal.style.display = "none";
  }
  // When the user clicks on Yes (want to play again), close the modal and restart a new game
  document.getElementById("yes-play").onclick = function() {
    winModal.style.display = "none";
    // Reset game settinigs
    resetGameSettings();
    // Redisplay the cards
    displayCards();
  }
}
