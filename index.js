import "./styles.css";

var holes = document.querySelectorAll(".hole");
var scoreBoard = document.querySelector(".score");
var moles = document.querySelectorAll(".mole");
var lastHole;
var timeUp = false;
var score = 0;
var defaultPlayer = { name: "Player", maxScore: 0, isActive: true };

function randomTime(a, b) {
  return Math.round(Math.random() * (a - b) + b);
}

function randomHoleWhereTheModeWillPopUp(holes) {
  var i = Math.floor(Math.random() * holes.length);
  var h = holes[i];
  if (h === lastHole) return randomHoleWhereTheModeWillPopUp(holes);
  lastHole = h;
  return h;
}

function peep() {
  // peep starts
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

function game(player = defaultPlayer) {
  var name = player.name;
  var maxScore = player.maxScore;
  var isActive = player.isActive;

  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  setTimeout(() => (timeUp = true), 15000);
}

function WACK(e) {
  if (!e.isTrusted) return;
  score++;
  this.parentNode.classList.remove("up");
  scoreBoard.textContent = score;
}

for (var m1 = 0; m1 < moles.length; m1++) {
  moles[m1].addEventListener("click", WACK);
}

window.game = game;
