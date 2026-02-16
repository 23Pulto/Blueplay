const canvas = document.getElementById('asteroidsCanvas');
const ctx = canvas.getContext('2d');

canvas.width = Math.min(window.innerWidth - 40, 700);
canvas.height = window.innerHeight - 120;

const player = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    width: 40,
    height: 40,
    color: '#00aaff'
};

const asteroids = [];
let score = 0;
let survivalTime = 0;
let gameActive = true;
let highScore = localStorage.getItem('20-score') || 0;

function spawnAsteroid() {
    for (let i = 0; i < 2 + Math.floor(survivalTime / 30); i++) {
        asteroids.push({
            x: Math.random() * canvas.width,
            y: Math.random() * (canvas.height / 2),
            vx: (Math.random() - 0.5) * 4,
            vy: Math.random() * 3 + 1,
            radius: Math.random() * 20 + 15,
            color: '#FF8800'
        });
    }
}

function update() {
    asteroids.forEach((ast, idx) => {
        ast.x += ast.vx;
        ast.y += ast.vy;

        if (ast.x - ast.radius > canvas.width) ast.x = -ast.radius;
        if (ast.x + ast.radius < 0) ast.x = canvas.width + ast.radius;
        if (ast.y > canvas.height) ast.y = -ast.radius;

        if (Math.hypot(ast.x - (player.x + player.width/2), ast.y - (player.y + player.height/2)) < ast.radius + player.width/2) {
            gameActive = false;
        }
    });

    score += 1;
    survivalTime = Math.floor(score / 60);
    document.getElementById('score').textContent = score;
    document.getElementById('time').textContent = survivalTime;
}

function draw() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    asteroids.forEach(ast => {
        ctx.fillStyle = ast.color;
        ctx.beginPath();
        ctx.arc(ast.x, ast.y, ast.radius, 0, Math.PI * 2);
        ctx.fill();
    });
}

function endGame() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('20-score', highScore);
        document.getElementById('highScore').textContent = highScore;
    }
    alert(`Game Over! Survival Time: ${survivalTime}s`);
    location.reload();
}

function gameLoop() {
    if (gameActive) {
        update();
    }
    draw();
    
    if (!gameActive) {
        endGame();
    }
    
    requestAnimationFrame(gameLoop);
}

document.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    player.x = e.clientX - rect.left - player.width / 2;
});

document.getElementById('highScore').textContent = highScore;
setInterval(spawnAsteroid, 2000);
spawnAsteroid();
gameLoop();