/* Variables declared selecting div and individual spans */
/* These variables select all boxes, text on page, and newgame button */
let div = document.querySelectorAll("div");
let first = document.querySelector("#one");
let second = document.querySelector("#two");
let third = document.querySelector("#three");
let fourth = document.querySelector("#four");
let fifth = document.querySelector("#five");
let sixth = document.querySelector("#six");
let seventh = document.querySelector("#seven");
let eighth = document.querySelector("#eight");
let ninth = document.querySelector("#nine");
let player = document.querySelector("#player");
let game = document.querySelector("#game");
const divSection = document.querySelector("#div-section");
const newGame = document.querySelector("#newGame");

divSection.style.display = "none";

/* Variables declared without expressions that will be used in the various functions to execute the game */

let turn;
let choice = "";
let choiceAlt;
let choiceIndex;
let start;
let ticArray = [];
let gameOver;
let splicePlayer;

/* UserTurn object will allow for creation of a computer and player
to take place and store the user value as well as their mark for the board*/

class UserTurn {
  constructor(user, mark) {
    this.user = user;
    this.mark = mark;
  }
}

/* The two players created from the userturn object */
const userPlayer = new UserTurn("Player", "X");
const userComputer = new UserTurn("Computer", "O");

/* This stores both user objects into an array that will select randomly 
which player starts the game when newGame is clicked */
const playArr = [userPlayer, userComputer];

/* Random function that accepts an array as a variable, this will be used
to determine who starts the game as well as adjusting the ticArray once a user 
or computer select a box */
function randomNumber(ticArray) {
  return Math.floor(Math.random() * ticArray);
}

/* This function creates a random turn at start of game by accepting the playArr
and randomNumber function */
const randomTurn = (playArr, randomNumber) => {
  return playArr[randomNumber].user;
};

/* The randomComputer function accepts the ticArray and randomNumber function as parameters.
When executed the ticArray will inherit a random index as given by the randomNumber function and be
assigned to the choice variable. Then the textcontent of choice which equates to the box at the
random index given in the prior step and will be marked by the computer's given mark. After that
the function assigns the index of choice in the ticArray to choice Index which then is 
spliced out of the ticArray and the ticArray is updated, this allows the computer to avoid duplicating
marks on the board */

function randomComputer(ticArray) {
  if (ticArray.length === 0) {
    return (player.textContent = "Tie");
  }
  choice = ticArray[randomNumber(ticArray.length)];
  choice.textContent = userComputer.mark;
  ticArray.splice(ticArray.indexOf(choice), 1);
  player.textContent = "Player Turn";
  gameFlow();
}

/* playerTurn loops through the ticArray and creates a click event on each box.
Once the user clicks a box the user mark is assigned to it, the splicePlayer variable is
then assigned the index of the box clicked according to the array and then is spliced. */

function playerClick() {
  if (ticArray.indexOf(this) === -1) {
    player.textContent = "Computer turn";
  } else {
    this.textContent = userPlayer.mark;
    ticArray.splice(ticArray.indexOf(this), 1);
    player.textContent = "Computer Turn";
    gameFlow();
  }
}

/* gameFlow function allows the player or computer to mark on the board
and check if they won */
function gameFlow() {
  if (player.textContent === "Player Turn") {
    for (let x of ticArray) {
      x.addEventListener("click", playerClick);
    }
    winner();
  } else if (player.textContent === "Computer Turn") {
    setTimeout(() => {
      randomComputer(ticArray);
    }, 500);
    winner();
  }
}

/* checkWin function is designed to accept is called to check if there is a win.
It will take in 3 different squares as x, y, z and checks if they all equal the same 
text. If this function finds a winner the css and title change. */
function checkWin(x, y, z, user, userName) {
  if (
    x.textContent === user &&
    y.textContent === user &&
    z.textContent === user
  ) {
    game.textContent = `${userName} Wins!!`;
    divSection.style.display = "flex";
    x.classList.add("win");
    y.classList.add("win");
    z.classList.add("win");
    turn = undefined;
    ticArray = [];
    return;
  }
}

/* winner function is called after each player turn to check is there is a winner */
function winner() {
  checkWin(first, second, third, userComputer.mark, userComputer.user);
  checkWin(first, fourth, seventh, userComputer.mark, userComputer.user);
  checkWin(first, fifth, ninth, userComputer.mark, userComputer.user);
  checkWin(second, fifth, eighth, userComputer.mark, userComputer.user);
  checkWin(third, sixth, ninth, userComputer.mark, userComputer.user);
  checkWin(third, fifth, seventh, userComputer.mark, userComputer.user);
  checkWin(fourth, fifth, sixth, userComputer.mark, userComputer.user);
  checkWin(seventh, eighth, ninth, userComputer.mark, userComputer.user);
  checkWin(first, second, third, userPlayer.mark, userPlayer.user);
  checkWin(first, fourth, seventh, userPlayer.mark, userPlayer.user);
  checkWin(first, fifth, ninth, userPlayer.mark, userPlayer.user);
  checkWin(second, fifth, eighth, userPlayer.mark, userPlayer.user);
  checkWin(third, sixth, ninth, userPlayer.mark, userPlayer.user);
  checkWin(third, fifth, seventh, userPlayer.mark, userPlayer.user);
  checkWin(fourth, fifth, sixth, userPlayer.mark, userPlayer.user);
  checkWin(seventh, eighth, ninth, userPlayer.mark, userPlayer.user);
  if (ticArray.length === 0) {
    player.textContent = "Tie";
  }
  return;
}

/* refresh function will reset all arrays and squares to empty */
function refresh(turn) {
  divSection.style.display = "flex";
  ticArray = null;
  turn = null;
  ticArray = [
    first,
    second,
    third,
    fourth,
    fifth,
    sixth,
    seventh,
    eighth,
    ninth,
  ];
  turn = randomTurn(playArr, randomNumber(playArr.length));
  player.textContent = `${turn} Turn`;
  game.textContent = "";
  for (let x of ticArray) {
    x.textContent = "";
    x.classList.remove("win");
  }
  gameFlow(turn);
  return;
}
/* Function for selecting div and changing Player span */

newGame.addEventListener("click", refresh);
