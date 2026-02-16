let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
let gameActive = true;
let score = 0;
let maxHeight = 0;
let highScore = localStorage.getItem('35-score') || 0;

document.getElementById('highScore').textContent = highScore;

// Responsive canvas
function resizeCanvas() {
    canvas.width = Math.min(window.innerWidth - 40, 400);
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Player
let player = {
    x: canvas.width / 2,
    y: canvas.height - 60,
    width: 30,
    height: 30,
    vy: 0,
    speed: 6
};

let gravity = 0.5;
let platforms = [];
let keys = {};
let cameraY = 0;

// Input
document.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;
});
document.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
});

// Generate platforms
function createPlatforms() {
    platforms = [];
    for (let i = 0; i < 30; i++) {
        platforms.push({
            x: Math.random() * (canvas.width - 60),
            y: canvas.height - i * 80 - 60,
            width: 60,
            height: 15
        });
    }
}
createPlatforms();

function update() {
    // Movement
    if (keys['arrowleft'] || keys['a']) player.x = Math.max(0, player.x - player.speed);
    if (keys['arrowright'] || keys['d']) player.x = Math.min(canvas.width - player.width, player.x + player.speed);

    // Gravity
    player.vy += gravity;
    player.y += player.vy;

    // Platform collision
    platforms.forEach(plat => {
        if (player.vy > 0 && player.y + player.height >= plat.y &&
            player.y + player.height <= plat.y + plat.height + 10 &&
            player.x + player.width > plat.x && player.x < plat.x + plat.width) {
            player.vy = -15;
            score += 10;
            const currentHeight = Math.max(0, canvas.height - player.y);
            maxHeight = Math.max(maxHeight, currentHeight);
            document.getElementById('score').textContent = score;
            document.getElementById('height').textContent = Math.floor(maxHeight / 10);
            if (AudioManager) AudioManager.playSuccess();
        }
    });

    // Game over
    if (player.y > canvas.height) {
        gameActive = false;
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('35-score', highScore);
        }
        alert('Game Over!\\nScore: ' + score + '\\nBest: ' + highScore);
        location.reload();
    }

    // Camera follow
    cameraY = player.y - 200;

    // Regenerate platforms
    if (Math.max(...platforms.map(p => p.y)) < cameraY) {
        createPlatforms();
        platforms.forEach(p => p.y += cameraY);
    }
}

function draw() {
    ctx.fillStyle = 'linear-gradient(180deg, #1a3a4a, #0a0a0a)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw platforms relative to camera
    platforms.forEach(plat => {
        let screenY = plat.y - cameraY;
        if (screenY > -50 && screenY < canvas.height) {
            ctx.fillStyle = 'linear-gradient(135deg, #00ff88, #00aa55)';
            ctx.fillRect(plat.x, screenY, plat.width, plat.height);
            ctx.strokeStyle = '#00ff88';
            ctx.lineWidth = 2;
            ctx.strokeRect(plat.x, screenY, plat.width, plat.height);
        }
    });

    // Draw player
    let playerScreenY = player.y - cameraY;
    ctx.fillStyle = '#ffaa00';
    ctx.fillRect(player.x, playerScreenY, player.width, player.height);
    ctx.shadowColor = '#ffaa00';
    ctx.shadowBlur = 10;
    ctx.strokeStyle = '#ffaa00';
    ctx.lineWidth = 2;
    ctx.strokeRect(player.x, playerScreenY, player.width, player.height);
    ctx.shadowBlur = 0;
}

function gameLoop() {
    if (!gameActive) return;
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
