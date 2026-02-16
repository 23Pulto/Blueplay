const canvas = document.getElementById('pacCanvas');
const ctx = canvas.getContext('2d');

canvas.width = Math.min(window.innerWidth - 40, 400);
canvas.height = window.innerHeight - 120;

const gridSize = 20;
const tileSize = Math.floor(Math.min(canvas.width, canvas.height) / gridSize);

const player = {
    x: 5,
    y: 5,
    dir: 'RIGHT',
    nextDir: 'RIGHT',
    color: '#FFFF00'
};

const ghosts = [
    { x: 10, y: 10, color: '#FF0000', speed: 2 },
    { x: 12, y: 10, color: '#FF7FFF', speed: 2 }
];

let pellets = [];
let score = 0;
let pelletsEaten = 0;
let highScore = localStorage.getItem('14-score') || 0;
let gameOver = false;

function initPellets() {
    pellets = [];
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            if (Math.random() > 0.2) {
                pellets.push({ x, y });
            }
        }
    }
}

function update() {
    player.dir = player.nextDir;
    const next = getPossibleMove(player.x, player.y, player.dir);
    if (isValid(next.x, next.y)) {
        player.x = next.x;
        player.y = next.y;
    }

    pellets = pellets.filter(p => !(p.x === player.x && p.y === player.y));
    if (pellets.length > 0 && Math.random() > 0.95) {
        score += 10;
        pelletsEaten++;
        document.getElementById('score').textContent = score;
        document.getElementById('pellets').textContent = pelletsEaten;
    }

    ghosts.forEach(g => {
        if (Math.random() > 0.7) {
            const dirs = ['UP', 'DOWN', 'LEFT', 'RIGHT'];
            const newDir = dirs[Math.floor(Math.random() * 4)];
            const next = getPossibleMove(g.x, g.y, newDir);
            if (isValid(next.x, next.y)) {
                g.x = next.x;
                g.y = next.y;
            }
        }

        if (g.x === player.x && g.y === player.y) {
            gameOver = true;
        }
    });
}

function getPossibleMove(x, y, dir) {
    if (dir === 'UP') return { x, y: y - 1 };
    if (dir === 'DOWN') return { x, y: y + 1 };
    if (dir === 'LEFT') return { x: x - 1, y };
    if (dir === 'RIGHT') return { x: x + 1, y };
}

function isValid(x, y) {
    return x >= 0 && x < gridSize && y >= 0 && y < gridSize;
}

function draw() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#444';
    pellets.forEach(p => {
        ctx.fillRect(p.x * tileSize + tileSize / 2 - 2, p.y * tileSize + tileSize / 2 - 2, 4, 4);
    });

    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.arc(player.x * tileSize + tileSize / 2, player.y * tileSize + tileSize / 2, tileSize / 2 - 2, 0, Math.PI * 2);
    ctx.fill();

    ghosts.forEach(g => {
        ctx.fillStyle = g.color;
        ctx.fillRect(g.x * tileSize + 2, g.y * tileSize + 2, tileSize - 4, tileSize - 4);
    });
}

function gameLoop() {
    if (!gameOver) {
        update();
        draw();
    } else {
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('14-score', highScore);
        }
        draw();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#FF0000';
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
    }
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') player.nextDir = 'UP';
    if (e.key === 'ArrowDown') player.nextDir = 'DOWN';
    if (e.key === 'ArrowLeft') player.nextDir = 'LEFT';
    if (e.key === 'ArrowRight') player.nextDir = 'RIGHT';
});

document.getElementById('highScore').textContent = highScore;
initPellets();
gameLoop();