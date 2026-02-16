const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');

canvas.width = Math.min(window.innerWidth - 40, 600);
canvas.height = window.innerHeight - 120;

const marble = {
    x: canvas.width / 2,
    y: canvas.height - 100,
    radius: 10,
    vx: 0,
    vy: 0,
    color: '#FFD700'
};

const goal = {
    x: canvas.width / 2,
    y: 50,
    radius: 20,
    color: '#00DD00'
};

const walls = [
    { x: 50, y: 100, w: canvas.width - 100, h: 20 },
    { x: 50, y: canvas.height - 100, w: canvas.width - 100, h: 20 },
    { x: 50, y: 100, w: 20, h: canvas.height - 200 },
    { x: canvas.width - 70, y: 100, w: 20, h: canvas.height - 200 }
];

let startTime = Date.now();
let gameActive = true;
let highScore = localStorage.getItem('27-score') || 0;
let tiltX = 0;
let tiltY = 0;

window.addEventListener('deviceorientation', (e) => {
    tiltX = e.gamma / 90;
    tiltY = e.beta / 90;
});

document.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    tiltX = (e.clientX - rect.left - canvas.width / 2) / (canvas.width / 2) * 0.3;
    tiltY = (e.clientY - rect.top - canvas.height / 2) / (canvas.height / 2) * 0.3;
});

function update() {
    marble.vx += tiltX * 0.5;
    marble.vy += tiltY * 0.5;
    marble.vx *= 0.95;
    marble.vy *= 0.95;
    
    marble.x += marble.vx;
    marble.y += marble.vy;
    
    walls.forEach(wall => {
        if (marble.x - marble.radius < wall.x + wall.w &&
            marble.x + marble.radius > wall.x &&
            marble.y - marble.radius < wall.y + wall.h &&
            marble.y + marble.radius > wall.y) {
            
            if (marble.vx > 0) marble.x = wall.x - marble.radius;
            if (marble.vx < 0) marble.x = wall.x + wall.w + marble.radius;
            if (marble.vy > 0) marble.y = wall.y - marble.radius;
            if (marble.vy < 0) marble.y = wall.y + wall.h + marble.radius;
            marble.vx *= -0.5;
            marble.vy *= -0.5;
        }
    });
    
    if (Math.hypot(marble.x - goal.x, marble.y - goal.y) < marble.radius + goal.radius) {
        endGame();
    }
}

function draw() {
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#666';
    walls.forEach(wall => {
        ctx.fillRect(wall.x, wall.y, wall.w, wall.h);
    });
    
    ctx.fillStyle = marble.color;
    ctx.beginPath();
    ctx.arc(marble.x, marble.y, marble.radius, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = goal.color;
    ctx.beginPath();
    ctx.arc(goal.x, goal.y, goal.radius, 0, Math.PI * 2);
    ctx.fill();
}

function gameLoop() {
    if (gameActive) {
        update();
    }
    draw();
    
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById('time').textContent = elapsed;
    
    requestAnimationFrame(gameLoop);
}

function endGame() {
    gameActive = false;
    const time = Math.floor((Date.now() - startTime) / 1000);
    if (time < (highScore || 9999)) {
        highScore = time;
        localStorage.setItem('27-score', highScore);
        document.getElementById('highScore').textContent = highScore;
    }
    alert(`Maze Complete! Time: ${time}s`);
    location.reload();
}

document.getElementById('highScore').textContent = highScore;
gameLoop();