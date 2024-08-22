document.addEventListener('DOMContentLoaded', () => {
    const cardImages = [
      '🍎', '🍎',
      '🍌', '🍌',
      '🍇', '🍇',
      '🍉', '🍉',
      '🍒', '🍒',
      '🍍', '🍍',
      '🥭', '🥭',
      '🥥', '🥥'
    ];
  
    let shuffledCards = shuffleArray(cardImages);
    let selectedCards = [];
    let matchedPairs = 0;
  
    const memoryContainer = document.getElementById('memoryGame');
    const resetButton = document.getElementById('resetButton');
    const statusMessage = document.getElementById('statusMessage');
  
    function createCard(image) {
      const card = document.createElement('div');
      card.classList.add('memory_card');
      card.dataset.image = image;
      card.textContent = image;
      card.addEventListener('click', flipCard);
      return card;
    }
  
    function setupGame() {
      shuffledCards.forEach(image => {
        const card = createCard(image);
        memoryContainer.appendChild(card);
      });
      resetButton.style.display = 'none';
      statusMessage.textContent = '';
    }
  
    function flipCard() {
      if (selectedCards.length === 2 || this.classList.contains('flipped') || this.classList.contains('matched')) {
        return;
      }
  
      this.classList.add('flipped');
      selectedCards.push(this);
  
      if (selectedCards.length === 2) {
        checkForMatch();
      }
    }
  
    function checkForMatch() {
      const [firstCard, secondCard] = selectedCards;
  
      if (firstCard.dataset.image === secondCard.dataset.image) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedPairs++;
        if (matchedPairs === cardImages.length / 2) {
          statusMessage.textContent = 'Congratulations! You matched all pairs!';
          resetButton.style.display = 'block';
        }
      } else {
        setTimeout(() => {
          firstCard.classList.remove('flipped');
          secondCard.classList.remove('flipped');
        }, 1000);
      }
  
      selectedCards = [];
    }
  
    function resetGame() {
      shuffledCards = shuffleArray(cardImages);
      memoryContainer.innerHTML = '';
      selectedCards = [];
      matchedPairs = 0;
      setupGame();
    }
  
    function shuffleArray(array) {
      let currentIndex = array.length, randomIndex;
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
      }
      return array;
    }
  
    resetButton.addEventListener('click', resetGame);
  
    setupGame();
  });  