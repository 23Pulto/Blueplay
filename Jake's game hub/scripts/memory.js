const symbols = ['🎮', '🎯', '🎨', '🎭', '🎪', '🎬', '🎤', '🎸'];
let cards = [];
let flipped = [];
let matched = 0;
let moves = 0;
let gameActive = true;
let highScore = localStorage.getItem('9-score') || 0;

function initGame() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    
    let deck = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
    cards = deck.map((symbol, idx) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.index = idx;
        card.dataset.symbol = symbol;
        card.textContent = '?';
        card.addEventListener('click', () => flipCard(card));
        gameBoard.appendChild(card);
        return card;
    });
    
    flipped = [];
    matched = 0;
    moves = 0;
    gameActive = true;
    updateStats();
    document.getElementById('highScore').textContent = highScore;
}

function flipCard(card) {
    if (!gameActive || flipped.includes(card) || card.classList.contains('matched')) return;
    
    card.classList.add('flipped');
    card.textContent = card.dataset.symbol;
    flipped.push(card);
    
    if (flipped.length === 2) {
        gameActive = false;
        moves++;
        
        if (flipped[0].dataset.symbol === flipped[1].dataset.symbol) {
            flipped[0].classList.add('matched');
            flipped[1].classList.add('matched');
            matched++;
            flipped = [];
            gameActive = true;
            
            if (matched === symbols.length) {
                setTimeout(() => {
                    const finalMoves = moves;
                    if (finalMoves < (highScore || 100)) {
                        highScore = finalMoves;
                        localStorage.setItem('9-score', highScore);
                    }
                    alert(`Perfect! Completed in ${finalMoves} moves!`);
                }, 300);
            }
        } else {
            setTimeout(() => {
                flipped[0].classList.remove('flipped');
                flipped[1].classList.remove('flipped');
                flipped[0].textContent = '?';
                flipped[1].textContent = '?';
                flipped = [];
                gameActive = true;
            }, 1000);
        }
        
        updateStats();
    }
}

function updateStats() {
    document.getElementById('matches').textContent = matched;
    document.getElementById('moves').textContent = moves;
}

function resetGame() {
    initGame();
}

initGame();