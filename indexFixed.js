import "./styles.css";

let holes = document.querySelectorAll(".hole");
let scoreBoard = document.querySelector(".score");
let moles = document.querySelectorAll(".mole");
let lastHole;
let timeUp = false;
let score = 0;
let defaultPlayer = { name: "Player", maxScore: 0, isActive: true };
const moleUpClassName = "up";

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHolePopUp(holes) {
  const randomIndex = Math.floor(Math.random() * holes.length);
  const hole = holes[randomIndex];
  if (hole === lastHole) {
    return randomHolePopUp(holes);
  }
  lastHole = hole;
  return hole;
}

function peep() {
  const minimal = 500;
  const maximum = 1000;
  const time = randomTime(minimal, maximum);
  const hole = randomHolePopUp(holes);
  hole.classList.add(moleUpClassName); //add the CSS class so selected mole can "pop up"
  setTimeout(() => {
    hole.classList.remove(moleUpClassName);
    if (!timeUp) {
      peep();
    }
  }, time);
}

function startGame(player = defaultPlayer) {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  setTimeout(() => (timeUp = true), 15000);
}

function wack(e) {
  if (!e.isTrusted) return;
  score += 1;
  this.parentNode.classList.remove(moleUpClassName);
  scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener("click", wack));

window.startGame = startGame;
