let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
let score = 0;
let wave = 1;
let highScore = localStorage.getItem('37-score') || 0;
document.getElementById('highScore').textContent = highScore;

function resizeCanvas() {
    canvas.width = Math.min(window.innerWidth - 40, 600);
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let player = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    width: 40,
    height: 15,
    speed: 6,
    bullets: []
};

let enemies = [];
let keys = {};
let spawnRate = 0.02;

document.addEventListener('keydown', (e) => {
    if (e.key === ' ') shootBullet();
    keys[e.key.toLowerCase()] = true;
});
document.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
});

function shootBullet() {
    player.bullets.push({
        x: player.x + player.width / 2,
        y: player.y,
        vx: 0,
        vy: -8,
        width: 4,
        height: 12
    });
    if (AudioManager) AudioManager.playClick();
}

function spawnEnemy() {
    enemies.push({
        x: Math.random() * (canvas.width - 30),
        y: -30,
        width: 30,
        height: 30,
        vy: 2 + wave * 0.5,
        color: '#ff0088'
    });
}

function update() {
    if (keys['arrowleft'] || keys['a']) player.x = Math.max(0, player.x - player.speed);
    if (keys['arrowright'] || keys['d']) player.x = Math.min(canvas.width - player.width, player.x + player.speed);

    player.bullets.forEach((bullet, idx) => {
        bullet.y += bullet.vy;
        if (bullet.y < 0) player.bullets.splice(idx, 1);
    });

    if (Math.random() < spawnRate) spawnEnemy();

    enemies.forEach((enemy, eIdx) => {
        enemy.y += enemy.vy;

        player.bullets.forEach((bullet, bIdx) => {
            if (bullet.x > enemy.x && bullet.x < enemy.x + enemy.width &&
                bullet.y > enemy.y && bullet.y < enemy.y + enemy.height) {
                enemies.splice(eIdx, 1);
                player.bullets.splice(bIdx, 1);
                score += 10 * wave;
                if (AudioManager) AudioManager.playSuccess();

                if (score % 100 === 0) {
                    wave = Math.floor(score / 100) + 1;
                    spawnRate = Math.min(0.1, 0.02 + wave * 0.005);
                    document.getElementById('wave').textContent = wave;
                }

                document.getElementById('score').textContent = score;
            }
        });

        if (enemy.y > canvas.height) enemies.splice(eIdx, 1);
    });

    enemies.forEach(enemy => {
        if (enemy.y + enemy.height > canvas.height - 55) {
            if (score > highScore) {
                highScore = score;
                localStorage.setItem('37-score', highScore);
            }
            alert('Game Over!\\nScore: ' + score + '\\nWave: ' + wave);
            location.reload();
        }
    });
}

function draw() {
    ctx.fillStyle = 'radial-gradient(circle, #1a0a3a, #0a0a0a)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw stars background
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 20; i++) {
        let starX = (i * 30) % canvas.width;
        let starY = (i * 25) % canvas.height;
        ctx.fillRect(starX, starY, 2, 2);
    }

    // Player
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.shadowColor = '#00ff00';
    ctx.shadowBlur = 10;
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 2;
    ctx.strokeRect(player.x, player.y, player.width, player.height);
    ctx.shadowBlur = 0;

    // Bullets
    ctx.fillStyle = '#ffff00';
    player.bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });

    // Enemies
    enemies.forEach(enemy => {
        ctx.fillStyle = enemy.color;
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        ctx.shadowColor = enemy.color;
        ctx.shadowBlur = 8;
        ctx.strokeStyle = enemy.color;
        ctx.lineWidth = 2;
        ctx.strokeRect(enemy.x, enemy.y, enemy.width, enemy.height);
        ctx.shadowBlur = 0;
    });
}

function gameLoop() {
    update();
    draw();
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('37-score', highScore);
        document.getElementById('highScore').textContent = highScore;
    }
    requestAnimationFrame(gameLoop);
}

gameLoop();
