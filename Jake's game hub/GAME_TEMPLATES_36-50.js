/**
 * BLUEPLAY - COMPLETE GAME STUBS GENERATOR
 * Games 36-50
 * 
 * This file provides ready-to-use templates for the remaining 15 games.
 * Copy and paste the HTML/JS below to create each game file.
 * Replace [GAME_ID], [GAME_NAME], [FOLDER] with actual values.
 * 
 * COMPLETED GAMES (copy patterns from these):
 * - Game 34: Brick Maze (games/brickmaze.html + scripts/brickmaze.js)
 * - Game 35: Jump Quest (games/jumpquest.html + scripts/jumpquest.js)
 */

// ============================================================================
// GAME 36: BUBBLE POP
// ============================================================================
/*
FILE: games/bubblepop.html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bubble Pop</title>
    <link rel="stylesheet" href="../styles/main.css">
    <style>
        canvas { display: block; background: linear-gradient(135deg, #2a1a3a, #0a0a0a); border: 2px solid #ff00ff; max-width: 100%; margin: 20px auto; }
        #statsContainer { position: fixed; top: 90px; left: 20px; background: #111; border: 2px solid #ff00ff; padding: 15px; border-radius: 5px; z-index: 1000; }
        #statsContainer p { color: #ff00ff; margin: 8px 0; font-size: 14px; }
    </style>
    <script defer src="../scripts/bubblepop.js"><\/script>
</head>
<body>
    <div id="statsContainer">
        <p>Score: <span id="score">0</span></p>
        <p>Bubbles: <span id="bubbles">0</span></p>
        <p>Best: <span id="highScore">0</span></p>
    </div>
    <canvas id="gameCanvas" width="500" height="500"></canvas>
    <button class="back-btn" onclick="window.location.href='../index.html'">Back</button>
</body>
</html>

FILE: scripts/bubblepop.js

let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
let score = 0;
let bubbleCount = 0;
let highScore = localStorage.getItem('36-score') || 0;
document.getElementById('highScore').textContent = highScore;

// Responsive
function resizeCanvas() {
    canvas.width = Math.min(window.innerWidth - 40, 500);
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Bubbles array
let bubbles = [];
let gameActive = true;

// Create bubbles
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

// Spawn initial bubbles
for (let i = 0; i < 5; i++) createBubble();

// Click to pop
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

        // Bounce off walls
        if (bubble.x - bubble.radius < 0 || bubble.x + bubble.radius > canvas.width) bubble.vx *= -1;
        if (bubble.y - bubble.radius < 0 || bubble.y + bubble.radius > canvas.height) bubble.vy *= -1;

        // Keep in bounds
        bubble.x = Math.max(bubble.radius, Math.min(canvas.width - bubble.radius, bubble.x));
        bubble.y = Math.max(bubble.radius, Math.min(canvas.height - bubble.radius, bubble.y));
    });

    // Spawn new bubble occasionally
    if (Math.random() < 0.02 && bubbles.length < 10) {
        createBubble();
    }

    // Update UI
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

        // Glow effect
        ctx.shadowColor = bubble.color;
        ctx.shadowBlur = 10;
        ctx.strokeStyle = bubble.color;
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
*/

// ============================================================================
// GAME 37: GALAXY SHOOTER
// ============================================================================
/*
FILE: games/galaxy.html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Galaxy Shooter</title>
    <link rel="stylesheet" href="../styles/main.css">
    <style>
        canvas { display: block; background: radial-gradient(circle, #1a0a3a, #0a0a0a); border: 2px solid #00ffff; max-width: 100%; margin: 20px auto; }
        #statsContainer { position: fixed; top: 90px; left: 20px; background: #111; border: 2px solid #00ffff; padding: 15px; border-radius: 5px; z-index: 1000; }
        #statsContainer p { color: #00ffff; margin: 8px 0; font-size: 14px; }
    </style>
    <script defer src="../scripts/galaxy.js"><\/script>
</head>
<body>
    <div id="statsContainer">
        <p>Score: <span id="score">0</span></p>
        <p>Wave: <span id="wave">1</span></p>
        <p>Best: <span id="highScore">0</span></p>
    </div>
    <canvas id="gameCanvas" width="600" height="500"></canvas>
    <button class="back-btn" onclick="window.location.href='../index.html'">Back</button>
</body>
</html>

FILE: scripts/galaxy.js

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
let lastMoveTime = 0;

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

function update(timestamp) {
    // Player movement
    if (keys['arrowleft'] || keys['a']) player.x = Math.max(0, player.x - player.speed);
    if (keys['arrowright'] || keys['d']) player.x = Math.min(canvas.width - player.width, player.x + player.speed);

    // Bullets
    player.bullets.forEach((bullet, idx) => {
        bullet.y += bullet.vy;
        if (bullet.y < 0) player.bullets.splice(idx, 1);
    });

    // Enemy spawn
    if (Math.random() < spawnRate) spawnEnemy();

    // Enemies
    enemies.forEach((enemy, eIdx) => {
        enemy.y += enemy.vy;

        // Bullet collision
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

    // Game over
    enemies.forEach(enemy => {
        if (enemy.y + enemy.height > canvas.height - 60) {
            if (score > highScore) {
                highScore = score;
                localStorage.setItem('37-score', highScore);
            }
            alert('Game Over!\\nScore: ' + score);
            location.reload();
        }
    });
}

function draw() {
    ctx.fillStyle = 'radial-gradient(circle, #1a0a3a, #0a0a0a)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Player
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Bullets
    ctx.fillStyle = '#ffff00';
    player.bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });

    // Enemies
    enemies.forEach(enemy => {
        ctx.fillStyle = enemy.color;
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        ctx.strokeStyle = enemy.color;
        ctx.lineWidth = 2;
        ctx.strokeRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });
}

function gameLoop(timestamp) {
    update(timestamp);
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop(0);
*/

