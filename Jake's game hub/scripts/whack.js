let score = 0;
let timeLeft = 30;
let gameActive = false;
let highScore = localStorage.getItem('10-score') || 0;
let activeMole = null;

function createBoard() {
    const board = document.getElementById('gameBoard');
    board.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const hole = document.createElement('div');
        hole.className = 'moleHole';
        hole.addEventListener('click', () => hitMole(hole));
        board.appendChild(hole);
    }
    document.getElementById('highScore').textContent = highScore;
}

function startGame() {
    score = 0;
    timeLeft = 30;
    gameActive = true;
    document.getElementById('score').textContent = 0;
    document.getElementById('startBtn').disabled = true;
    
    const timer = setInterval(() => {
        timeLeft--;
        document.getElementById('time').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
    
    showMole();
}

function showMole() {
    if (!gameActive) return;
    
    if (activeMole) {
        activeMole.classList.remove('active');
    }
    
    const holes = document.querySelectorAll('.moleHole');
    activeMole = holes[Math.floor(Math.random() * holes.length)];
    activeMole.classList.add('active');
    
    setTimeout(showMole, 1500);
}

function hitMole(hole) {
    if (!gameActive || hole !== activeMole) return;
    
    score++;
    document.getElementById('score').textContent = score;
    hole.classList.remove('active');
    activeMole = null;
}

function endGame() {
    gameActive = false;
    if (activeMole) activeMole.classList.remove('active');
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('10-score', highScore);
        document.getElementById('highScore').textContent = highScore;
    }
    document.getElementById('startBtn').disabled = false;
    alert(`Game Over! Final Score: ${score}`);
}

createBoard();