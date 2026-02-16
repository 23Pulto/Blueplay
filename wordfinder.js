const WORDS = ['GAME', 'CODE', 'PIXEL', 'CYBER', 'LOGIC'];
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let grid = [];
let foundWords = [];
let score = 0;
let highScore = localStorage.getItem('22-score') || 0;

function initGame() {
    grid = Array(64).fill(0).map(() => LETTERS[Math.floor(Math.random() * LETTERS.length)]);
    
    WORDS.forEach(word => {
        let placed = false;
        let attempts = 0;
        while (!placed && attempts < 100) {
            const idx = Math.floor(Math.random() * grid.length);
            const row = Math.floor(idx / 8);
            const col = idx % 8;
            
            if (word.length + col <= 8) {
                let canPlace = true;
                for (let i = 0; i < word.length; i++) {
                    grid[idx + i] = word[i];
                }
                placed = true;
            }
            attempts++;
        }
    });
    
    foundWords = [];
    score = 0;
    renderBoard();
    document.getElementById('found').textContent = 0;
    document.getElementById('score').textContent = 0;
    document.getElementById('words').textContent = WORDS.join(' • ');
}

function renderBoard() {
    const board = document.getElementById('board');
    board.innerHTML = '';
    
    grid.forEach((letter, idx) => {
        const tile = document.createElement('div');
        tile.className = 'letter';
        tile.textContent = letter;
        
        const found = WORDS.some(word => {
            return foundWords.includes(word) && checkWord(idx, word);
        });
        
        if (found) tile.classList.add('found');
        board.appendChild(tile);
    });
}

function checkWord(startIdx, word) {
    for (let i = 0; i < word.length; i++) {
        if (grid[startIdx + i] !== word[i]) return false;
    }
    return true;
}

function resetGame() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('22-score', highScore);
        document.getElementById('highScore').textContent = highScore;
    }
    initGame();
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('letter') && !foundWords.length === 5) {
        WORDS.forEach(word => {
            if (!foundWords.includes(word)) {
                const idx = Array.from(document.querySelectorAll('.letter')).indexOf(e.target);
                if (checkWord(idx, word)) {
                    foundWords.push(word);
                    score += word.length * 10;
                    document.getElementById('score').textContent = score;
                    document.getElementById('found').textContent = foundWords.length;
                    renderBoard();
                }
            }
        });
    }
});

document.getElementById('highScore').textContent = highScore;
initGame();