let clicks = 0;
let highScore = localStorage.getItem('7-score') || 0;

const clickButton = document.getElementById('clickBtn');
const clickCountElements = document.querySelectorAll('#clickCount');
const highScoreElement = document.getElementById('highScore');

highScoreElement.textContent = highScore;

clickButton.addEventListener('click', () => {
    clicks++;
    
    clickCountElements.forEach(el => {
        el.textContent = clicks;
    });
    
    if (clicks > highScore) {
        highScore = clicks;
        localStorage.setItem('7-score', highScore);
        highScoreElement.textContent = highScore;
    }
    
    clickButton.style.transform = 'scale(0.95)';
    setTimeout(() => {
        clickButton.style.transform = 'scale(1)';
    }, 100);
});