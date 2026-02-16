const GAMES = [
    { id: 1, name: 'Snake', category: 'classic', difficulty: 'Easy', file: 'games/snake.html', description: 'Classic snake game. Eat food, grow longer, avoid yourself. Arrow keys to move.' },
    { id: 2, name: 'Pong', category: 'classic', difficulty: 'Medium', file: 'games/pong.html', description: 'Battle against AI in this timeless classic. Arrow keys to move your paddle.' },
    { id: 3, name: 'Puzzle Slide', category: 'puzzle', difficulty: 'Hard', file: 'games/puzzle.html', description: 'Slide numbered tiles to arrange them in order. Test your logic!' },
    { id: 4, name: 'RPG Quest', category: 'action', difficulty: 'Medium', file: 'games/rpg.html', description: 'Explore and collect items while avoiding enemies. Arrow keys to move.' },
    { id: 5, name: 'Space Blaster', category: 'action', difficulty: 'Hard', file: 'games/shooter.html', description: 'Blast waves of enemies. Arrow keys to move, Space to shoot.' },
    { id: 6, name: 'Brick Breaker', category: 'arcade', difficulty: 'Medium', file: 'games/arcade1.html', description: 'Break bricks with the ball. Arrow keys to move the paddle.' },
    { id: 7, name: 'Clicker Realm', category: 'arcade', difficulty: 'Easy', file: 'games/clicker.html', description: 'Click rapidly to accumulate score. Simple fun, addictive gameplay!' },
    { id: 8, name: 'Flappy Bird', category: 'arcade', difficulty: 'Hard', file: 'games/flappy.html', description: 'Navigate through pipes by tapping. One-tap controls, tough challenge!' },
    { id: 9, name: 'Memory Match', category: 'puzzle', difficulty: 'Medium', file: 'games/memory.html', description: 'Find matching pairs. Train your memory and concentration skills.' },
    { id: 10, name: 'Whack-a-Mole', category: 'arcade', difficulty: 'Medium', file: 'games/whack.html', description: 'Click moles as fast as you can. Test your reflexes!' },
    { id: 11, name: 'Color Blast', category: 'puzzle', difficulty: 'Easy', file: 'games/colorblast.html', description: 'Match colors to clear the board. Fast-paced color puzzle action.' },
    { id: 12, name: 'Breakout Max', category: 'arcade', difficulty: 'Hard', file: 'games/breakout.html', description: 'Advanced brick breaker with power-ups. More challenging than classic!' },
    { id: 13, name: 'Space Invaders', category: 'action', difficulty: 'Hard', file: 'games/invaders.html', description: 'Classic shooter against alien waves. Arrow keys, Space to shoot.' },
    { id: 14, name: 'Pac-Runner', category: 'arcade', difficulty: 'Medium', file: 'games/pacman.html', description: 'Maze game with smart AI ghosts. Eat pellets, avoid enemies.' },
    { id: 15, name: 'Dino Runner', category: 'arcade', difficulty: 'Medium', file: 'games/dino.html', description: 'Jump over obstacles in endless fun. Space to jump, dodge cacti!' },
    { id: 16, name: 'Tetris Battle', category: 'puzzle', difficulty: 'Hard', file: 'games/tetris.html', description: 'Stack blocks before they overflow. Rotate and place strategically.' },
    { id: 17, name: 'Simon Says', category: 'puzzle', difficulty: 'Hard', file: 'games/simon.html', description: 'Repeat the color pattern. Memory game with increasing difficulty.' },
    { id: 18, name: 'Tic-Tac-Toe Pro', category: 'puzzle', difficulty: 'Medium', file: 'games/tictactoe.html', description: 'Beat the unbeatable AI. Classic strategy game with smart opponent.' },
    { id: 19, name: '2048', category: 'puzzle', difficulty: 'Hard', file: 'games/2048.html', description: 'Swipe and combine numbers to reach 2048. Addictive puzzle!' },
    { id: 20, name: 'Asteroid Dodge', category: 'action', difficulty: 'Hard', file: 'games/asteroids.html', description: 'Survive asteroid storms. Move and avoid, increase your highscore!' },
    { id: 21, name: 'Pipe Puzzle', category: 'puzzle', difficulty: 'Medium', file: 'games/pipes.html', description: 'Connect pipes before water flows. Rotation puzzle challenge.' },
    { id: 22, name: 'Word Finder', category: 'puzzle', difficulty: 'Medium', file: 'games/wordfinder.html', description: 'Find hidden words in the grid. Word search game with scoring.' },
    { id: 23, name: 'Hangman', category: 'puzzle', difficulty: 'Medium', file: 'games/hangman.html', description: 'Guess the word before running out of tries. Classic word game.' },
    { id: 24, name: 'Connect 4', category: 'puzzle', difficulty: 'Hard', file: 'games/connect4.html', description: 'Get 4 in a row to win against AI. Strategy puzzle game.' },
    { id: 25, name: 'Minesweeper', category: 'puzzle', difficulty: 'Hard', file: 'games/minesweeper.html', description: 'Reveal safe tiles without hitting mines. Logic and strategy!' },
    { id: 26, name: 'Typing Racer', category: 'arcade', difficulty: 'Medium', file: 'games/typing.html', description: 'Type fast to move your car. Typing speed game with racing.' },
    { id: 27, name: 'Marble Maze', category: 'action', difficulty: 'Medium', file: 'games/marble.html', description: 'Tilt the maze to guide the marble. Physics-based puzzle.' },
    { id: 28, name: 'Quiz Battle', category: 'puzzle', difficulty: 'Medium', file: 'games/quiz.html', description: 'Answer questions to score points. Test your knowledge!' },
    { id: 29, name: 'Card Flip', category: 'arcade', difficulty: 'Easy', file: 'games/cardflip.html', description: 'Flip cards and find matching pairs. Memory matching game.' },
    { id: 30, name: 'Ball Blast', category: 'action', difficulty: 'Hard', file: 'games/ballblast.html', description: 'Shoot balls to destroy targets. Cannon-based action game.' },
    { id: 31, name: 'Dodge Master', category: 'action', difficulty: 'Hard', file: 'games/dodge.html', description: 'Dodge incoming obstacles. Arrow keys to move, survive longest!' },
    { id: 32, name: 'Number Blaster', category: 'puzzle', difficulty: 'Medium', file: 'games/numberblast.html', description: 'Click numbers in sequence. Speed and accuracy puzzle.' },
    { id: 33, name: 'Color Mixer', category: 'puzzle', difficulty: 'Medium', file: 'games/colormixer.html', description: 'Mix colors to match targets. Creative color puzzle game.' },
    { id: 34, name: 'Brick Maze', category: 'puzzle', difficulty: 'Hard', file: 'games/brickmaze.html', description: 'Navigate through brick mazes. Logical puzzle with timer.' },
    { id: 35, name: 'Jump Quest', category: 'arcade', difficulty: 'Medium', file: 'games/jumpquest.html', description: 'Jump between platforms. Classic platformer challenge.' },
    { id: 36, name: 'Bubble Pop', category: 'arcade', difficulty: 'Easy', file: 'games/bubblepop.html', description: 'Pop bubbles before they fall. Fast-paced arcade action.' },
    { id: 37, name: 'Galaxy Shooter', category: 'action', difficulty: 'Hard', file: 'games/galaxy.html', description: 'Shoot aliens in space. Intense space combat game.' },
    { id: 38, name: 'Gem Match', category: 'puzzle', difficulty: 'Medium', file: 'games/gemmatch.html', description: 'Match gems in rows. Swipe to move gems, chain combos!' },
    { id: 39, name: 'Speed Keys', category: 'rhythm', difficulty: 'Hard', file: 'games/speedkeys.html', description: 'Hit keys to the beat. Rhythm game with increasing speed.' },
    { id: 40, name: 'Monster Runner', category: 'arcade', difficulty: 'Medium', file: 'games/monster.html', description: 'Run and collect coins. Avoid obstacles, collect treasures!' },
    { id: 41, name: 'Ice Slider', category: 'puzzle', difficulty: 'Medium', file: 'games/iceslider.html', description: 'Slide on ice fields. Slippery physics-based puzzle.' },
    { id: 42, name: 'Fire Match', category: 'puzzle', difficulty: 'Easy', file: 'games/firematch.html', description: 'Match fire elements. Elemental puzzle game with combos.' },
    { id: 43, name: 'Sky Chase', category: 'arcade', difficulty: 'Hard', file: 'games/skychase.html', description: 'Chase enemies through the sky. Flying arcade action.' },
    { id: 44, name: 'Block Blast', category: 'puzzle', difficulty: 'Medium', file: 'games/blockblast.html', description: 'Clear blocks strategically. Timing and planning puzzle.' },
    { id: 45, name: 'Speed Typer', category: 'arcade', difficulty: 'Medium', file: 'games/speedtyper.html', description: 'Type words before time runs out. Typing speed challenge.' },
    { id: 46, name: 'Laser Grid', category: 'puzzle', difficulty: 'Hard', file: 'games/lasergrid.html', description: 'Arrange lasers to hit targets. Physics puzzle challenge.' },
    { id: 47, name: 'Night Runner', category: 'arcade', difficulty: 'Medium', file: 'games/nightrunner.html', description: 'Run through night levels. Dodge obstacles, collect points!' },
    { id: 48, name: 'Electric Storm', category: 'action', difficulty: 'Hard', file: 'games/electric.html', description: 'Survive electric attacks. Lightning-fast action game.' },
    { id: 49, name: 'Fortune Wheel', category: 'arcade', difficulty: 'Easy', file: 'games/fortune.html', description: 'Spin the wheel and win. Luck-based arcade game.' },
    { id: 50, name: 'Quantum Quest', category: 'puzzle', difficulty: 'Hard', file: 'games/quantum.html', description: 'Quantum puzzle game. Complex logic and strategy required.' }
];

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    const modal = document.getElementById('modal');
    const joinBtn = document.getElementById('joinBtn');
    const usernameInput = document.getElementById('username');
    const userDisplay = document.getElementById('userDisplay');
    const settingsPanel = document.getElementById('settingsPanel');

    const storedUsername = localStorage.getItem('username');

    if (storedUsername) {
        userDisplay.textContent = storedUsername;
        modal.style.display = 'none';
        renderGames(GAMES);
    } else {
        modal.style.display = 'flex';
    }

    joinBtn.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        if (username) {
            localStorage.setItem('username', username);
            userDisplay.textContent = username;
            modal.style.display = 'none';
            renderGames(GAMES);
        }
    });

    usernameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') joinBtn.click();
    });

    // Close settings panel when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.settings-panel') && !e.target.closest('.settings-btn')) {
            if (settingsPanel.classList.contains('active')) {
                settingsPanel.classList.remove('active');
            }
        }
    });

    setupSearchAndFilter();
}

