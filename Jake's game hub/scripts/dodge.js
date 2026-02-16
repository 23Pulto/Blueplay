const canvas = document.getElementById("dodgeCanvas");
const ctx = canvas.getContext("2d");

canvas.width = Math.min(window.innerWidth - 40, 700);
canvas.height = Math.min(window.innerHeight - 200, 600);

let player = {
    x: canvas.width / 2,
    y: canvas.height - 40,
    width: 30,
    height: 30,
    speed: 5,
    color: '#00FF00'
};

let obstacles = [];
let score = 0;
let time = 0;
let highScore = localStorage.getItem('31-score') || 0;
let gameActive = true;
let lastObstacleTime = 0;
let spawnRate = 1000;
let lastFrameTime = Date.now();

document.getElementById('score').textContent = score;
document.getElementById('highScore').textContent = highScore;

const keys = {};
document.addEventListener('keydown', (e) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',  'w', 'a', 's', 'd'].includes(e.key)) {
        e.preventDefault();
    }
    keys[e.key.toLowerCase()] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
});

function update() {
    if (!gameActive) return;
    
    const now = Date.now();
    const deltaTime = (now - lastFrameTime) / 1000;
    lastFrameTime = now;
    
    time += deltaTime;
    document.getElementById('time').textContent = Math.floor(time);

    // Player movement
    if (keys['arrowleft'] || keys['a']) player.x = Math.max(0, player.x - player.speed);
    if (keys['arrowright'] || keys['d']) player.x = Math.min(canvas.width - player.width, player.x + player.speed);
    if (keys['arrowup'] || keys['w']) player.y = Math.max(0, player.y - player.speed);
    if (keys['arrowdown'] || keys['s']) player.y = Math.min(canvas.height - player.height, player.y + player.speed);

    // Spawn obstacles
    if (now - lastObstacleTime > spawnRate) {
        obstacles.push({
            x: Math.random() * (canvas.width - 30),
            y: -30,
            width: 30,
            height: 30,
            speed: 3 + (Math.floor(time) * 0.2)
        });
        lastObstacleTime = now;
        spawnRate = Math.max(500, 1000 - Math.floor(time) * 20);
    }

    // Update obstacles
    obstacles = obstacles.filter(obs => {
        obs.y += obs.speed;
        
        // Check collision
        if (obs.x < player.x + player.width &&
            obs.x + obs.width > player.x &&
            obs.y < player.y + player.height &&
            obs.y + obs.height > player.y) {
            gameActive = false;
            if (AudioManager) AudioManager.playError();
            return false;
        }
        
        return obs.y < canvas.height;
    });

    // Increase score over time
    score = Math.floor(time * 10);
    document.getElementById('score').textContent = score;
}

function draw() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.fillStyle = player.color;
    ctx.shadowColor = 'rgba(0, 255, 0, 0.6)';
    ctx.shadowBlur = 10;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.shadowBlur = 0;

    // Draw obstacles
    ctx.fillStyle = '#FF3333';
    ctx.shadowColor = 'rgba(255, 51, 51, 0.6)';
    ctx.shadowBlur = 8;
    obstacles.forEach(obs => {
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
    });
    ctx.shadowBlur = 0;

    // Draw info
    ctx.fillStyle = '#00aaff';
    ctx.font = '14px Arial';
    ctx.fillText(`Survived: ${Math.floor(time)}s`, 20, 30);
}

function gameLoop() {
    update();
    draw();
    
    if (!gameActive) {
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('31-score', highScore);
        }
        alert(`Game Over!\nScore: ${score}\nSurvived: ${Math.floor(time)}s\nHigh Score: ${highScore}`);
        window.location.href = '../index.html';
    }
    
    requestAnimationFrame(gameLoop);
}

gameLoop();
