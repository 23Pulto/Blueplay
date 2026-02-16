let board = Array(42).fill(0);
let playerWins = localStorage.getItem('24-p') || 0;
let aiWins = localStorage.getItem('24-a') || 0;
let currentPlayer = 1;
let gameActive = true;

function renderBoard() {
    const boardDiv = document.getElementById('board');
    boardDiv.innerHTML = '';
    board.forEach((cell, idx) => {
        const div = document.createElement('div');
        div.className = 'cell';
        div.dataset.index = idx;
        if (cell === 1) div.classList.add('red');
        if (cell === 2) div.classList.add('yellow');
        div.addEventListener('click', () => playerMove(idx));
        boardDiv.appendChild(div);
    });
}

function playerMove(idx) {
    if (!gameActive || currentPlayer !== 1) return;
    const col = idx % 7;
    const row = Math.floor(idx / 7);
    
    for (let r = 5; r >= 0; r--) {
        const pos = r * 7 + col;
        if (board[pos] === 0) {
            board[pos] = 1;
            if (checkWin(1)) {
                gameActive = false;
                playerWins++;
                localStorage.setItem('24-p', playerWins);
                alert('You Win!');
                resetGame();
                return;
            }
            currentPlayer = 2;
            document.getElementById('turn').textContent = 'AI';
            renderBoard();
            setTimeout(aiMove, 500);
            return;
        }
    }
}

function aiMove() {
    if (!gameActive) return;
    for (let r = 5; r >= 0; r--) {
        const col = Math.floor(Math.random() * 7);
        const pos = r * 7 + col;
        if (board[pos] === 0) {
            board[pos] = 2;
            if (checkWin(2)) {
                gameActive = false;
                aiWins++;
                localStorage.setItem('24-a', aiWins);
                alert('AI Wins!');
                resetGame();
                return;
            }
            currentPlayer = 1;
            document.getElementById('turn').textContent = 'Player';
            renderBoard();
            return;
        }
    }
}

function checkWin(player) {
    const directions = [[1,0],[0,1],[1,1],[1,-1]];
    for (let i = 0; i < 42; i++) {
        if (board[i] !== player) continue;
        const row = Math.floor(i / 7);
        const col = i % 7;
        
        for (let [dr, dc] of directions) {
            let count = 1;
            for (let step = 1; step < 4; step++) {
                const nr = row + dr * step;
                const nc = col + dc * step;
                if (nr < 0 || nr > 5 || nc < 0 || nc > 6) break;
                if (board[nr * 7 + nc] !== player) break;
                count++;
            }
            if (count === 4) return true;
        }
    }
    return false;
}

function resetGame() {
    board = Array(42).fill(0);
    currentPlayer = 1;
    gameActive = true;
    document.getElementById('playerWins').textContent = playerWins;
    document.getElementById('aiWins').textContent = aiWins;
    document.getElementById('turn').textContent = 'Player';
    renderBoard();
}

renderBoard();