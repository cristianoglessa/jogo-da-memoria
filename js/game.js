const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const difficultyButtons = document.querySelectorAll('.difficulty-button');

const characters = [
  'asterix', 'bart', 'capitao-caverna', 'cheetos', 'eufrazino', 'formiga-atomica',
  'frajola', 'frango', 'fred', 'garfield', 'genio-aladin', 'goku', 'jetsonm', 'jhoni-bravo',
  'jick-mutley', 'ligeirinho', 'marvin', 'mascara', 'mutley', 'olivia', 'orko', 'pateta',
  'patolino', 'perna-longa', 'pica-pau', 'pink', 'pinochio', 'porquinho', 'robo', 'salsicha',
  'sapo', 'tartaruga', 'tutubarao', 'ze-carioca', 'pepe-legal',
];

let firstCard = '';
let secondCard = '';
let disabledCardsCount = 0;
let numberOfCards = 12; // Número padrão de cartas para o nível fácil

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === numberOfCards * 2) {
    clearInterval(loop);

    setTimeout(() => {
      alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML}`);
    }, 900);
  }
}

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {
    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');
    disabledCardsCount += 2;

    firstCard = '';
    secondCard = '';

    checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';
    }, 500);
  }
}

const revealCard = ({ target }) => {
  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {
    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;
  } else if (secondCard === '') {
    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();
  }
}

const createCard = (character) => {
  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../images/${character}.jpg')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character)

  return card;
}

const loadGame = (difficulty) => {
  switch (difficulty) {
    case 'facil':
      numberOfCards = 12;
      break;
    case 'medio':
      numberOfCards = 24;
      break;
    case 'dificil':
      numberOfCards = 35;
      break;
    default:
      numberOfCards = 12;
  }

  const duplicateCharacters = [...characters.slice(0, numberOfCards), ...characters.slice(0, numberOfCards)];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
}

const startTimer = () => {
  loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);
}

difficultyButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    const difficulty = event.target.getAttribute('data-difficulty');
    localStorage.setItem('difficulty', difficulty);
    grid.innerHTML = '';
    startTimer();
    loadGame(difficulty);
  });
});

window.onload = () => {
  /*spanPlayer.innerHTML = localStorage.getItem('player');*/
  startTimer();

  const storedDifficulty = localStorage.getItem('difficulty');
  if (storedDifficulty) {
    loadGame(storedDifficulty);
  } else {
    loadGame('facil');
  }
}
