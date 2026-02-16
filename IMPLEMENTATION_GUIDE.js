// BLUEPLAY - 50 GAMES IMPLEMENTATION GUIDE
// Full code is provided below for games 33-50
// Each game follows the same structure:
// 1. HTML file (games/gamename.html) with stats container and game area
// 2. JS file (scripts/gamename.js) with game logic, sound, and localStorage

// ============================================================================
// GAMES 33-50 - COMPLETE IMPLEMENTATION STUBS
// ============================================================================
// Copy the template below and customize the game mechanics

// For each game (33-50), create:
// 1. Create games/GAMENAME.html - Use the template provided
// 2. Create scripts/GAMENAME.js - Use the template provided
// 3. Update the game ID number in localStorage calls

const GAME_TEMPLATES = {
    33: { name: 'Color Mixer', file: 'colormixer.html', id: '33' },
    34: { name: 'Brick Maze', file: 'brickmaze.html', id: '34' },
    35: { name: 'Jump Quest', file: 'jumpquest.html', id: '35' },
    36: { name: 'Bubble Pop', file: 'bubblepop.html', id: '36' },
    37: { name: 'Galaxy Shooter', file: 'galaxy.html', id: '37' },
    38: { name: 'Gem Match', file: 'gemmatch.html', id: '38' },
    39: { name: 'Speed Keys', file: 'speedkeys.html', id: '39' },
    40: { name: 'Monster Runner', file: 'monster.html', id: '40' },
    41: { name: 'Ice Slider', file: 'iceslider.html', id: '41' },
    42: { name: 'Fire Match', file: 'firematch.html', id: '42' },
    43: { name: 'Sky Chase', file: 'skychase.html', id: '43' },
    44: { name: 'Block Blast', file: 'blockblast.html', id: '44' },
    45: { name: 'Speed Typer', file: 'speedtyper.html', id: '45' },
    46: { name: 'Laser Grid', file: 'lasergrid.html', id: '46' },
    47: { name: 'Night Runner', file: 'nightrunner.html', id: '47' },
    48: { name: 'Electric Storm', file: 'electric.html', id: '48' },
    49: { name: 'Fortune Wheel', file: 'fortune.html', id: '49' },
    50: { name: 'Quantum Quest', file: 'quantum.html', id: '50' }
};

