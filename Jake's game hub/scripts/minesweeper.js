const WIDTH = 10;
const HEIGHT = 10;
const MINES = 10;
let board = [];
let revealed = [];
let flagged = [];
let revealed_count = 0;
let gameActive = true;
let highScore = localStorage.getItem('25-score') || 0;

function initBoard() {
    board = Array(SIZE).fill(0);
    revealed = Array(SIZE).fill(false);
    flagged = Array(SIZE).fill(false);
    revealed_count = 0;
    gameActive = true;
    
    for (let i = 0; i < MINES; i++) {
        let idx;
        do {
            idx = Math.floor(Math.random() * WIDTH * HEIGHT);
        } while (board[idx] === -1);
        board[idx] = -1;
    }
    
    for (let i = 0; i < board.length; i++) {
        if (board[i] !== -1) {
            const row = Math.floor(i / WIDTH);
            const col = i % WIDTH;
            let count = 0;
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    const nr = row + dr;
                    const nc = col + dc;
                    if (nr >= 0 && nr < HEIGHT && nc >= 0 && nc < WIDTH) {
                        if (board[nr * WIDTH + nc] === -1) count++;
                    }
                }
            }
            board[i] = count;
        }
    }
    
    renderBoard();
}

const SIZE = WIDTH * HEIGHT;

function renderBoard() {
    const boardDiv = document.getElementById('board');
    boardDiv.innerHTML = '';
    
    for (let i = 0; i < SIZE; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        
        if (revealed[i]) {
            cell.classList.add('revealed');
            if (board[i] === -1) {
                cell.classList.add('mine');
                cell.textContent = '💣';
            } else if (board[i] > 0) {
                cell.textContent = board[i];
                cell.style.color = ['#0000FF', '#008000', '#FF0000', '#000080', '#800000', '#008080', '#000000', '#808080'][board[i] - 1] || '#000';
            }
        } else if (flagged[i]) {
            cell.textContent = '🚩';
        }
        
        cell.addEventListener('click', () => revealCell(i));
        cell.addEventListener('contextmenu', (e) => { e.preventDefault(); flagCell(i); });
        boardDiv.appendChild(cell);
    }
    
    document.getElementById('flags').textContent = MINES - flagged.filter(Boolean).length;
    document.getElementById('revealed').textContent = revealed_count;
}

function revealCell(idx) {
    if (!gameActive || revealed[idx] || flagged[idx]) return;
    
    revealed[idx] = true;
    revealed_count++;
    
    if (board[idx] === -1) {
        gameActive = false;
        alert('Game Over! You hit a mine!');
        revealMines();
        renderBoard();
        return;
    }
    
    if (board[idx] === 0) {
        const row = Math.floor(idx / WIDTH);
        const col = idx % WIDTH;
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                const nr = row + dr;
                const nc = col + dc;
                if (nr >= 0 && nr < HEIGHT && nc >= 0 && nc < WIDTH) {
                    const nidx = nr * WIDTH + nc;
                    if (!revealed[nidx]) revealCell(nidx);
                }
            }
        }
    }
    
    if (revealed.filter(Boolean).length === SIZE - MINES) {
        gameActive = false;
        if (revealed_count > highScore) {
            highScore = revealed_count;
            localStorage.setItem('25-score', highScore);
        }
        alert('You Win!');
        renderBoard();
    } else {
        renderBoard();
    }
}

function flagCell(idx) {
    if (!gameActive || revealed[idx]) return;
    flagged[idx] = !flagged[idx];
    renderBoard();
}

function revealMines() {
    board.forEach((val, idx) => {
        if (val === -1) revealed[idx] = true;
    });
}

function resetGame() {
    initBoard();
}

document.getElementById('highScore').textContent = highScore;
initBoard();