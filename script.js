let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
const maxAttempts = 10;

function checkGuess() {
    const guess = parseInt(document.getElementById('guess').value);
    const message = document.getElementById('message');
    const attemptsDisplay = document.getElementById('attempts');

    if (isNaN(guess) || guess < 1 || guess > 100) {
        message.textContent = 'Por favor, insira um número válido entre 1 e 100.';
        return;
    }

    attempts++;
    attemptsDisplay.textContent = `Tentativas: ${attempts}/${maxAttempts}`;

    if (guess < randomNumber) {
        message.textContent = 'Muito baixo! Tente novamente.';
        message.style.color = 'blue';
    } else if (guess > randomNumber) {
        message.textContent = 'Muito alto! Tente novamente.';
        message.style.color = 'red';
    } else {
        message.textContent = `Parabéns! Você acertou em ${attempts} tentativas.`;
        message.style.color = 'green';
        disableInput();
        return;
    }

    if (attempts >= maxAttempts) {
        message.textContent = `Fim de jogo! O número era ${randomNumber}.`;
        message.style.color = 'black';
        disableInput();
    }
}

function resetGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    document.getElementById('guess').value = '';
    document.getElementById('message').textContent = '';
    document.getElementById('attempts').textContent = '';
    document.getElementById('guess').disabled = false;
    document.querySelector('button').disabled = false;
    document.getElementById('message').style.color = '#333';
}

function disableInput() {
    document.getElementById('guess').disabled = true;
    document.querySelector('button').disabled = true;
}