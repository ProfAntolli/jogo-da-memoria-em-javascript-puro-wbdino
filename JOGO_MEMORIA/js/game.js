//let e constante
const cards = document.querySelectorAll('.card');
let virou_a_carta = false;
let tab_bloqueado = false;
let carta_um, carta_dois;

//função para virar a carta
function flip_card() {
  if (tab_bloqueado) return;
  if (this === carta_um) return;

  this.classList.add('flip');

  if (!virou_a_carta) {
    //primeiro click
    virou_a_carta = true;
    carta_um = this;

    return;
  }

  //segundo click
  carta_dois = this;

  check_for_match();
}

//compara o atributo para verificar se formam um par
function check_for_match() {
  let isMatch = carta_um.dataset.ghost === carta_dois.dataset.ghost;

  isMatch ? disableCards() : unflipCards();
}

//remove o evento de clique das cartas quando formam um par
function disableCards() {
  carta_um.removeEventListener('click', flip_card);
  carta_dois.removeEventListener('click', flip_card);

  reset_board();
}


//bloqueia temporariamente o tabuleiro
function unflipCards() {
  tab_bloqueado = true;

  setTimeout(() => {
    carta_um.classList.remove('flip');
    carta_dois.classList.remove('flip');

    reset_board();
  }, 1500);
}

//reseta as variaveis
function reset_board() {
  [virou_a_carta, tab_bloqueado] = [false, false];
  [carta_um, carta_dois] = [null, null];
}

//embaralha as cartas
(function shuffle() {
  cards.forEach(card => {
    let ramdomPos = Math.floor(Math.random() * 12);
    card.style.order = ramdomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flip_card));