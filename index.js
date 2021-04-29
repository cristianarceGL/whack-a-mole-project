import "./styles.css";

//“It is not enough for code to work.”
//― Robert C.Martin, Clean Code: A Handbook of Agile Software Craftsmanship

// 0. use of "strict" mode

// 1. use of "var", should be "const" and "let" instead
var holes = document.querySelectorAll(".hole");
var scoreBoard = document.querySelector(".score");
var moles = document.querySelectorAll(".mole");
var lastHole;
var timeUp = false;
var score = 0;
var defaultPlayer = { name: "Player", maxScore: 0, isActive: true };

// 2. no meaningful names for arguments
function randomTime(a, b) {
  return Math.round(Math.random() * (a - b) + b);
}

// 3. Long naming for a function(no meaningful)
//“You should name a variable using the same care with which you name a first - born child.”
//― Robert C.Martin, Clean Code: A Handbook of Agile Software Craftsmanship
function randomHoleWhereTheModeWillPopUp(holes) {
  // 4. what are "i" and "h"?, avoid one-letter variable name
  var i = Math.floor(Math.random() * holes.length);
  var h = holes[i];
  if (h === lastHole) return randomHoleWhereTheModeWillPopUp(holes);
  lastHole = h;
  return h;
}

// 5. use of comments
// "While comments are neiteher inherently good or bad,
// they are usually created as a crutch
// You should always write your code as if comments didnt exist.
// This forces you to write your cide un the simpliest, plainest,
// most self-documenting way you can humanly come up with." - Jeff Atwood
function peep() {
  // peep starts
  //“The proper use of comments is to compensate for our failure to express ourself in code.Note that I used the word failure.I meant it.Comments are always failures.”
  //― Robert C.Martin, Clean Code: A Handbook of Agile Software Craftsmanship

  // 6. using magic numbers
  var time = randomTime(500, 1000); //get a random time
  var hole = randomHoleWhereTheModeWillPopUp(holes); //get the random hole from the randomHole function
  hole.classList.add("up"); //add the CSS class so selected mole can "pop up"
  setTimeout(() => {
    // add a timeout for removing the class for popping up moles
    hole.classList.remove("up"); //make the selected mole "pop down" after a random time
    if (!timeUp) {
      // if time is no over, keep invoking moles
      peep(); //calls recursively the peep
    }
  }, time); // peep ends
}

// 7. "game" what?, no verb at the beginning
function game(player = defaultPlayer) {
  // 8. use of const instead of 1 line const
  var name = player.name;
  var maxScore = player.maxScore;
  var isActive = player.isActive;

  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  // 9. using magic numbers
  setTimeout(() => (timeUp = true), 15000);
}

// 10. use of uppercase in a function name
function WACK(e) {
  if (!e.isTrusted) return;
  score++;
  this.parentNode.classList.remove("up");
  scoreBoard.textContent = score;
}

// 11. use of "for" instead of "forEach"
for (var m1 = 0; m1 < moles.length; m1++) {
  moles[m1].addEventListener("click", WACK);
}

window.game = game;
