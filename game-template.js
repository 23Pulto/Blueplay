let score = 0;
let level = 1;
let highScore = localStorage.getItem('GAME_ID_HERE-score') || 0;

document.getElementById('score').textContent = score;
document.getElementById('highScore').textContent = highScore;

function startGame() {
    if (AudioManager) AudioManager.playClick();
    score = 0;
    level = 1;
    updateDisplay();
    gameActive = true;
    // Start your game mechanics here
}

function updateDisplay() {
    document.getElementById('score').textContent = score;
    document.getElementById('level').textContent = level;
}

function saveScore() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('GAME_ID_HERE-score', highScore);
        document.getElementById('highScore').textContent = highScore;
    }
}

function endGame() {
    saveScore();
    alert(`Game Over!\nScore: ${score}\nHigh Score: ${highScore}`);
    location.reload();
}
