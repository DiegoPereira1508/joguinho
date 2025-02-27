let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
const maxAttempts = 10;
let totalGames = 0;
let wins = 0;
let score = 0;
const story = [
    "Você está preso em uma ilha deserta. Adivinhe o número para escapar!",
    "Agora você está em uma floresta sombria. Adivinhe o número para encontrar o tesouro!",
    "Você está em um castelo assustador. Adivinhe o número para fugir!",
];

function checkGuess() {
    const guessInput = document.getElementById('guess');
    const guess = parseInt(guessInput.value);
    const message = document.getElementById('message');
    const attemptsDisplay = document.getElementById('attempts');
    const hint = document.getElementById('hint');

    if (isNaN(guess) || guess < 1 || guess > 100) {
        message.textContent = 'Por favor, insira um número válido entre 1 e 100.';
        message.style.color = '#e74c3c';
        return;
    }

    attempts++;
    attemptsDisplay.textContent = `Tentativas: ${attempts}/${maxAttempts}`;

    if (guess < randomNumber) {
        message.textContent = 'Muito baixo! Tente novamente.';
        message.style.color = '#e74c3c';
        playSound('wrongSound');
        message.classList.add('shake');
        setTimeout(() => message.classList.remove('shake'), 500);
    } else if (guess > randomNumber) {
        message.textContent = 'Muito alto! Tente novamente.';
        message.style.color = '#e74c3c';
        playSound('wrongSound');
        message.classList.add('shake');
        setTimeout(() => message.classList.remove('shake'), 500);
    } else {
        message.textContent = `Parabéns! Você acertou em ${attempts} tentativas.`;
        message.style.color = '#2ecc71';
        playSound('correctSound');
        message.classList.add('celebrate');
        setTimeout(() => message.classList.remove('celebrate'), 500);
        updateScore();
        saveHighScore();
        disableInput();
        return;
    }

    if (attempts >= maxAttempts) {
        message.textContent = `Fim de jogo! O número era ${randomNumber}.`;
        message.style.color = '#e74c3c';
        disableInput();
    }

    giveHint();
}

function giveHint() {
    const hint = document.getElementById('hint');
    if (attempts === 3) {
        hint.textContent = `Dica: O número é ${randomNumber % 2 === 0 ? 'par' : 'ímpar'}.`;
    } else if (attempts === 5) {
        hint.textContent = `Dica: O número é ${randomNumber > 50 ? 'maior que 50' : 'menor ou igual a 50'}.`;
    }
}

function updateScore() {
    score = (maxAttempts - attempts) * 10; // Pontuação baseada em tentativas
    document.getElementById('score').textContent = `Pontuação: ${score}`;
}

function saveHighScore() {
    const highScore = parseInt(localStorage.getItem('highScore')) || 0;
    if (score > highScore) {
        localStorage.setItem('highScore', score);
        document.getElementById('highScore').textContent = `Recorde: ${score}`;
    }
}

function updateStats() {
    totalGames++;
    if (attempts <= maxAttempts) wins++;
    const winRate = ((wins / totalGames) * 100).toFixed(2);
    document.getElementById('stats').textContent = `Jogos: ${totalGames} | Vitórias: ${wins} | Taxa de acerto: ${winRate}%`;
}

function resetGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    document.getElementById('guess').value = '';
    document.getElementById('message').textContent = '';
    document.getElementById('hint').textContent = '';
    document.getElementById('attempts').textContent = 'Tentativas: 0/10';
    document.getElementById('guess').disabled = false;
    document.querySelector('button').disabled = false;
    document.getElementById('message').style.color = '#e74c3c';
    updateStory();
}

function updateStory() {
    document.getElementById('story').textContent = story[totalGames % story.length];
}

function disableInput() {
    document.getElementById('guess').disabled = true;
    document.querySelector('button').disabled = true;
}

function playSound(soundId) {
    const sound = document.getElementById(soundId);
    sound.currentTime = 0;
    sound.play();
}

function toggleTheme() {
    document.body.classList.toggle('light-theme');
}

// Inicializa o jogo
updateStory();
document.getElementById('highScore').textContent = `Recorde: ${localStorage.getItem('highScore') || 0}`;
