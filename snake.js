const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");

canvas.width = Math.min(window.innerWidth - 40, 600);
canvas.height = Math.min(window.innerHeight - 200, 600);

const GRID_SIZE = 20;
const SPEED = 120; // Milliseconds per move (lower = faster)

let snake = [{x: 15, y: 10}, {x: 14, y: 10}, {x: 13, y: 10}];
let direction = {x: 1, y: 0};
let nextDirection = {x: 1, y: 0};
let food = {x: Math.floor(Math.random() * (canvas.width / GRID_SIZE)), y: Math.floor(Math.random() * (canvas.height / GRID_SIZE))};
let score = 0;
let highScore = localStorage.getItem('1-score') || 0;
let gameRunning = true;
let lastMoveTime = 0;

document.getElementById('score').textContent = score;
document.getElementById('highScore').textContent = highScore;

// Instant keyboard input - no buffering
const keys = {};
document.addEventListener('keydown', (e) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', 'W', 'A', 'S', 'D'].includes(e.key)) {
        e.preventDefault();
    }
    keys[e.key.toLowerCase()] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
});

function updateDirection() {
    if (keys['arrowup'] || keys['w']) {
        if (direction.y === 0) nextDirection = {x: 0, y: -1};
    }
    if (keys['arrowdown'] || keys['s']) {
        if (direction.y === 0) nextDirection = {x: 0, y: 1};
    }
    if (keys['arrowleft'] || keys['a']) {
        if (direction.x === 0) nextDirection = {x: -1, y: 0};
    }
    if (keys['arrowright'] || keys['d']) {
        if (direction.x === 0) nextDirection = {x: 1, y: 0};
    }
}

function update() {
    updateDirection();
    direction = nextDirection;

    const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};

    // Wall collision
    if (head.x < 0 || head.x >= canvas.width / GRID_SIZE || 
        head.y < 0 || head.y >= canvas.height / GRID_SIZE) {
        endGame();
        return;
    }

    // Self collision
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        endGame();
        return;
    }

    snake.unshift(head);

    // Food collision
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        document.getElementById('score').textContent = score;
        food = {x: Math.floor(Math.random() * (canvas.width / GRID_SIZE)), y: Math.floor(Math.random() * (canvas.height / GRID_SIZE))};
        
        if (AudioManager) AudioManager.playCoin();
        
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('1-score', highScore);
            document.getElementById('highScore').textContent = highScore;
        }
    } else {
        snake.pop();
    }
}

function draw() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = 'rgba(0, 170, 255, 0.1)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= canvas.width; i += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
    }
    for (let i = 0; i <= canvas.height; i += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    }

    // Draw food
    ctx.fillStyle = '#FFD700';
    ctx.shadowColor = 'rgba(255, 215, 0, 0.8)';
    ctx.shadowBlur = 10;
    ctx.fillRect(food.x * GRID_SIZE + 2, food.y * GRID_SIZE + 2, GRID_SIZE - 4, GRID_SIZE - 4);
    ctx.shadowBlur = 0;

    // Draw snake
    snake.forEach((segment, index) => {
        if (index === 0) {
            ctx.fillStyle = '#00FF00';
            ctx.shadowColor = 'rgba(0, 255, 0, 0.6)';
            ctx.shadowBlur = 8;
        } else {
            ctx.fillStyle = '#00BB00';
            ctx.shadowBlur = 0;
        }
        ctx.fillRect(segment.x * GRID_SIZE + 1, segment.y * GRID_SIZE + 1, GRID_SIZE - 2, GRID_SIZE - 2);
    });
    ctx.shadowBlur = 0;
}

function endGame() {
    gameRunning = false;
    if (AudioManager) AudioManager.playError();
    alert(`Game Over! Final Score: ${score}\nHigh Score: ${highScore}`);
    location.reload();
}

function gameLoop(timestamp) {
    if (!gameRunning) return;

    const elapsed = timestamp - lastMoveTime;
    if (elapsed >= SPEED) {
        update();
        lastMoveTime = timestamp;
    }
    draw();
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);