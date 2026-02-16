const QUESTIONS = [
    { q: 'What does HTML stand for?', options: ['HyperText Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language'], correct: 0 },
    { q: 'What is the largest planet in our solar system?', options: ['Saturn', 'Jupiter', 'Neptune', 'Mars'], correct: 1 },
    { q: 'What is the smallest country in the world?', options: ['Monaco', 'Liechtenstein', 'Vatican City', 'San Marino'], correct: 2 },
    { q: 'Who invented the telephone?', options: ['Thomas Edison', 'Alexander Graham Bell', 'Nikola Tesla', 'George Westinghouse'], correct: 1 },
    { q: 'What is the capital of France?', options: ['Lyon', 'Paris', 'Marseille', 'Toulouse'], correct: 1 },
    { q: 'What is 10 * 5?', options: ['40', '45', '50', '55'], correct: 2 },
    { q: 'What does CSS stand for?', options: ['Creative Style Sheets', 'Cascading Style Sheets', 'Computer Style Sheets', 'Colorful Style Sheets'], correct: 1 },
    { q: 'What is the speed of light?', options: ['300,000 km/s', '150,000 km/s', '450,000 km/s', '600,000 km/s'], correct: 0 },
    { q: 'Which programming language is used for web development?', options: ['Python', 'Java', 'JavaScript', 'C++'], correct: 2 },
    { q: 'What is the chemical symbol for Gold?', options: ['Go', 'Gd', 'Au', 'Ag'], correct: 2 }
];

let currentQuestion = 0;
let score = 0;
let highScore = localStorage.getItem('28-score') || 0;
let answered = false;

function renderQuestion() {
    const q = QUESTIONS[currentQuestion];
    document.getElementById('question_text').textContent = `${currentQuestion + 1}. ${q.q}`;
    document.getElementById('score').textContent = score;
    document.getElementById('question').textContent = `${currentQuestion + 1}/10`;
    
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    answered = false;
    
    q.options.forEach((option, idx) => {
        const btn = document.createElement('div');
        btn.className = 'option';
        btn.textContent = option;
        btn.addEventListener('click', () => selectAnswer(idx));
        optionsDiv.appendChild(btn);
    });
}

function selectAnswer(idx) {
    if (answered) return;
    answered = true;
    
    const q = QUESTIONS[currentQuestion];
    const options = document.querySelectorAll('.option');
    
    if (idx === q.correct) {
        options[idx].classList.add('correct');
        score += 10;
    } else {
        options[idx].classList.add('wrong');
        options[q.correct].classList.add('correct');
    }
    
    setTimeout(nextQuestion, 1500);
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < QUESTIONS.length) {
        renderQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('28-score', highScore);
    }
    alert(`Quiz Complete! Final Score: ${score}`);
    resetGame();
}

function resetGame() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('highScore').textContent = highScore;
    renderQuestion();
}

document.getElementById('highScore').textContent = highScore;
renderQuestion();