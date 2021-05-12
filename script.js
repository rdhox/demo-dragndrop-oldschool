// Variables
let cardCount = 0;
const cardTab = [];
let cardActive = null;
let isDragOn = false;
let X = 0;
let Y = 0;

const button = document.getElementById('newCard');

// Handle Events
button.onclick = function(event) {
  const card = document.createElement('div');
  card.setAttribute('class', 'card');
  card.setAttribute('h', cardCount);
  const text = document.createElement('div');
  text.setAttribute('class', 'number');
  text.innerHTML = cardCount;
  card.appendChild(text);
  card.onmousedown = event => {
    const { clientX, clientY } = event;
    const c = event.target;
    cardActive = c.getAttribute('h');
    c.style.position = 'absolute';
    c.style.top = clientX
    c.style.left = clientY;
    document.querySelector('body').appendChild(c);
    isDragOn = true;
  };
  cardCount += 1;
  cardTab.push(card);
  document.querySelector('body').appendChild(card);
}

document.addEventListener('mousemove', event => {
  if(isDragOn) {
    const { clientX, clientY } = event;
    X = clientX;
    Y = clientY;
    if (cardTab.length > 0) {
      const card = cardTab.find(c => c.getAttribute('h') === cardActive);
      card.style.top = Y;
      card.style.left = X;
    }
  }
})

document.addEventListener('mouseup', (event) => {
  console.log(event);
  const { target } = event;
  if (target.getAttribute('id') === 'colonne') {
    if (cardTab.length > 0) {
      const card = cardTab.find(c => c.getAttribute('h') === cardActive);
      card.style.left = 0;
      card.style.top = 0;
      card.style.position = 'relative';
      target.appendChild(card);
    }
  }
  isDragOn = false;
  cardActive = null;
})