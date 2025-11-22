/*-------------------------------- Constants --------------------------------*/
// calling canvis , rendering 2d context 
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const gravity = 0.5;
const jumping = -8;
/*-------------------------------- Variables --------------------------------*/
//character 
let cat = {
    x: 60,
    y: 190,
    width: 30,
    height: 30,
    dy: 0
};

let running = false;
let gameOver = false;
let score = 0;
/*------------------------ Cached Element References ------------------------*/
const homeScreen = document.querySelector('#homeScreen');
const gameScreen = document.querySelector('#gameScreen');
const startBtnEl = document.querySelector('#start');
const gameOverBox = document.querySelector('#gameOverBox');
const gameOverMessageEl = document.querySelector('#gameOverMessage');
const playAgainBtnEl = document.querySelector('#play-again');
const clickMessageEl = document.querySelector('#click-message')
/*-------------------------------- Functions --------------------------------*/
function showGameOver() {
    gameOverBox.style.display = 'block';
}

function hideGameOver() {
    gameOverBox.style.display = 'none';
}
function showClickMessage() {
    clickMessageEl.style.display = 'block';
}

function hideClickMessage() {
    clickMessageEl.style.display = 'none';
}

function drawCat() {
    ctx.fillStyle = 'purple';
    ctx.fillRect(cat.x, cat.y, cat.width, cat.height);
}


function jump() {
    if (running) cat.dy = jumping;
}

function updateCat() {
    cat.dy += gravity;
    cat.y += cat.dy;

    if (cat.y <= 0) {
        cat.y = 0;
        cat.dy = 0;
        gameOver = true;
        running = false;
        showGameOver();
    }

    if (cat.y + cat.height > canvas.height) {
        cat.y = canvas.height - cat.height;
        cat.dy = 0;
        gameOver = true;
        running = false;
        showGameOver();

    }

}




function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (running) {
        updateCat();
        drawCat();
        requestAnimationFrame(gameLoop);

    }
    else if (gameOver) {
        drawCat();
    }
};

/*----------------------------- Event Listeners -----------------------------*/

startBtnEl.addEventListener('click', () => {
    startBtnEl.style.display = 'none';
    homeScreen.style.display = 'none';
    gameScreen.style.display = 'flex';
    clickMessageEl.style.display = 'block'; // show overlay message
});

clickMessageEl.addEventListener('click', () => {
    hideClickMessage();
    cat.y = 190;
    cat.dy = 0;
    gameOver = false;
    running = true;
    gameLoop();
});

playAgainBtnEl.addEventListener('click', () => {
    if (gameOver) {
        cat.y = 190;
        cat.dy = 0;
        score = 0;
        hideGameOver();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        gameScreen.style.display = "none";
        homeScreen.style.display = "flex";
        startBtnEl.style.display = 'block';
        gameOver = false;
        running = false;
    }
})


document.addEventListener('keydown', (e) => {
    if (e.code === "Space" && clickMessageEl.style.display === 'block') {
        clickMessageEl.click();
    } else if (running) {
        jump();
    }
});


document.addEventListener('mousedown', (e) => {
    if (running) jump();
});
