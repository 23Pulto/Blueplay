const canvas = document.getElementById('flappyCanvas');
const ctx = canvas.getContext('2d');

canvas.width = Math.min(window.innerWidth - 40, 400);
canvas.height = window.innerHeight - 120;

const bird = {
    x: canvas.width / 4,
    y: canvas.height / 2,
    width: 30,
    height: 30,
    velocity: 0,
    color: '#FFD700'
};

const pipes = [];
const gap = 100;
const pipeWidth = 60;
let score = 0;
let gameOver = false;
let highScore = localStorage.getItem('8-score') || 0;

function drawBird() {
    ctx.fillStyle = bird.color;
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
    ctx.fillStyle = '#000';
    ctx.fillRect(bird.x + 10, bird.y + 10, 5, 5);
}

function drawPipes() {
    pipes.forEach(pipe => {
        ctx.fillStyle = '#00aa00';
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
        ctx.fillRect(pipe.x, pipe.bottom, pipeWidth, canvas.height - pipe.bottom);
    });
}

function updateGame() {
    bird.velocity += 0.5;
    bird.y += bird.velocity;

    if (bird.y + bird.height > canvas.height || bird.y < 0) {
        endGame();
    }

    pipes.forEach((pipe, idx) => {
        pipe.x -= 5;
        if (pipe.x + pipeWidth < 0) {
            pipes.splice(idx, 1);
            score++;
            document.getElementById('score').textContent = score;
        }

        if (bird.x < pipe.x + pipeWidth && bird.x + bird.width > pipe.x) {
            if (bird.y < pipe.top || bird.y + bird.height > pipe.bottom) {
                endGame();
            }
        }
    });

    if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 150) {
        const pipeTop = Math.random() * (canvas.height - gap - 50) + 50;
        pipes.push({
            x: canvas.width,
            top: pipeTop,
            bottom: pipeTop + gap
        });
    }
}

function endGame() {
    gameOver = true;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('8-score', highScore);
        document.getElementById('highScore').textContent = highScore;
    }
    alert(`Game Over! Score: ${score}`);
    location.reload();
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (!gameOver) {
        updateGame();
    }
    
    drawPipes();
    drawBird();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('click', () => { bird.velocity = -10; });
document.addEventListener('keypress', (e) => { if (e.key === ' ') bird.velocity = -10; });

document.getElementById('highScore').textContent = highScore;
gameLoop();