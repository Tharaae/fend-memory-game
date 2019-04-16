# fend-memory-game
## Google-Udacity Front-end Web Developer Nano Degree - Memory Game Project
**By** _Tharaa Elmorssi_

This project demonstrates how to create an interactive memory game using JS and CSS.
Web Programming with JS - Project 3 - Memory Game. 
You can play the game at [this link](https://raw.githack.com/tharaae/fend-memory-game/master/index.html).

### Game Description:
### -----------------
- The game displays 16 cards whose contents are initially hidden, 8 unique pair of simillar cards.
- Clicking a card flips it displaying its content.
- When a card is flipped while no other card is shown, it remains flipped until another card is clicked.
- When a second card is clicked:
    * If both flipped cards match, they stay flipped and they are not clickable anymore.
    * If both cards do not match, they got hidden to be clicked later in the game.
- Game end when all cards are matched.
- Star rating is adjusted during the game according to the number of moves and number of matched cards.
- There's a Restart button to rest the game. Each time the cards content are randomly shuffled.

### Notes:
### ------
- This project is implemented using pure HTML, CSS and JavaScript. No JS libraries or CSS frameworks are used.
- The game is implemented to be responsive and properly working on most devices.
- The minimum screen width on which the game is tested is 320px.
- Star Rating rules are discribed with the related JS code.

### Future Updates:
### ---------------
- Add Level selection functionality (adding more cards for harder levels)
- Add Theme selection to change the card contents (flags, emogi's, cliparts, etc)
- Add Save game option to save unfinished game to complete later
- Add Top Scores list (save top scores: least number of moves and/or shortest time)
- Add Share functionality (different links/icons to share score on social networks)
