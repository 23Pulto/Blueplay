const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080'];
let tiles = [];
let score = 0;
let moves = 0;
let highScore = localStorage.getItem('11-score') || 0;

function initGame() {
    const board = document.getElementById('gameBoard');
    board.innerHTML = '';
    
    const shuffled = colors.sort(() => Math.random() - 0.5);
    tiles = shuffled.map((color, idx) => {
        const tile = document.createElement('div');
        tile.className = 'tile';
        tile.style.backgroundColor = color;
        tile.dataset.color = color;
        tile.addEventListener('click', () => selectTile(tile));
        board.appendChild(tile);
        return tile;
    });
    
    score = 0;
    moves = 0;
    document.getElementById('score').textContent = 0;
    document.getElementById('moves').textContent = 0;
    document.getElementById('highScore').textContent = highScore;
}

function selectTile(tile) {
    const selected = document.querySelectorAll('.tile[style*="opacity"]');
    if (selected.length > 0) {
        if (tile.dataset.color === selected[0].dataset.color) {
            tile.style.opacity = '0.3';
            selected[0].style.pointerEvents = 'none';
            tile.style.pointerEvents = 'none';
            score += 10;
            document.getElementById('score').textContent = score;
        }
    } else {
        tile.style.opacity = '0.3';
    }
    moves++;
    document.getElementById('moves').textContent = moves;
}

function resetGame() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('11-score', highScore);
    }
    initGame();
}

initGame();