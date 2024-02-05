const input = document.querySelector('.login__input');
const button = document.querySelector('.login__button');
const form = document.querySelector('.login-form');
const difficultyButtons = document.querySelectorAll('.difficulty-button');

// Função para validar a entrada
const validateInput = ({ target }) => {
  const isInputValid = target.value.length > 3;

  // Ative ou desative os botões de dificuldade
  difficultyButtons.forEach(btn => btn.disabled = !isInputValid);

  // Se a entrada for válida, permita a navegação para a página do jogo
  if (isInputValid) {
    form.setAttribute('action', 'pages/facil.html'); // Página inicial, você pode ajustar conforme necessário
  } else {
    form.removeAttribute('action');
  }
}

// Adicione ouvintes de eventos
input.addEventListener('input', validateInput);

difficultyButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    const difficulty = event.target.getAttribute('data-difficulty');
    localStorage.setItem('difficulty', difficulty);
    form.setAttribute('action', `pages/${difficulty}.html`); // Use a página correspondente ao nível
    form.submit();
  });
});
