const WORDS = ['JAVASCRIPT', 'PROGRAMMING', 'COMPUTER', 'ALGORITHM', 'DATABASE', 'KEYBOARD', 'MONITOR', 'INTERNET', 'DEVELOPER', 'SOFTWARE', 'HARDWARE', 'NETWORK', 'SERVER', 'CLIENT', 'BROWSER'];
let words = [];
let currentIndex = 0;
let startTime = 0;
let correctChars = 0;
let totalChars = 0;
let highScore = localStorage.getItem('26-score') || 0;
let gameActive = true;

function initGame() {
    words = WORDS.sort(() => Math.random() - 0.5).slice(0, 10);
    currentIndex = 0;
    correctChars = 0;
    totalChars = 0;
    startTime = Date.now();
    gameActive = true;
    
    renderWords();
    document.getElementById('input').value = '';
    document.getElementById('input').focus();
}

function renderWords() {
    const wordsDiv = document.getElementById('words');
    wordsDiv.innerHTML = words.map((word, idx) => {
        let className = 'word';
        if (idx < currentIndex) className = 'word completed';
        else if (idx === currentIndex) className = 'word current';
        return `<span class="${className}">${word}</span>`;
    }).join('');
}

function updateCar() {
    const progress = currentIndex / words.length * 100;
    document.getElementById('car').style.left = progress + '%';
}

function updateStats() {
    const elapsed = (Date.now() - startTime) / 1000 / 60;
    const wpm = Math.round(currentIndex / elapsed) || 0;
    const accuracy = totalChars > 0 ? Math.round(correctChars / totalChars * 100) : 100;
    
    document.getElementById('wpm').textContent = wpm;
    document.getElementById('accuracy').textContent = accuracy;
    
    return wpm;
}

document.getElementById('input').addEventListener('input', (e) => {
    if (!gameActive) return;
    
    const input = e.target.value.trim();
    const currentWord = words[currentIndex];
    totalChars = input.length;
    correctChars = 0;
    
    for (let i = 0; i < input.length; i++) {
        if (input[i] === currentWord[i]) correctChars++;
    }
    
    if (input === currentWord) {
        currentIndex++;
        e.target.value = '';
        
        if (currentIndex >= words.length) {
            gameActive = false;
            const wpm = updateStats();
            if (wpm > highScore) {
                highScore = wpm;
                localStorage.setItem('26-score', highScore);
                document.getElementById('highScore').textContent = highScore;
            }
            alert(`Race Complete! WPM: ${wpm}`);
            initGame();
        }
        
        renderWords();
        updateCar();
    }
    
    updateStats();
});

function resetGame() {
    initGame();
}

document.getElementById('highScore').textContent = highScore;
initGame();