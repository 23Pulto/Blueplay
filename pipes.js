const pipes = ['┌', '└', '┘', '┐', '─', '│'];
let grid = [];
let score = 0;
let moves = 0;
let highScore = localStorage.getItem('21-score') || 0;

function initGame() {
    grid = Array(16).fill(0).map(() => ({
        pipe: pipes[Math.floor(Math.random() * pipes.length)],
        rotation: Math.floor(Math.random() * 4) * 90
    }));
    score = 0;
    moves = 0;
    renderBoard();
    document.getElementById('score').textContent = 0;
    document.getElementById('moves').textContent = 0;
}

function renderBoard() {
    const board = document.getElementById('board');
    board.innerHTML = '';
    
    grid.forEach((cell, idx) => {
        const tile = document.createElement('div');
        tile.className = 'pipe';
        tile.textContent = cell.pipe;
        tile.style.transform = `rotate(${cell.rotation}deg)`;
        tile.addEventListener('click', () => rotatePipe(idx));
        board.appendChild(tile);
    });
    
    document.getElementById('highScore').textContent = highScore;
}

function rotatePipe(idx) {
    grid[idx].rotation = (grid[idx].rotation + 90) % 360;
    moves++;
    score += 5;
    document.getElementById('score').textContent = score;
    document.getElementById('moves').textContent = moves;
    renderBoard();
}

function resetGame() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('21-score', highScore);
    }
    initGame();
}

initGame();