const canvas = document.getElementById('invadersCanvas');
const ctx = canvas.getContext('2d');

canvas.width = Math.min(window.innerWidth - 40, 600);
canvas.height = window.innerHeight - 120;

const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 40,
    width: 50,
    height: 30,
    speed: 6,
    color: '#00aaff'
};

const bullets = [];
const enemies = [];
let score = 0;
let wave = 1;
let highScore = localStorage.getItem('13-score') || 0;
let gameOver = false;

function spawnEnemies() {
    for (let i = 0; i < 3 + wave; i++) {
        enemies.push({
            x: Math.random() * (canvas.width - 40),
            y: Math.random() * 80 + 20,
            width: 40,
            height: 30,
            speed: 1 + wave * 0.5,
            color: '#FF0000'
        });
    }
}

function update() {
    enemies.forEach((e, idx) => {
        e.x += e.speed;
        if (e.x > canvas.width) e.x = -e.width;
        e.y += Math.sin(e.x / 50) * 0.5;

        if (e.y + e.height > player.y && e.x < player.x + player.width &&
            e.x + e.width > player.x && e.y < player.y + player.height) {
            gameOver = true;
        }

        bullets.forEach((b, bIdx) => {
            if (b.x < e.x + e.width && b.x + b.width > e.x && 
                b.y < e.y + e.height && b.y + b.height > e.y) {
                enemies.splice(idx, 1);
                bullets.splice(bIdx, 1);
                score += 100;
                document.getElementById('score').textContent = score;
            }
        });
    });

    if (enemies.length === 0) {
        wave++;
        document.getElementById('wave').textContent = wave;
        spawnEnemies();
    }

    bullets.forEach((b, idx) => {
        b.y -= b.speed;
        if (b.y < 0) bullets.splice(idx, 1);
    });
}

function draw() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    ctx.fillStyle = '#00FF00';
    enemies.forEach(e => {
        ctx.fillRect(e.x, e.y, e.width, e.height);
    });

    ctx.fillStyle = '#FFFF00';
    bullets.forEach(b => {
        ctx.fillRect(b.x, b.y, b.width, b.height);
    });
}

function gameLoop() {
    if (!gameOver) {
        update();
        draw();
    } else {
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('13-score', highScore);
        }
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#FF0000';
        ctx.font = '40px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
    }
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && player.x > 0) player.x -= player.speed;
    if (e.key === 'ArrowRight' && player.x + player.width < canvas.width) player.x += player.speed;
    if (e.key === ' ') {
        bullets.push({
            x: player.x + player.width / 2 - 5,
            y: player.y,
            width: 10,
            height: 20,
            speed: 8
        });
    }
});

document.getElementById('highScore').textContent = highScore;
spawnEnemies();
gameLoop();