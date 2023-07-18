var level1 = [
  [1, 0, 1, 0],
  [1, 1, 1, 1],
  [1, 0, 1, 0],
  [1, 0, 1, 1]
];

var pathLevel1 = [
  [1, 0, 0, 0],
  [1, 1, 1, 0],
  [0, 0, 1, 0],
  [0, 0, 1, 1],
];
const pathMoves1 = 7;
//To be read from .json file
// -----------------------------------------------------------------------------------------------------------------------------------
// var jsonData;
// fetch('./db.json').then(res=>res.json()).then(data=>{console.log(data);};
var pathCount = 0;
var levelStatus=0;

let levelsData;
    let currentLevel = 0;
    let mazearray, levelPath, levelMoves, timeLimit;

    async function fetchJSONData() {
      try {
        const response = await fetch('./db.json');
        const jsonData = await response.json();
        levelsData = jsonData.levelsData;
        start.parentNode.removeChild(start);
        loadLevel(currentLevel);
      } catch (error) {
        console.log('Error fetching JSON:', error);
      }
    }

    function loadLevel(levelId) {
      const levelData = levelsData.find((level) => level.id === levelId + 1);
      if (levelData) {
        mazearray = levelData.maze;
        levelPath = levelData.path;
        levelMoves = levelData.moves;
        timeLimit = levelData.timeLimit;
        createMaze();
      } else {
        console.log('Level not found:', levelId + 1);
      }
    }

let start=document.getElementById('start-button');
start.addEventListener('click', fetchJSONData);
var maze = document.getElementById("maze-container");
var rat = document.getElementById("rat");
var cheese = document.getElementById("cheese");
const primeNums = [
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
  73, 79, 83, 89, 97,
];
const nonPrimeNums = [
  0, 1, 4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 24, 25, 26, 27, 28, 30,
  32, 33, 34, 35, 36, 38, 39, 40, 42, 44, 45, 46, 48, 49, 50, 51, 52, 54, 55,
  56, 57, 58, 60, 62, 63, 64, 65, 66, 68, 69, 70, 72, 74, 75, 76, 77, 78, 80,
  81, 82, 84, 85, 86, 87, 88, 90, 91, 92, 93, 94, 95, 96, 98, 99,
];

function createMaze() {
  for (let i = 0; i < mazearray.length; i++) {
    var row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < mazearray[i].length; j++) {
      var cell = document.createElement("div");
      cell.classList.add("cell");

      var val = document.createElement("div");
      val.classList.add("val");
      if (mazearray[i][j] == 0) {
        cell.classList.add("wall");
        const randomNonPrime = Math.floor(Math.random() * 74) + 1;
        val.innerText = `${nonPrimeNums[randomNonPrime]}`;
      } 
      else {
        cell.classList.add("path");
        if (levelPath[i][j] == 1) {
          cell.classList.add("correct");
        }
        const randomPrime = Math.floor(Math.random() * 24) + 1;
        val.innerText = `${primeNums[randomPrime]}`;
      }
      cell.appendChild(val);
      row.appendChild(cell);
    }
    maze.appendChild(row);
  }
  startTimer();
}
// function pathHighlighter() {
  $("#maze-container").on("click", ".wall", function () {
    $(this).css("backgroundColor", "#FF4343");
  });

  $("#maze-container").on("click", ".path", function () {
    $(this).css("backgroundColor", "#F7AF14");
  });
// }

$("#maze-container").on("click", ".correct", function () {
  if(++pathCount>=levelMoves){
    console.log("Congratulations");
    levelStatus=1;
    congratulations();
  }
});

var remainingTime=0, countdownInterval;
function startTimer() {
  remainingTime = timeLimit;
  const timerElement = document.getElementById('timer');
  timerElement.textContent = `Time Remaining: ${remainingTime}s`;
  countdownInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  remainingTime--;
  const timerElement = document.getElementById('timer');
  timerElement.textContent = `Time Remaining: ${remainingTime}s`;

  if (remainingTime <= 0) {
    clearInterval(countdownInterval);
    handleTimeout();
  }
  if(levelStatus==1){
    clearInterval(countdownInterval);
  }
}

function handleTimeout() {
  tryAgain();
}

// function restartLevel() {
//   createMagicSquareGame(jsonData.levels[currentLevel], playerProfile,jsonData); //call your game function over here
//   startTimer();
// }

function congratulations(){
  document.getElementById("congratulations").style.display="flex";
  document.getElementById("container").style.display="none";
}

function tryAgain(){
  document.getElementById("fail").style.display="flex";
  document.getElementById("container").style.display="none";
  // restartLevel();
}