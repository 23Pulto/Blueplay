const WIDTH = 10;
const HEIGHT = 20;
const COLORS = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500'];
const SHAPES = [
    [[1, 1, 1, 1]],
    [[1, 1], [1, 1]],
    [[0, 1, 1], [1, 1, 0]],
    [[1, 1, 0], [0, 1, 1]],
    [[0, 1, 0], [1, 1, 1]],
    [[1, 0, 0], [1, 1, 1]],
    [[0, 0, 1], [1, 1, 1]]
];

let board = Array(HEIGHT).fill(0).map(() => Array(WIDTH).fill(0));
let currentPiece = { shape: SHAPES[0], x: 3, y: 0, color: COLORS[0] };
let score = 0;
let level = 1;
let lines = 0;
let highScore = localStorage.getItem('16-score') || 0;
let gameActive = true;

function renderBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    
    for (let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {
            const block = document.createElement('div');
            block.className = board[y][x] ? 'block' : 'block empty';
            block.style.backgroundColor = board[y][x] || '#111';
            gameBoard.appendChild(block);
        }
    }
}

function canMove(x, y, shape) {
    for (let i = 0; i < shape.length; i++) {
        for (let j = 0; j < shape[i].length; j++) {
            if (shape[i][j]) {
                const newX = x + j;
                const newY = y + i;
                if (newX < 0 || newX >= WIDTH || newY >= HEIGHT || board[newY]?.[newX]) {
                    return false;
                }
            }
        }
    }
    return true;
}

function placePiece() {
    for (let i = 0; i < currentPiece.shape.length; i++) {
        for (let j = 0; j < currentPiece.shape[i].length; j++) {
            if (currentPiece.shape[i][j]) {
                const x = currentPiece.x + j;
                const y = currentPiece.y + i;
                if (y >= 0 && y < HEIGHT && x >= 0 && x < WIDTH) {
                    board[y][x] = currentPiece.color;
                }
            }
        }
    }
    clearLines();
    spawnPiece();
}

function clearLines() {
    let cleared = 0;
    for (let y = HEIGHT - 1; y >= 0; y--) {
        if (board[y].every(cell => cell)) {
            board.splice(y, 1);
            board.unshift(Array(WIDTH).fill(0));
            cleared++;
            y++;
        }
    }
    if (cleared) {
        score += cleared * 100;
        lines += cleared;
        document.getElementById('score').textContent = score;
        document.getElementById('lines').textContent = lines;
    }
}

function spawnPiece() {
    const idx = Math.floor(Math.random() * SHAPES.length);
    currentPiece = {
        shape: SHAPES[idx],
        x: 3,
        y: 0,
        color: COLORS[idx]
    };
    
    if (!canMove(currentPiece.x, currentPiece.y, currentPiece.shape)) {
        gameActive = false;
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('16-score', highScore);
        }
        alert(`Game Over! Score: ${score}`);
        location.reload();
    }
}

function update() {
    if (canMove(currentPiece.x, currentPiece.y + 1, currentPiece.shape)) {
        currentPiece.y++;
    } else {
        placePiece();
    }
    renderBoard();
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && canMove(currentPiece.x - 1, currentPiece.y, currentPiece.shape)) {
        currentPiece.x--;
    }
    if (e.key === 'ArrowRight' && canMove(currentPiece.x + 1, currentPiece.y, currentPiece.shape)) {
        currentPiece.x++;
    }
    if (e.key === ' ') {
        const rotated = currentPiece.shape[0].map((_, i) =>
            currentPiece.shape.map(row => row[i]).reverse()
        );
        if (canMove(currentPiece.x, currentPiece.y, rotated)) {
            currentPiece.shape = rotated;
        }
    }
    if (e.key.toLowerCase() === 's') {
        if (canMove(currentPiece.x, currentPiece.y + 2, currentPiece.shape)) {
            currentPiece.y += 2;
        }
    }
    renderBoard();
});

document.getElementById('highScore').textContent = highScore;
spawnPiece();
renderBoard();
setInterval(() => {
    if (gameActive) update();
}, 500);