function renderGames(games) {
    const gameGrid = document.getElementById('gameGrid');
    gameGrid.innerHTML = '';

    if (games.length === 0) {
        gameGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #aaa; padding: 40px;">No games found. Try a different search!</p>';
        return;
    }

    games.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        
        const highScore = localStorage.getItem(`${game.id}-score`) || '0';
        
        gameCard.innerHTML = `
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <div class="game-info">
                <span class="game-category">${game.category.toUpperCase()}</span>
                <span class="game-difficulty">${game.difficulty}</span>
            </div>
            <div class="game-score">High Score: ${highScore}</div>
            <button onclick="launchGame('${game.file}')">PLAY NOW</button>
        `;
        
        gameGrid.appendChild(gameCard);
    });
}

function launchGame(file) {
    if (AudioManager) {
        AudioManager.playClick();
    }
    window.location.href = file;
}

function setupSearchAndFilter() {
    const searchInput = document.getElementById('search');
    const categoryBtns = document.querySelectorAll('.category-btn');

    // Set first button as active
    categoryBtns[0].classList.add('active');

    searchInput.addEventListener('input', filterGames);
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterGames();
        });
    });
}

function filterGames() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const activeBtn = document.querySelector('.category-btn.active');
    const activeCategory = activeBtn ? activeBtn.dataset.category : 'all';

    const filtered = GAMES.filter(game => {
        const matchesSearch = 
            game.name.toLowerCase().includes(searchInput) || 
            game.description.toLowerCase().includes(searchInput);
        
        const matchesCategory = activeCategory === 'all' || game.category === activeCategory;
        
        return matchesSearch && matchesCategory;
    });

    renderGames(filtered);
}

// Expose for global access
window.filterGames = filterGames;