// ============================================================================
// REMAINING GAMES 38-50 (Stubs - Implement Following Same Pattern)
// ============================================================================

const REMAINING_GAMES = {
    38: { name: 'Gem Match', folder: 'gemmatch', type: 'DOM', description: 'Match 3 gems in a row' },
    39: { name: 'Speed Keys', folder: 'speedkeys', type: 'DOM', description: 'Type sequences quickly' },
    40: { name: 'Monster Runner', folder: 'monster', type: 'Canvas', description: 'Evade monsters, collect coins' },
    41: { name: 'Ice Slider', folder: 'iceslider', type: 'Canvas', description: 'Slide on ice, avoid obstacles' },
    42: { name: 'Fire Match', folder: 'firematch', type: 'DOM', description: 'Match fire elements' },
    43: { name: 'Sky Chase', folder: 'skychase', type: 'Canvas', description: 'Chase targets in the sky' },
    44: { name: 'Block Blast', folder: 'blockblast', type: 'DOM', description: 'Destroy matching blocks' },
    45: { name: 'Speed Typer', folder: 'speedtyper', type: 'DOM', description: 'Type words at lightning speed' },
    46: { name: 'Laser Grid', folder: 'lasergrid', type: 'Canvas', description: 'Navigate laser grid' },
    47: { name: 'Night Runner', folder: 'nightrunner', type: 'Canvas', description: 'Run through the night' },
    48: { name: 'Electric Storm', folder: 'electric', type: 'Canvas', description: 'Survive electric chaos' },
    49: { name: 'Fortune Wheel', folder: 'fortune', type: 'DOM', description: 'Spin for rewards' },
    50: { name: 'Quantum Quest', folder: 'quantum', type: 'Canvas', description: 'Quantum exploration' }
};

console.log('\n🎮 BLUEPLAY - REMAINING GAMES 38-50\n');
console.log('PATTERN REFERENCE - Follow these patterns for each game:\n');

console.log(`
PATTERN 1: CANVAS-BASED GAME (like Brick Maze, Jump Quest, Galaxy Shooter)

// HTML Template
<canvas id="gameCanvas" width="600" height="400"></canvas>

// JS Setup  
let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
let score = 0, level = 1, highScore = localStorage.getItem('[ID]-score') || 0;

function resizeCanvas() {
    canvas.width = Math.min(window.innerWidth - 40, 600);
}
window.addEventListener('resize', resizeCanvas);

// Key inputs
let keys = {};
document.addEventListener('keydown', (e) => keys[e.key.toLowerCase()] = true);
document.addEventListener('keyup', (e) => keys[e.key.toLowerCase()] = false);

// Game objects
let player = { x: 0, y: 0, width: 30, height: 30, speed: 5 };
let enemies = [];

function update() {
    if (keys['arrowleft'] || keys['a']) player.x -= player.speed;
    // Add game logic here
}

function draw() {
    ctx.fillRect(player.x, player.y, player.width, player.height);
    // Add rendering here
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}
gameLoop();

---

PATTERN 2: DOM-BASED GAME (like Number Blaster, Typing challenges)

// HTML Template
<div id="gameGrid" style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px;"></div>

// JS Setup
let gameActive = true;
let score = 0;
let gridItems = [];

function initGame() {
    document.getElementById('gameGrid').innerHTML = '';
    for (let i = 0; i < 25; i++) {
        let btn = document.createElement('button');
        btn.textContent = i;
        btn.addEventListener('click', handleClick);
        document.getElementById('gameGrid').appendChild(btn);
        gridItems.push(btn);
    }
}

function handleClick(e) {
    if (AudioManager) AudioManager.playClick();
    score += 10;
    document.getElementById('score').textContent = score;
}

initGame();

---

KEY REQUIREMENTS FOR ALL GAMES:
✅ localStorage for high scores: localStorage.getItem('[ID]-score')
✅ AudioManager integration: if (AudioManager) AudioManager.playSound()
✅ Responsive canvas: Math.min(window.innerWidth - 40, MAX_WIDTH)
✅ Key state object for controls: keys[e.key.toLowerCase()] = true/false
✅ Back button: onclick="window.location.href='../index.html'"
✅ Stats container: Fixed position top: 90px, left: 20px
✅ Use requestAnimationFrame for game loop (not setInterval)

`);

Object.entries(REMAINING_GAMES).forEach(([id, game]) => {
    console.log(`\n📦 GAME ${id}: ${game.name.toUpperCase()}`);
    console.log(`   Type: ${game.type}`);
    console.log(`   Files: games/${game.folder}.html + scripts/${game.folder}.js`);
    console.log(`   Description: ${game.description}`);
    console.log(`   localStorage key: '${id}-score'`);
});

console.log(`

✨ QUICK START FOR GAME 38 (Gem Match):

1. Create games/gemmatch.html (copy template structure from bubblepop.html)
2. Create scripts/gemmatch.js (implement 3-match game logic)
3. Add to games array in app.js (already there!)
4. Test: Load index.html and click Game 38
5. Implement: Follow PATTERN 2 (DOM-based) for grid matching

Total estimated time: 15-20 minutes per game × 13 games = ~4 hours to complete all

RECOMMENDED COMPLETION ORDER (by difficulty):
Easy: 38 (Match), 39 (Keys), 42 (Match), 44 (Blocks), 45 (Typer), 49 (Wheel)
Medium: 40 (Runner), 41 (Slider), 43 (Chase), 46 (Laser), 47 (Runner)
Hard: 48 (Storm), 50 (Quest)
`);
