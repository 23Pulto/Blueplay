let score = 0;
let level = 1;
let highScore = localStorage.getItem('33-score') || 0;

document.getElementById('score').textContent = score;
document.getElementById('highScore').textContent = highScore;

function startGame() {
    if (AudioManager) AudioManager.playClick();
    alert('Color Mixer Game - Coming Soon!\nVisit the IMPLEMENTATION_GUIDE.js file in the root to see how to build this game.\n\nGame Idea: Mix RGB sliders to match the target color!');
}
