const canvas = document.getElementById("rainCanvas");
const ctx = canvas.getContext("2d");

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

const raindrops = [];

function createRaindrop() {
    return {
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 20 + 10,
        speed: Math.random() * 5 + 2,
    };
}

for (let i = 0; i < 500; i++) {
    raindrops.push(createRaindrop());
}

function drawRain() {
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = "#00aaff";
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.5;

    raindrops.forEach((drop) => {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.stroke();

        drop.y += drop.speed;
        if (drop.y > height) {
            drop.y = -drop.length;
            drop.x = Math.random() * width;
        }
    });

    requestAnimationFrame(drawRain);
}

drawRain();

window.addEventListener("resize", () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
});