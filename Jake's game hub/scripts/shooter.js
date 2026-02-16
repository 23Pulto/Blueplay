const canvas = document.getElementById("shooterCanvas");
const ctx = canvas.getContext("2d");

canvas.width = Math.min(window.innerWidth - 40, 1000);
canvas.height = window.innerHeight - 120;

let score = 0;
let wave = 1;
let highScore = localStorage.getItem('5-score') || 0;

document.getElementById('score').textContent = score;
document.getElementById('wave').textContent = wave;
document.getElementById('highScore').textContent = highScore;

const player = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    width: 50,
    height: 20,
    color: "#00aaff",
    speed: 7,
};

const bullets = [];
const enemies = [];

function spawnEnemy() {
    enemies.push({
        x: Math.random() * canvas.width,
        y: 0,
        width: 40,
        height: 20,
        color: "red",
        speed: Math.random() * 3 + 2,
    });
}

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBullets() {
    bullets.forEach((bullet) => {
        ctx.fillStyle = "yellow";
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });
}

function drawEnemies() {
    enemies.forEach((enemy) => {
        ctx.fillStyle = enemy.color;
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });
}

function updateBullets() {
    bullets.forEach((bullet, index) => {
        bullet.y -= bullet.speed;
        if (bullet.y + bullet.height < 0) {
            bullets.splice(index, 1);
        }
    });
}

function updateEnemies() {
    enemies.forEach((enemy, index) => {
        enemy.y += enemy.speed;
        if (enemy.y > canvas.height) {
            enemies.splice(index, 1);
        }

        bullets.forEach((bullet, bIndex) => {
            if (
                bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y
            ) {
                enemies.splice(index, 1);
                bullets.splice(bIndex, 1);
                score += 10;
                document.getElementById('score').textContent = score;
                
                if (score % 100 === 0) {
                    wave++;
                    document.getElementById('wave').textContent = wave;
                }
                
                if (score > highScore) {
                    highScore = score;
                    localStorage.setItem('5-score', highScore);
                    document.getElementById('highScore').textContent = highScore;
                }
            }
        });

        if (
            enemy.x < player.x + player.width &&
            enemy.x + enemy.width > player.x &&
            enemy.y < player.y + player.height &&
            enemy.y + enemy.height > player.y
        ) {
            alert("Game Over");
            window.location.reload();
        }
    });
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && player.x > 0) player.x -= player.speed;
    if (event.key === "ArrowRight" && player.x + player.width < canvas.width) player.x += player.speed;
    if (event.key === " ") {
        bullets.push({
            x: player.x + player.width / 2 - 5,
            y: player.y,
            width: 10,
            height: 20,
            speed: 10,
        });
    }
});

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPlayer();
    drawBullets();
    drawEnemies();

    updateBullets();
    updateEnemies();

    requestAnimationFrame(gameLoop);
}

setInterval(spawnEnemy, 1000);

gameLoop();