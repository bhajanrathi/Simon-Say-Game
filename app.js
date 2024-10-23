let gameSeq = [];
let userSeq = [];

let btns = ["yellow","blue","red","green"];

let started = false;
let level = 0;
let h2 = document.querySelector("h2");
var score;
var highScore;
highScore = 0;

document.addEventListener("keypress", function() {
    if (started == false)
    {
        started = true;
        addButtonListeners();
        console.log("Game started!");
        levelUp();
    }
})

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("user-flash");
    setTimeout(function() {
        btn.classList.remove("user-flash");
    }, 50);
}

function levelUp() {
    userSeq = [];
    level++;
    score = level-1;
    h2.innerText = `Level ${level}`;

    let randomIndex = Math.floor(Math.random()*4);
    let randomColor = btns[randomIndex];
    let randomBtn = document.querySelector(`.${randomColor}`);
    gameSeq.push(randomColor);
    console.log(gameSeq);
    btnFlash(randomBtn);
}

function checkAns(idx) {
    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length === gameSeq.length) {
            console.log(userSeq);
            setTimeout(levelUp, 1000);
        }
    }
    else {
        if(!(h2.innerText === "Press any key to start the game.")) {
            reset();
        }
    }
}

function btnPress() {
    let btn = this;
    userSeq.push(btn.classList[1]);
    userFlash(btn);
    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");

function addButtonListeners() {
    for (let btn of allBtns) {
        btn.addEventListener("click", btnPress); // Add the event listener back when the game restarts
    }
}

function removeButtonListeners() {
    for (let btn of allBtns) {
        btn.removeEventListener("click", btnPress); // Remove the event listener for each button
    }
}

function reset() {
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function() {
        document.querySelector("body").style.backgroundColor = "rgb(227, 227, 184)";
    }, 100);
    h2.innerHTML = `Game Over! Your score was <b>${score}.</b> <br> Press any key to start! <br>`;
    if (highScore <= score) {
        highScore = score;
        h2.innerText = h2.innerText + "High Score!";
    }
    console.log("Game Over!");
    gameSeq = [];
    userSeq = [];
    started = false;
    level = 0;
    removeButtonListeners();
}