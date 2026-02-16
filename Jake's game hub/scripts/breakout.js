const canvas = document.getElementById('breakoutCanvas');
const ctx = canvas.getContext('2d');

canvas.width = Math.min(window.innerWidth - 40, 500);
canvas.height = window.innerHeight - 120;

const paddle = {
    x: canvas.width / 2 - 50,
    y: canvas.height - 20,
    width: 100,
    height: 15,
    speed: 7,
    color: '#00aaff'
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 8,
    dx: 4,
    dy: -4,
    color: '#FFD700'
};

const bricks = [];
let score = 0;
let lives = 3;
let highScore = localStorage.getItem('12-score') || 0;
let gameOver = false;

function initBricks() {
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 8; c++) {
            bricks.push({
                x: c * (canvas.width / 8),
                y: r * 25 + 10,
                width: canvas.width / 8 - 2,
                height: 20,
                status: 1,
                color: `hsl(${r * 30}, 100%, 50%)`
            });
        }
    }
}

function drawPaddle() {
    ctx.fillStyle = paddle.color;
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.shadowColor = '#00aaff';
    ctx.shadowBlur = 10;
}

function drawBall() {
    ctx.fillStyle = ball.color;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
}

function drawBricks() {
    bricks.forEach(b => {
        if (b.status) {
            ctx.fillStyle = b.color;
            ctx.fillRect(b.x, b.y, b.width, b.height);
        }
    });
    ctx.shadowColor = 'transparent';
}

function updateGame() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) ball.dx *= -1;
    if (ball.y - ball.radius < 0) ball.dy *= -1;

    if (ball.y + ball.radius > canvas.height) {
        lives--;
        document.getElementById('lives').textContent = lives;
        if (lives <= 0) {
            gameOver = true;
            endGame();
        } else {
            resetBall();
        }
    }

    if (ball.y + ball.radius > paddle.y && ball.y - ball.radius < paddle.y + paddle.height &&
        ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
        ball.dy = -ball.dy;
        ball.y = paddle.y - ball.radius;
    }

    bricks.forEach(b => {
        if (b.status && ball.x > b.x && ball.x < b.x + b.width &&
            ball.y > b.y && ball.y < b.y + b.height) {
            b.status = 0;
            ball.dy *= -1;
            score += 10;
            document.getElementById('score').textContent = score;
        }
    });
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (!gameOver) {
        updateGame();
    }
    
    drawBricks();
    drawPaddle();
    drawBall();
    requestAnimationFrame(gameLoop);
}

function endGame() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('12-score', highScore);
        document.getElementById('highScore').textContent = highScore;
    }
    alert(`Game Over! Score: ${score}`);
    location.reload();
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && paddle.x > 0) paddle.x -= paddle.speed;
    if (e.key === 'ArrowRight' && paddle.x + paddle.width < canvas.width) paddle.x += paddle.speed;
});

window.addEventListener('resize', () => {
    canvas.width = Math.min(window.innerWidth - 40, 500);
});

document.getElementById('highScore').textContent = highScore;
initBricks();
gameLoop();