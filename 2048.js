let board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
let score = 0;
let best = localStorage.getItem('19-score') || 0;
let gameActive = true;

function initGame() {
    board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    score = 0;
    addNewTile();
    addNewTile();
    renderBoard();
}

function addNewTile() {
    const empty = [];
    board.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (!cell) empty.push({x, y});
        });
    });
    
    if (empty.length) {
        const {x, y} = empty[Math.floor(Math.random() * empty.length)];
        board[y][x] = Math.random() > 0.9 ? 4 : 2;
    }
}

function renderBoard() {
    const boardDiv = document.getElementById('board');
    boardDiv.innerHTML = '';
    
    board.forEach(row => {
        row.forEach(value => {
            const tile = document.createElement('div');
            tile.className = value ? 'tile' : 'tile empty';
            tile.textContent = value || '';
            boardDiv.appendChild(tile);
        });
    });
    
    document.getElementById('score').textContent = score;
}

function move(direction) {
    if (!gameActive) return;
    
    const before = JSON.stringify(board);
    
    if (direction === 'LEFT' || direction === 'RIGHT') {
        board.forEach(row => {
            if (direction === 'RIGHT') row.reverse();
            compressRow(row);
            mergeRow(row);
            compressRow(row);
            if (direction === 'RIGHT') row.reverse();
        });
    } else {
        for (let x = 0; x < 4; x++) {
            const col = board.map(row => row[x]);
            if (direction === 'DOWN') col.reverse();
            compressRow(col);
            mergeRow(col);
            compressRow(col);
            if (direction === 'DOWN') col.reverse();
            board.forEach((row, y) => row[x] = col[y]);
        }
    }
    
    if (before !== JSON.stringify(board)) {
        addNewTile();
        renderBoard();
        
        if (!canMove()) {
            gameActive = false;
            if (score > best) {
                best = score;
                localStorage.setItem('19-score', best);
                document.getElementById('best').textContent = best;
            }
            alert(`Game Over! Score: ${score}`);
        }
    }
}

function compressRow(row) {
    const non = row.filter(v => v);
    const zeros = Array(4 - non.length).fill(0);
    row.splice(0, 4, ...non.concat(zeros));
}

function mergeRow(row) {
    for (let i = 0; i < 3; i++) {
        if (row[i] === row[i+1] && row[i]) {
            row[i] *= 2;
            score += row[i];
            row.splice(i+1, 1);
            row.push(0);
        }
    }
}

function canMove() {
    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
            if (!board[y][x]) return true;
            if (y < 3 && board[y][x] === board[y+1][x]) return true;
            if (x < 3 && board[y][x] === board[y][x+1]) return true;
        }
    }
    return false;
}

function resetGame() {
    initGame();
    gameActive = true;
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') move('LEFT');
    if (e.key === 'ArrowRight') move('RIGHT');
    if (e.key === 'ArrowUp') move('UP');
    if (e.key === 'ArrowDown') move('DOWN');
});

document.getElementById('best').textContent = best;
initGame();