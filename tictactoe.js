let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let playerWins = localStorage.getItem('18-p') || 0;
let aiWins = localStorage.getItem('18-a') || 0;
let draws = localStorage.getItem('18-d') || 0;
const WINNING_COMBOS = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

function initBoard() {
    const boardDiv = document.getElementById('board');
    boardDiv.innerHTML = '';
    board.forEach((_, idx) => {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.textContent = board[idx];
        cell.addEventListener('click', () => playerMove(idx));
        boardDiv.appendChild(cell);
    });
}

function playerMove(idx) {
    if (!gameActive || board[idx]) return;
    board[idx] = 'X';
    currentPlayer = 'O';
    updateBoard();
    
    if (checkWinner('X')) {
        endGame('You Win!');
        playerWins++;
        localStorage.setItem('18-p', playerWins);
    } else if (board.every(cell => cell)) {
        endGame('Draw!');
        draws++;
        localStorage.setItem('18-d', draws);
    } else {
        setTimeout(aiMove, 500);
    }
}

function aiMove() {
    let bestScore = -Infinity;
    let bestMove = 0;
    
    board.forEach((_, idx) => {
        if (!board[idx]) {
            board[idx] = 'O';
            const score = minimax(board, 0, false);
            board[idx] = '';
            if (score > bestScore) {
                bestScore = score;
                bestMove = idx;
            }
        }
    });
    
    board[bestMove] = 'O';
    currentPlayer = 'X';
    updateBoard();
    
    if (checkWinner('O')) {
        endGame('AI Wins!');
        aiWins++;
        localStorage.setItem('18-a', aiWins);
    } else if (board.every(cell => cell)) {
        endGame('Draw!');
        draws++;
        localStorage.setItem('18-d', draws);
    }
}

function minimax(b, depth, isMax) {
    if (checkWinner('O')) return 10 - depth;
    if (checkWinner('X')) return depth - 10;
    if (b.every(cell => cell)) return 0;
    
    if (isMax) {
        let best = -Infinity;
        b.forEach((_, idx) => {
            if (!b[idx]) {
                b[idx] = 'O';
                best = Math.max(best, minimax(b, depth + 1, false));
                b[idx] = '';
            }
        });
        return best;
    } else {
        let best = Infinity;
        b.forEach((_, idx) => {
            if (!b[idx]) {
                b[idx] = 'X';
                best = Math.min(best, minimax(b, depth + 1, true));
                b[idx] = '';
            }
        });
        return best;
    }
}

function checkWinner(player) {
    return WINNING_COMBOS.some(combo => combo.every(idx => board[idx] === player));
}

function updateBoard() {
    initBoard();
    document.getElementById('status').textContent = currentPlayer === 'X' ? 'Your turn (X)' : 'AI thinking...';
}

function endGame(message) {
    gameActive = false;
    document.getElementById('status').textContent = message;
    document.getElementById('playerWins').textContent = playerWins;
    document.getElementById('aiWins').textContent = aiWins;
    document.getElementById('draws').textContent = draws;
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    document.getElementById('status').textContent = 'Your turn (X)';
    initBoard();
}

initBoard();
document.getElementById('playerWins').textContent = playerWins;
document.getElementById('aiWins').textContent = aiWins;
document.getElementById('draws').textContent = draws;