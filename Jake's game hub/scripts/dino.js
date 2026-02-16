const canvas = document.getElementById('dinoCanvas');
const ctx = canvas.getContext('2d');

canvas.width = Math.min(window.innerWidth - 40, 800);
canvas.height = window.innerHeight - 120;

const dino = {
    x: 50,
    y: canvas.height - 80,
    width: 40,
    height: 50,
    vy: 0,
    jumping: false,
    color: '#8B4513'
};

const obstacles = [];
let score = 0;
let distance = 0;
let gameActive = true;
let highScore = localStorage.getItem('15-score') || 0;
let gameSpeed = 5;

function drawDino() {
    ctx.fillStyle = dino.color;
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
    ctx.fillStyle = '#000';
    ctx.fillRect(dino.x + 15, dino.y + 15, 5, 5);
}

function drawObstacles() {
    obstacles.forEach(obs => {
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
    });
}

function update() {
    dino.vy += 0.5;
    dino.y += dino.vy;
    
    if (dino.y + dino.height >= canvas.height - 30) {
        dino.y = canvas.height - 30 - dino.height;
        dino.vy = 0;
        dino.jumping = false;
    }

    obstacles.forEach((obs, idx) => {
        obs.x -= gameSpeed;
        
        if (obs.x + obs.width < 0) {
            obstacles.splice(idx, 1);
            score += 10;
            distance += 10;
            document.getElementById('score').textContent = score;
            document.getElementById('distance').textContent = distance;
        }

        if (dino.x < obs.x + obs.width && dino.x + dino.width > obs.x &&
            dino.y + dino.height > obs.y) {
            gameActive = false;
            endGame();
        }
    });

    gameSpeed += 0.001;
}

function spawnObstacle() {
    if (gameActive) {
        obstacles.push({
            x: canvas.width,
            y: canvas.height - 40,
            width: 30,
            height: 40
        });
    }
}

function endGame() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('15-score', highScore);
        document.getElementById('highScore').textContent = highScore;
    }
    alert(`Game Over! Score: ${score}`);
    location.reload();
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#90EE90';
    ctx.fillRect(0, canvas.height - 30, canvas.width, 30);
    
    if (gameActive) {
        update();
    }
    
    drawObstacles();
    drawDino();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (e) => {
    if (e.key === ' ' && !dino.jumping) {
        dino.vy = -12;
        dino.jumping = true;
    }
});

document.getElementById('highScore').textContent = highScore;
setInterval(spawnObstacle, 2000);
gameLoop();