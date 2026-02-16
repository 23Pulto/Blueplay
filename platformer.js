const canvas = document.getElementById('platformerCanvas');
const ctx = canvas.getContext('2d');

canvas.width = Math.min(window.innerWidth - 40, 800);
canvas.height = window.innerHeight - 120;

const player = {
    x: 50,
    y: canvas.height - 100,
    width: 30,
    height: 40,
    velocityY: 0,
    jumping: false,
    color: '#FF0000'
};

const platforms = [
    { x: 0, y: canvas.height - 50, width: canvas.width, height: 50 },
    { x: 200, y: canvas.height - 150, width: 300, height: 20 },
    { x: 550, y: canvas.height - 250, width: 300, height: 20 },
    { x: 300, y: canvas.height - 350, width: 250, height: 20 }
];

const coins = [];
let score = 0;
let level = 1;
let highScore = localStorage.getItem('4-score') || 0;
let gameActive = true;
let keys = {};

function spawnCoins() {
    coins.length = 0;
    platforms.slice(1).forEach(platform => {
        coins.push({
            x: platform.x + platform.width / 2,
            y: platform.y - 30,
            radius: 8
        });
    });
}

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawPlatforms() {
    ctx.fillStyle = '#8B4513';
    platforms.forEach(platform => {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });
}

function drawCoins() {
    ctx.fillStyle = '#FFD700';
    coins.forEach(coin => {
        ctx.beginPath();
        ctx.arc(coin.x, coin.y, coin.radius, 0, Math.PI * 2);
        ctx.fill();
    });
}

function update() {
    if (keys['ArrowLeft'] && player.x > 0) player.x -= 6;
    if (keys['ArrowRight'] && player.x + player.width < canvas.width) player.x += 6;
    
    player.velocityY += 0.6;
    player.y += player.velocityY;
    
    let onPlatform = false;
    platforms.forEach(platform => {
        if (player.velocityY >= 0 &&
            player.y + player.height >= platform.y &&
            player.y + player.height <= platform.y + platform.height + 10 &&
            player.x + player.width > platform.x &&
            player.x < platform.x + platform.width) {
            
            player.velocityY = 0;
            player.y = platform.y - player.height;
            player.jumping = false;
            onPlatform = true;
        }
    });
    
    coins.forEach((coin, idx) => {
        if (Math.hypot(player.x + player.width/2 - coin.x, player.y + player.height/2 - coin.y) < 30) {
            coins.splice(idx, 1);
            score += 10;
            document.getElementById('score').textContent = score;
        }
    });
    
    if (player.y > canvas.height) {
        gameActive = false;
        alert('Game Over!');
        location.reload();
    }
    
    if (coins.length === 0) {
        level++;
        document.getElementById('level').textContent = level;
        spawnCoins();
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (gameActive) {
        update();
    }
    
    drawPlatforms();
    drawCoins();
    drawPlayer();
    
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    if (e.key === ' ' && !player.jumping) {
        player.velocityY = -12;
        player.jumping = true;
    }
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

document.getElementById('highScore').textContent = highScore;
spawnCoins();
gameLoop();