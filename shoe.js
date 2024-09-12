const { suits, tens } = require("./consts");
const makeDeck = () => {
  let deck = [];
  for (let i = 0; i < 4; i++) {
    deck.push(...suits);
  }
  return deck;
};

const makeShoe = (numberOfDecks) => {
  let shoe = [];
  for (let i = 0; i < numberOfDecks; i++) {
    shoe.push(...makeDeck());
  }

  return shuffleArray(shoe);
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements at i and j
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

module.exports.makeShoe = makeShoe;
