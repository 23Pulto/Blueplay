const canvas = document.getElementById("rpgCanvas");
const ctx = canvas.getContext("2d");

canvas.width = Math.min(window.innerWidth - 40, 800);
canvas.height = Math.min(window.innerHeight - 200, 600);

let score = 0;
let itemCount = 0;
let enemyCount = 0;
let highScore = localStorage.getItem('4-score') || 0;

document.getElementById('score').textContent = score;
document.getElementById('items').textContent = itemCount;
document.getElementById('enemies').textContent = enemyCount;
document.getElementById('highScore').textContent = highScore;

const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 20,
    color: "#00aaff",
    speed: 5,
    inventory: [],
};

const enemies = [];
const items = [];

function spawnEnemy() {
    enemies.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 15,
        color: "red",
        speed: Math.random() * 2 + 1,
    });
    enemyCount++;
    document.getElementById('enemies').textContent = enemyCount;
}

function spawnItem() {
    items.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 10,
        color: "gold",
    });
}

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.size, player.size);
}

function drawEnemies() {
    enemies.forEach((enemy) => {
        ctx.fillStyle = enemy.color;
        ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);
    });
}

function drawItems() {
    items.forEach((item) => {
        ctx.fillStyle = item.color;
        ctx.fillRect(item.x, item.y, item.size, item.size);
    });
}

function updateEnemies() {
    enemies.forEach((enemy) => {
        const dx = player.x - enemy.x;
        const dy = player.y - enemy.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        enemy.x += (dx / distance) * enemy.speed;
        enemy.y += (dy / distance) * enemy.speed;

        if (
            enemy.x < player.x + player.size &&
            enemy.x + enemy.size > player.x &&
            enemy.y < player.y + player.size &&
            enemy.y + enemy.size > player.y
        ) {
            alert("Game Over");
            window.location.reload();
        }
    });
}

function updateItems() {
    items.forEach((item, index) => {
        if (
            item.x < player.x + player.size &&
            item.x + item.size > player.x &&
            item.y < player.y + player.size &&
            item.y + item.size > player.y
        ) {
            player.inventory.push("Item");
            items.splice(index, 1);
            score += 20;
            itemCount++;
            document.getElementById('score').textContent = score;
            document.getElementById('items').textContent = itemCount;
            
            if (score > highScore) {
                highScore = score;
                localStorage.setItem('4-score', highScore);
                document.getElementById('highScore').textContent = highScore;
            }
        }
    });
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") player.y -= player.speed;
    if (event.key === "ArrowDown") player.y += player.speed;
    if (event.key === "ArrowLeft") player.x -= player.speed;
    if (event.key === "ArrowRight") player.x += player.speed;
});

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPlayer();
    drawEnemies();
    drawItems();

    updateEnemies();
    updateItems();

    requestAnimationFrame(gameLoop);
}

setInterval(spawnEnemy, 2000);
setInterval(spawnItem, 5000);

gameLoop();