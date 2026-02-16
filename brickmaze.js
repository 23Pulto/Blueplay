let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
let gameActive = true;
let score = 0;
let level = 1;
let highScore = localStorage.getItem('34-score') || 0;

document.getElementById('highScore').textContent = highScore;

// Resize canvas responsively
function resizeCanvas() {
    canvas.width = Math.min(window.innerWidth - 40, 600);
    canvas.height = Math.min(window.innerHeight - 120, 400);
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Game variables
let player = { x: canvas.width / 2, y: canvas.height - 40, width: 40, height: 20, speed: 5 };
let balls = [];
let bricks = [];
let keys = {};

// Keyboard controls
document.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;
    e.key === ' ' && shootBall();
});
document.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
});

function createBricks() {
    bricks = [];
    let rows = 2 + level;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < 6; c++) {
            bricks.push({
                x: c * (canvas.width / 6),
                y: 40 + r * 30,
                width: canvas.width / 6 - 5,
                height: 25,
                active: true
            });
        }
    }
}
createBricks();

function shootBall() {
    if (AudioManager) AudioManager.playClick();
    balls.push({
        x: player.x + player.width / 2,
        y: player.y,
        vx: (Math.random() - 0.5) * 6,
        vy: -7,
        radius: 5
    });
}

function update() {
    // Player movement
    if (keys['arrowleft'] || keys['a']) player.x = Math.max(0, player.x - player.speed);
    if (keys['arrowright'] || keys['d']) player.x = Math.min(canvas.width - player.width, player.x + player.speed);

    // Ball physics
    balls.forEach((ball, ballIndex) => {
        ball.x += ball.vx;
        ball.y += ball.vy;

        // Collision with walls
        if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) ball.vx *= -1;
        if (ball.y - ball.radius < 0) ball.vy *= -1;

        // Collision with player
        if (ball.y + ball.radius > player.y && ball.x > player.x && ball.x < player.x + player.width) {
            ball.vy *= -1;
            if (AudioManager) AudioManager.playSuccess();
        }

        // Collision with bricks
        bricks.forEach((brick) => {
            if (brick.active && ball.x > brick.x && ball.x < brick.x + brick.width &&
                ball.y > brick.y && ball.y < brick.y + brick.height) {
                brick.active = false;
                ball.vy *= -1;
                score += 10;
                if (AudioManager) AudioManager.playCoin();
                document.getElementById('score').textContent = score;
            }
        });

        // Ball out of bounds
        if (ball.y > canvas.height) {
            balls.splice(ballIndex, 1);
        }
    });

    // Check level complete
    if (bricks.every(b => !b.active)) {
        level++;
        score += 100;
        createBricks();
        document.getElementById('level').textContent = level;
        document.getElementById('score').textContent = score;
    }
}

function draw() {
    // Clear canvas
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid background
    ctx.strokeStyle = 'rgba(0, 170, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
    }

    // Draw bricks
    bricks.forEach(brick => {
        if (brick.active) {
            ctx.fillStyle = 'linear-gradient(135deg, #ff00ff, #ff0088)';
            ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
            ctx.strokeStyle = '#ff00ff';
            ctx.lineWidth = 2;
            ctx.strokeRect(brick.x, brick.y, brick.width, brick.height);
        }
    });

    // Draw player
    ctx.fillStyle = '#00aaff';
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.shadowColor = '#00aaff';
    ctx.shadowBlur = 10;
    ctx.strokeStyle = '#00aaff';
    ctx.lineWidth = 2;
    ctx.strokeRect(player.x, player.y, player.width, player.height);
    ctx.shadowBlur = 0;

    // Draw balls
    balls.forEach(ball => {
        ctx.fillStyle = '#ffdd00';
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffaa00';
        ctx.lineWidth = 2;
        ctx.stroke();
    });
}

function gameLoop(timestamp) {
    if (!gameActive) return;
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop(0);

// Update high score
setInterval(() => {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('34-score', highScore);
        document.getElementById('highScore').textContent = highScore;
    }
}, 500);
