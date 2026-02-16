const WORDS = ['HANGMAN', 'JAVASCRIPT', 'COMPUTER', 'PROGRAMMING', 'INTERNET', 'PASSWORD', 'KEYBOARD', 'MONITOR'];
let word = '';
let guessed = [];
let mistakes = 0;
let wins = 0;
let highScore = localStorage.getItem('23-score') || 0;
let gameActive = true;

function startGame() {
    word = WORDS[Math.floor(Math.random() * WORDS.length)];
    guessed = [];
    mistakes = 0;
    gameActive = true;
    renderGame();
    document.getElementById('mistakes').textContent = mistakes;
}

function renderGame() {
    let display = word.split('').map(letter => guessed.includes(letter) ? letter : '_').join(' ');
    document.getElementById('word').textContent = display;
    
    const lettersDiv = document.getElementById('letters');
    lettersDiv.innerHTML = '';
    
    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        const btn = document.createElement('button');
        btn.className = 'letter-btn';
        btn.textContent = letter;
        btn.disabled = guessed.includes(letter);
        btn.addEventListener('click', () => guessLetter(letter));
        lettersDiv.appendChild(btn);
    }
}

function guessLetter(letter) {
    if (guessed.includes(letter) || !gameActive) return;
    
    guessed.push(letter);
    
    if (!word.includes(letter)) {
        mistakes++;
        document.getElementById('mistakes').textContent = mistakes;
        if (mistakes >= 6) {
            gameActive = false;
            alert(`Game Over! Word was: ${word}`);
            startGame();
        }
    }
    
    if (word.split('').every(l => guessed.includes(l))) {
        gameActive = false;
        wins++;
        document.getElementById('wins').textContent = wins;
        if (wins > highScore) {
            highScore = wins;
            localStorage.setItem('23-score', highScore);
            document.getElementById('highScore').textContent = highScore;
        }
        alert('You Win!');
        startGame();
    }
    
    renderGame();
}

function newGame() {
    startGame();
}

document.getElementById('wins').textContent = wins;
document.getElementById('highScore').textContent = highScore;
startGame();