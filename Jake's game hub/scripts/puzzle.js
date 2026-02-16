const canvas = document.getElementById("puzzleCanvas");
const ctx = canvas.getContext("2d");

canvas.width = Math.min(window.innerWidth - 40, 400);
canvas.height = canvas.width;

const gridSize = 4;
const tileSize = canvas.width / gridSize;
let tiles = [];
let emptyTile = { x: gridSize - 1, y: gridSize - 1 };
let moves = 0;
let highScore = localStorage.getItem('3-score') || 100;

document.getElementById('moves').textContent = moves;
document.getElementById('highScore').textContent = highScore;

function initTiles() {
    tiles = [];
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            if (x === gridSize - 1 && y === gridSize - 1) continue;
            tiles.push({ x, y, value: y * gridSize + x + 1 });
        }
    }
    shuffleTiles();
}

function shuffleTiles() {
    for (let i = 0; i < 1000; i++) {
        const moves = getValidMoves();
        const move = moves[Math.floor(Math.random() * moves.length)];
        moveTile(move.x, move.y);
    }
}

function drawTiles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    tiles.forEach((tile) => {
        ctx.fillStyle = "#00aaff";
        ctx.fillRect(tile.x * tileSize, tile.y * tileSize, tileSize, tileSize);
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(
            tile.value,
            tile.x * tileSize + tileSize / 2,
            tile.y * tileSize + tileSize / 2
        );
    });
}

function getValidMoves() {
    const moves = [];
    if (emptyTile.x > 0) moves.push({ x: emptyTile.x - 1, y: emptyTile.y });
    if (emptyTile.x < gridSize - 1) moves.push({ x: emptyTile.x + 1, y: emptyTile.y });
    if (emptyTile.y > 0) moves.push({ x: emptyTile.x, y: emptyTile.y - 1 });
    if (emptyTile.y < gridSize - 1) moves.push({ x: emptyTile.x, y: emptyTile.y + 1 });
    return moves;
}

function moveTile(x, y) {
    const tile = tiles.find((t) => t.x === x && t.y === y);
    if (tile) {
        tile.x = emptyTile.x;
        tile.y = emptyTile.y;
        emptyTile.x = x;
        emptyTile.y = y;
        moves++;
        document.getElementById('moves').textContent = moves;
        
        if (checkWin()) {
            if (moves < highScore) {
                highScore = moves;
                localStorage.setItem('3-score', highScore);
                document.getElementById('highScore').textContent = highScore;
            }
        }
    }
}

function checkWin() {
    let expected = 1;
    for (let tile of tiles) {
        if (tile.value !== expected) return false;
        expected++;
    }
    return true;
}

document.addEventListener("keydown", (event) => {
    const moves = getValidMoves();
    let move;
    if (event.key === "ArrowUp") move = moves.find((m) => m.y > emptyTile.y);
    if (event.key === "ArrowDown") move = moves.find((m) => m.y < emptyTile.y);
    if (event.key === "ArrowLeft") move = moves.find((m) => m.x > emptyTile.x);
    if (event.key === "ArrowRight") move = moves.find((m) => m.x < emptyTile.x);
    if (move) moveTile(move.x, move.y);
    drawTiles();
});

initTiles();
drawTiles();