const canvas = document.getElementById('blastCanvas');
const ctx = canvas.getContext('2d');

canvas.width = Math.min(window.innerWidth - 40, 800);
canvas.height = window.innerHeight - 120;

const cannon = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    angle: 0,
    length: 40,
    color: '#00aaff'
};

const balls = [];
const targets = [];
let score = 0;
let level = 1;
let highScore = localStorage.getItem('30-score') || 0;
let gameActive = true;

function spawnTargets() {
    for (let i = 0; i < 3 + level; i++) {
        targets.push({
            x: Math.random() * (canvas.width - 40) + 20,
            y: Math.random() * (canvas.height / 2) + 50,
            radius: 15 + Math.random() * 10,
            vx: (Math.random() - 0.5) * 3,
            vy: Math.random() * 2 + 1,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`
        });
    }
}

function drawCannon() {
    ctx.strokeStyle = cannon.color;
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(cannon.x, cannon.y);
    ctx.lineTo(
        cannon.x + Math.cos(cannon.angle) * cannon.length,
        cannon.y - Math.sin(cannon.angle) * cannon.length
    );
    ctx.stroke();
}

function drawTargets() {
    targets.forEach(target => {
        ctx.fillStyle = target.color;
        ctx.beginPath();
        ctx.arc(target.x, target.y, target.radius, 0, Math.PI * 2);
        ctx.fill();
    });
}

function drawBalls() {
    balls.forEach(ball => {
        ctx.fillStyle = '#FFFF00';
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, 5, 0, Math.PI * 2);
        ctx.fill();
    });
}

function update() {
    balls.forEach((ball, idx) => {
        ball.x += ball.vx;
        ball.y -= ball.vy;
        ball.vy -= 0.2;
        
        if (ball.x < 0 || ball.x > canvas.width || ball.y < 0) {
            balls.splice(idx, 1);
        }
    });
    
    targets.forEach((target, tidx) => {
        target.x += target.vx;
        target.y += target.vy;
        
        if (target.x - target.radius < 0) target.vx *= -1;
        if (target.x + target.radius > canvas.width) target.vx *= -1;
        if (target.y + target.radius > canvas.height) {
            targets.splice(tidx, 1);
        }
        
        balls.forEach((ball, bidx) => {
            if (Math.hypot(ball.x - target.x, ball.y - target.y) < ball.radius + target.radius) {
                balls.splice(bidx, 1);
                targets.splice(tidx, 1);
                score += Math.floor(target.radius);
                document.getElementById('score').textContent = score;
            }
        });
    });
    
    if (targets.length === 0) {
        level++;
        document.getElementById('level').textContent = level;
        spawnTargets();
    }
}

function draw() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    drawTargets();
    drawBalls();
    drawCannon();
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cannon.angle = Math.atan2(cannon.y - y, x - cannon.x);
});

document.addEventListener('click', (e) => {
    const ball = {
        x: cannon.x + Math.cos(cannon.angle) * cannon.length,
        y: cannon.y - Math.sin(cannon.angle) * cannon.length,
        vx: Math.cos(cannon.angle) * 8,
        vy: Math.sin(cannon.angle) * 8,
        radius: 5
    };
    balls.push(ball);
});

document.getElementById('highScore').textContent = highScore;
spawnTargets();
gameLoop();