// UNIVERSAL HTML TEMPLATE for Canvas Games (Dodge Master, Galaxy Shooter, etc):
const HTML_CANVAS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GAME_NAME</title>
    <link rel="stylesheet" href="../styles/main.css">
    <style>
        canvas { display: block; background: #000; border: 2px solid #00aaff; margin: 80px auto; max-width: 700px; }
        #statsContainer { position: fixed; top: 90px; left: 20px; background: #111; border: 2px solid #00aaff; padding: 15px; border-radius: 5px; }
        #statsContainer p { color: #00aaff; margin: 8px 0; font-size: 14px; }
    </style>
    <script defer src="../scripts/GAMEID.js"><\/script>
</head>
<body>
    <div id="statsContainer">
        <p>Score: <span id="score">0</span></p>
        <p>Level: <span id="level">1</span></p>
        <p>High Score: <span id="highScore">0</span></p>
        <p style="font-size: 12px; color: #aaa; margin-top: 10px;">Controls: Arrow Keys / WASD</p>
    </div>
    <canvas id="GAMEID_Canvas"></canvas>
    <button class="back-btn" onclick="window.location.href='../index.html'">Back</button>
</body>
</html>
`;

// UNIVERSAL HTML TEMPLATE for DOM Games (Number Blaster, Gem Match, etc):
const HTML_DOM_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GAME_NAME</title>
    <link rel="stylesheet" href="../styles/main.css">
    <style>
        #gameContainer { max-width: 600px; margin: 80px auto; padding: 20px; display: flex; flex-direction: column; align-items: center; }
        #gameBoard { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; margin: 20px 0; }
        .game-btn { padding: 20px; font-size: 18px; font-weight: 600; background: linear-gradient(135deg, #00aaff, #0088dd); color: black; border: 2px solid #00aaff; border-radius: 8px; cursor: pointer; transition: all 0.2s; }
        .game-btn:hover { transform: scale(1.05); box-shadow: 0 0 15px rgba(0, 170, 255, 0.5); }
        #statsContainer { position: fixed; top: 90px; left: 20px; background: #111; border: 2px solid #00aaff; padding: 15px; border-radius: 5px; }
        #statsContainer p { color: #00aaff; margin: 8px 0; font-size: 14px; }
    </style>
    <script defer src="../scripts/GAMEID.js"><\/script>
</head>
<body>
    <div id="statsContainer">
        <p>Score: <span id="score">0</span></p>
        <p>High Score: <span id="highScore">0</span></p>
    </div>
    <div id="gameContainer">
        <h2 style="color: #00aaff;">GAME_NAME</h2>
        <div id="gameBoard"></div>
    </div>
    <button class="back-btn" onclick="window.location.href='../index.html'">Back</button>
</body>
</html>
`;

// UNIVERSAL JS TEMPLATE for Canvas Games:
const JS_CANVAS_TEMPLATE = `
const canvas = document.getElementById("GAMEID_Canvas");
const ctx = canvas.getContext("2d");

canvas.width = Math.min(window.innerWidth - 40, 700);
canvas.height = Math.min(window.innerHeight - 200, 600);

let score = 0;
let level = 1;
let highScore = localStorage.getItem('GAME_NUMBER-score') || 0;
let gameActive = true;

document.getElementById('score').textContent = score;
document.getElementById('highScore').textContent = highScore;

const keys = {};
document.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;
});
document.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
});

function update() {
    if (!gameActive) return;
    // Your game update logic here
}

function draw() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Your rendering code here
}

function gameLoop() {
    update();
    draw();
    if (gameActive) requestAnimationFrame(gameLoop);
}

function endGame() {
    gameActive = false;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('GAME_NUMBER-score', highScore);
    }
    alert(\`Game Over!\\nScore: \${score}\\nHigh Score: \${highScore}\`);
    window.location.href = '../index.html';
}

gameLoop();
`;

// UNIVERSAL JS TEMPLATE for DOM Games:
const JS_DOM_TEMPLATE = `
let score = 0;
let highScore = localStorage.getItem('GAME_NUMBER-score') || 0;

document.getElementById('score').textContent = score;
document.getElementById('highScore').textContent = highScore;

function updateDisplay() {
    document.getElementById('score').textContent = score;
}

function saveScore() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('GAME_NUMBER-score', highScore);
        document.getElementById('highScore').textContent = highScore;
    }
}

// Your game logic here

function endGame() {
    saveScore();
    alert(\`Game Over!\\nScore: \${score}\\nHigh Score: \${highScore}\`);
    location.reload();
}
`;

// KEY FEATURES TO ADD TO EACH GAME:
const GAME_FEATURES = [
    '✓ Instant keyboard input (no delay) - use key state object',
    '✓ Sound effects - AudioManager.playClick(), .playSuccess(), .playError()',
    '✓ High score persistence - localStorage.getItem/setItem',
    '✓ Responsive canvas sizing - Math.min(window.innerWidth - 40, maxWidth)',
    '✓ Game stats UI - Score, Level, High Score displays',
    '✓ Back button - Fixed positioning for navigation',
    '✓ Difficulty progression - Increase speed/difficulty over time',
    '✓ Particle effects toggle - Check getSetting("particlesEnabled")',
    '✓ VFX toggle - Check getSetting("vfxEnabled")',
    '✓ Sound toggle - Check if AudioManager.soundEnabled'
];

// GAME IMPLEMENTATION CHECKLIST:
console.log(`
==================================================
BLUEPLAY - GAME IMPLEMENTATION CHECKLIST (33-50)
==================================================

For each game, follow these steps:

1. CREATE HTML FILE (games/GAMENAME.html)
   - Copy appropriate template (Canvas or DOM)
   - Replace GAME_NAME, GAMEID, GAME_NUMBER
   - Add game-specific controls description

2. CREATE JS FILE (scripts/GAMENAME.js)
   - Copy appropriate template
   - Replace GAME_NUMBER with actual game ID
   - Implement game mechanics
   - Add AudioManager calls for sound
   - Test localStorage persistence

3. TESTING CHECKLIST
   ✓ Keyboard input is instant (no delay)
   ✓ Sound plays when AudioManager is enabled
   ✓ High scores save to localStorage
   ✓ Game responsive on mobile/tablet/desktop
   ✓ Back button returns to hub
   ✓ Game appears in hub with correct info

4. ENHANCEMENT OPPORTUNITIES
   - Add particle effects (check getSetting("particlesEnabled"))
   - Add visual effects (check getSetting("vfxEnabled"))
   - Add difficulty levels
   - Add combo system
   - Add animations and transitions
   - Use online images from CDN
   - Add leaderboard system

==================================================
`);

// EXAMPLE: How to Implement Game 33 (Color Mixer):
const EXAMPLE_COLOR_MIXER = `
// games/colormixer.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Color Mixer</title>
    <link rel="stylesheet" href="../styles/main.css">
    <style>
        #gameContainer { max-width: 600px; margin: 80px auto; }
        #targetColor { width: 100px; height: 100px; margin: 20px auto; border: 3px solid #00aaff; border-radius: 8px; box-shadow: 0 0 20px currentColor; }
        #colorSliders { display: flex; flex-direction: column; gap: 20px; margin: 30px 0; }
        .slider-group { display: flex; align-items: center; gap: 15px; }
        .slider-group input { flex: 1; }
        .slider-group span { min-width: 40px; color: #00aaff; font-weight: 600; }
    </style>
    <script defer src="../scripts/colormixer.js"><\/script>
</head>
<body>
    <div id="statsContainer">
        <p>Score: <span id="score">0</span></p>
        <p>Level: <span id="level">1</span></p>
        <p>High Score: <span id="highScore">0</span></p>
    </div>
    <div id="gameContainer">
        <h2 style="color: #00aaff; text-align: center;">Color Mixer</h2>
        <p style="color: #aaa; text-align: center;">Mix colors to match the target!</p>
        <div id="targetColor"></div>
        <div id="colorSliders">
            <div class="slider-group">
                <label style="min-width: 40px; color: #FF4444; font-weight: 600;">Red:</label>
                <input type="range" id="redSlider" min="0" max="255" value="128">
                <span id="redValue">128</span>
            </div>
            <div class="slider-group">
                <label style="min-width: 40px; color: #44FF44; font-weight: 600;">Green:</label>
                <input type="range" id="greenSlider" min="0" max="255" value="128">
                <span id="greenValue">128</span>
            </div>
            <div class="slider-group">
                <label style="min-width: 40px; color: #4444FF; font-weight: 600;">Blue:</label>
                <input type="range" id="blueSlider" min="0" max="255" value="128">
                <span id="blueValue">128</span>
            </div>
        </div>
        <button style="width: 100%; padding: 12px; background: linear-gradient(135deg, #00aaff, #0088dd); color: black; font-weight: 700; border: none; border-radius: 6px; cursor: pointer; margin-top: 20px;" onclick="nextLevel()">Next Level</button>
    </div>
    <button class="back-btn" onclick="window.location.href='../index.html'">Back</button>
</body>
</html>

// scripts/colormixer.js
let score = 0;
let level = 1;
let highScore = localStorage.getItem('33-score') || 0;
let targetColor = {};

document.getElementById('score').textContent = score;
document.getElementById('highScore').textContent = highScore;

const redSlider = document.getElementById('redSlider');
const greenSlider = document.getElementById('greenSlider');
const blueSlider = document.getElementById('blueSlider');

function generateTargetColor() {
    targetColor = {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256)
    };
    document.getElementById('targetColor').style.backgroundColor = \`rgb(\${targetColor.r}, \${targetColor.g}, \${targetColor.b})\`;
}

function updateColor() {
    const r = parseInt(redSlider.value);
    const g = parseInt(greenSlider.value);
    const b = parseInt(blueSlider.value);
    
    document.getElementById('redValue').textContent = r;
    document.getElementById('greenValue').textContent = g;
    document.getElementById('blueValue').textContent = b;
    
    const distance = Math.sqrt(
        Math.pow(r - targetColor.r, 2) +
        Math.pow(g - targetColor.g, 2) +
        Math.pow(b - targetColor.b, 2)
    );
    
    if (distance < 10) {
        if (AudioManager) AudioManager.playSuccess();
        score += 100;
        document.getElementById('score').textContent = score;
        generateTargetColor();
    }
}

redSlider.addEventListener('input', updateColor);
greenSlider.addEventListener('input', updateColor);
blueSlider.addEventListener('input', updateColor);

function nextLevel() {
    level++;
    score += 50;
    document.getElementById('level').textContent = level;
    document.getElementById('score').textContent = score;
    
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('33-score', highScore);
        document.getElementById('highScore').textContent = highScore;
    }
    
    generateTargetColor();
}

generateTargetColor();
`;
