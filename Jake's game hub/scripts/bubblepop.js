let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
let score = 0;
let bubbleCount = 0;
let highScore = localStorage.getItem('36-score') || 0;
document.getElementById('highScore').textContent = highScore;

function resizeCanvas() {
    canvas.width = Math.min(window.innerWidth - 40, 500);
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let bubbles = [];
let gameActive = true;

function createBubble() {
    bubbles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 20 + 10,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        color: ['#ff00ff', '#ff0088', '#ff3300', '#ffff00'][Math.floor(Math.random() * 4)]
    });
    bubbleCount++;
}

for (let i = 0; i < 5; i++) createBubble();

canvas.addEventListener('click', (e) => {
    let rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    bubbles.forEach((bubble, index) => {
        let dist = Math.sqrt((bubble.x - x) ** 2 + (bubble.y - y) ** 2);
        if (dist < bubble.radius) {
            bubbles.splice(index, 1);
            score += 10;
            if (AudioManager) AudioManager.playCoin();
            document.getElementById('score').textContent = score;
        }
    });
});

function update() {
    bubbles.forEach((bubble) => {
        bubble.x += bubble.vx;
        bubble.y += bubble.vy;

        if (bubble.x - bubble.radius < 0 || bubble.x + bubble.radius > canvas.width) bubble.vx *= -1;
        if (bubble.y - bubble.radius < 0 || bubble.y + bubble.radius > canvas.height) bubble.vy *= -1;

        bubble.x = Math.max(bubble.radius, Math.min(canvas.width - bubble.radius, bubble.x));
        bubble.y = Math.max(bubble.radius, Math.min(canvas.height - bubble.radius, bubble.y));
    });

    if (Math.random() < 0.02 && bubbles.length < 10) {
        createBubble();
    }

    document.getElementById('bubbles').textContent = bubbles.length;
}

function draw() {
    ctx.fillStyle = 'linear-gradient(135deg, #2a1a3a, #0a0a0a)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    bubbles.forEach((bubble) => {
        ctx.fillStyle = bubble.color;
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = bubble.color;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.shadowColor = bubble.color;
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;
    });
}

function gameLoop() {
    update();
    draw();
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('36-score', highScore);
        document.getElementById('highScore').textContent = highScore;
    }
    requestAnimationFrame(gameLoop);
}

gameLoop();
