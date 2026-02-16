const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

canvas.width = Math.min(window.innerWidth - 40, 600);
canvas.height = Math.min(window.innerHeight - 200, 600);

const paddleWidth = 10;
const paddleHeight = 100;
const ballRadius = 10;

const player = { x: 0, y: canvas.height / 2 - paddleHeight / 2, score: 0 };
const ai = { x: canvas.width - paddleWidth, y: canvas.height / 2 - paddleHeight / 2, score: 0 };
const ball = { x: canvas.width / 2, y: canvas.height / 2, dx: 5, dy: 5 };

let highScore = localStorage.getItem('2-score') || 0;
document.getElementById('playerScore').textContent = player.score;
document.getElementById('aiScore').textContent = ai.score;
document.getElementById('highScore').textContent = highScore;

function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
}

function drawText(text, x, y) {
    ctx.fillStyle = "#00aaff";
    ctx.font = "32px Arial";
    ctx.fillText(text, x, y);
}

function update() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y + ballRadius > canvas.height || ball.y - ballRadius < 0) {
        ball.dy *= -1;
    }

    const playerCollision = ball.x - ballRadius < player.x + paddleWidth &&
        ball.y > player.y &&
        ball.y < player.y + paddleHeight;

    const aiCollision = ball.x + ballRadius > ai.x &&
        ball.y > ai.y &&
        ball.y < ai.y + paddleHeight;

    if (playerCollision || aiCollision) {
        ball.dx *= -1;
    }

    if (ball.x - ballRadius < 0) {
        ai.score++;
        document.getElementById('aiScore').textContent = ai.score;
        resetBall();
    } else if (ball.x + ballRadius > canvas.width) {
        player.score++;
        document.getElementById('playerScore').textContent = player.score;
        const maxScore = Math.max(player.score, ai.score);
        if (maxScore > highScore) {
            highScore = maxScore;
            localStorage.setItem('2-score', highScore);
            document.getElementById('highScore').textContent = highScore;
        }
        resetBall();
    }

    ai.y += (ball.y - (ai.y + paddleHeight / 2)) * 0.1;
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = -ball.dx;
}

function render() {
    drawRect(0, 0, canvas.width, canvas.height, "black");
    drawRect(player.x, player.y, paddleWidth, paddleHeight, "#00aaff");
    drawRect(ai.x, ai.y, paddleWidth, paddleHeight, "#00aaff");
    drawCircle(ball.x, ball.y, ballRadius, "#00aaff");
    drawText(player.score, canvas.width / 4, 50);
    drawText(ai.score, 3 * canvas.width / 4, 50);
}

function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

gameLoop();

document.addEventListener("mousemove", event => {
    player.y = event.clientY - paddleHeight / 2;
});