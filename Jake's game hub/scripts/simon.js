let sequence = [];
let playerSequence = [];
let level = 1;
let highScore = localStorage.getItem('17-score') || 1;
let gameActive = false;
const colors = ['red', 'blue', 'green', 'yellow'];

function startGame() {
    sequence = [];
    playerSequence = [];
    level = 1;
    gameActive = true;
    addToSequence();
    document.getElementById('level').textContent = level;
    document.getElementById('startBtn').disabled = true;
    playSequence();
}

function addToSequence() {
    const randomColor = colors[Math.floor(Math.random() * 4)];
    sequence.push(randomColor);
    document.getElementById('sequence').textContent = sequence.length;
}

function playSequence() {
    playerSequence = [];
    sequence.forEach((color, idx) => {
        setTimeout(() => {
            flashColor(color);
        }, (idx + 1) * 600);
    });
}

function flashColor(color) {
    const pad = document.querySelector(`.color-pad.${color}`);
    pad.classList.add('active');
    playSound(color);
    setTimeout(() => {
        pad.classList.remove('active');
    }, 300);
}

function playSound(color) {
    const freq = { red: 261.63, blue: 349.23, green: 392.00, yellow: 523.25 };
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.frequency.value = freq[color];
    gain.gain.setValueAtTime(0.1, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    osc.start(audioContext.currentTime);
    osc.stop(audioContext.currentTime + 0.2);
}

function checkColor(color) {
    if (!gameActive) return;
    
    playerSequence.push(color);
    flashColor(color);
    
    const idx = playerSequence.length - 1;
    if (playerSequence[idx] !== sequence[idx]) {
        gameOver();
        return;
    }
    
    if (playerSequence.length === sequence.length) {
        setTimeout(() => {
            level++;
            document.getElementById('level').textContent = level;
            addToSequence();
            playSequence();
        }, 1000);
    }
}

function gameOver() {
    gameActive = false;
    if (level > highScore) {
        highScore = level;
        localStorage.setItem('17-score', highScore);
        document.getElementById('highScore').textContent = highScore;
    }
    document.getElementById('messages').textContent = `Game Over! Reached Level ${level}`;
    document.getElementById('startBtn').disabled = false;
}

document.querySelectorAll('.color-pad').forEach(pad => {
    pad.addEventListener('click', () => {
        if (gameActive) {
            checkColor(pad.dataset.color);
        }
    });
});

document.getElementById('highScore').textContent = highScore;