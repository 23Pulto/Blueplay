const emojis = ['🎮', '🎯', '🎨', '🎭', '🎪', '🎬', '🎤', '🎸'];
let cards = [];
let flipped = [];
let matched = 0;
let moves = 0;
let gameActive = true;
let highScore = localStorage.getItem('29-score') || 0;

function initGame() {
    const gameBoard = document.getElementById('board');
    gameBoard.innerHTML = '';
    
    let deck = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    cards = deck.map((emoji, idx) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = '?';
        card.dataset.emoji = emoji;
        card.addEventListener('click', () => flipCard(idx));
        gameBoard.appendChild(card);
        return { element: card, emoji };
    });
    
    flipped = [];
    matched = 0;
    moves = 0;
    gameActive = true;
    updateStats();
    document.getElementById('highScore').textContent = highScore;
}

function flipCard(idx) {
    if (!gameActive || flipped.includes(idx) || cards[idx].element.classList.contains('matched')) return;
    
    cards[idx].element.classList.add('flipped');
    cards[idx].element.innerHTML = cards[idx].emoji;
    flipped.push(idx);
    
    if (flipped.length === 2) {
        gameActive = false;
        moves++;
        
        if (cards[flipped[0]].emoji === cards[flipped[1]].emoji) {
            cards[flipped[0]].element.classList.add('matched');
            cards[flipped[1]].element.classList.add('matched');
            matched++;
            flipped = [];
            gameActive = true;
            
            if (matched === emojis.length) {
                endGame();
            }
        } else {
            setTimeout(() => {
                cards[flipped[0]].element.classList.remove('flipped');
                cards[flipped[1]].element.classList.remove('flipped');
                cards[flipped[0]].element.innerHTML = '?';
                cards[flipped[1]].element.innerHTML = '?';
                flipped = [];
                gameActive = true;
            }, 800);
        }
        
        updateStats();
    }
}

function updateStats() {
    document.getElementById('pairs').textContent = matched;
    document.getElementById('moves').textContent = moves;
}

function endGame() {
    if (moves < (highScore || 100)) {
        highScore = moves;
        localStorage.setItem('29-score', highScore);
        document.getElementById('highScore').textContent = highScore;
    }
    alert(`Perfect! Completed in ${moves} moves!`);
    resetGame();
}

function resetGame() {
    initGame();
}

initGame();