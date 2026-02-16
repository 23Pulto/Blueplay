let score = 0;
let nextNumber = 1;
let timeRemaining = 30;
let highScore = localStorage.getItem('32-score') || 0;
let gameActive = true;

document.getElementById('score').textContent = score;
document.getElementById('highScore').textContent = highScore;

function generateBoard() {
    const board = document.getElementById('numberBoard');
    board.innerHTML = '';
    
    const numbers = [];
    for (let i = 1; i <= 25; i++) {
        numbers.push(i);
    }
    
    // Shuffle
    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    
    numbers.forEach(num => {
        const btn = document.createElement('button');
        btn.className = 'number-btn';
        btn.textContent = num;
        btn.onclick = () => clickNumber(num, btn);
        board.appendChild(btn);
    });
    
    updateDisplay();
}

function clickNumber(num, btn) {
    if (!gameActive) return;
    
    if (num === nextNumber) {
        score += 10;
        nextNumber++;
        document.getElementById('score').textContent = score;
        if (AudioManager) AudioManager.playSuccess();
        generateBoard();
        
        if (nextNumber > 25) {
            finishRound();
        }
    } else {
        if (AudioManager) AudioManager.playError();
        btn.style.background = '#FF3333';
        setTimeout(() => {
            btn.style.background = '';
        }, 200);
    }
    
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('nextNumber').textContent = `Click: ${nextNumber}`;
}

function finishRound() {
    gameActive = false;
    
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('32-score', highScore);
    }
    
    if (AudioManager) AudioManager.playSuccess(1200, 200);
    
    alert(`Congratulations! You completed a round!\nScore: ${score}\nHigh Score: ${highScore}`);
    window.location.href = '../index.html';
}

const timer = setInterval(() => {
    if (!gameActive) {
        clearInterval(timer);
        return;
    }
    
    timeRemaining--;
    document.getElementById('time').textContent = timeRemaining;
    
    if (timeRemaining <= 0) {
        gameActive = false;
        clearInterval(timer);
        
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('32-score', highScore);
        }
        
        alert(`Time's Up!\nScore: ${score}\nHigh Score: ${highScore}`);
        window.location.href = '../index.html';
    }
}, 1000);

generateBoard();
