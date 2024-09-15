const { makeShoe } = require("./shoe");
const prompt = require("prompt-sync")({ sigint: true });
const { tens } = require("./consts");

function deal(shoe) {
  if (shoe.length < 12) {
    throw new Error("Shoe must contain at least 12 elements.");
  }

  let playerHand = [];
  let dealerHand = [];
  // Create a copy of the array to avoid modifying the original array
  let newShoe = [...shoe];

  for (let i = 0; i < 2; i++) {
    // Generate a random index
    let randomIndex = Math.floor(Math.random() * newShoe.length);
    let randomerIndex = Math.floor(Math.random() * newShoe.length);

    if (randomIndex === randomerIndex) {
      if (randomIndex === 0) {
        randomerIndex = 1;
      } else if (randomIndex === newShoe.length) {
        randomerIndex = randomIndex - 1;
      }
    }
    // Remove the element at the random index and push it to the removedElements array
    playerHand.push(newShoe.splice(randomIndex, 1)[0]);
    dealerHand.push(newShoe.splice(randomerIndex, 1)[0]);
  }

  return {
    playerHand: playerHand,
    dealerHand: dealerHand,
    shoe: newShoe,
  };
}

const initializeGame = (numberOfDecks, numberOfPlayers) => {
  const shoe = makeShoe(parseInt(numberOfDecks));
  let players = {};
  for (let i = 0; i < numberOfPlayers; i++) {
    players[`Player${i}`] = {
      hand1: [],
    };
  }
  return {
    shoe,
    players,
    dealer: [],
  };
};

const dealRoundOfCards = (game) => {
  let { players, shoe, dealer } = game;

  const numberOfPlayers = Object.keys(players).length;

  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < numberOfPlayers; j++) {
      let playerHand = players[`Player${j}`].hand1;
      playerHand.push(shoe.shift());
      dealer.push(shoe.shift());
      players[`Player${j}`].hand1 = playerHand;
    }
  }
  return { players, dealer, shoe };
};

const calculateHandTotal = (playerHand) => {
  let handBusts = false;
  let handTotal = 0;
  if (playerHand.includes("A")) {
    // figure out soft totals
  } else {
    playerHand.forEach((card) => {
      if (tens.includes(card)) {
        handTotal += 10;
      } else {
        handTotal += parseInt(card);
      }
    });
  }

  return handTotal;
};

function blackJack() {
  /*
    game: {
        dealer: [],
        players: [[]],
        shoe: []

    }

    need to shift to :
    game: {
        dealer: []
        players: {
            player: {
                hand1: [],
                hand2: []
            }
        shoe: []
    }

    */

  let numberOfDecks = prompt("How many decks are we playing with: ");
  let numberOfPlayers = prompt("How many hands are we playing with: ");

  let game = initializeGame(numberOfDecks, numberOfPlayers);
  let continuePlaying = true;
  console.log(game);
  while (continuePlaying) {
    // place bets eventually

    let { players, dealer, shoe } = dealRoundOfCards(game);

    console.log(`Dealer is showing ${dealer[0]}`);
    console.log(players);
    console.log("------------------");
    // now we play

    let numberOfPlayers = Object.keys(players).length;
    for (let i = 0; i < numberOfPlayers; i++) {
      let currentPlayer = players[`Player${i}`];
      let currentHandIndex = 0;
      // {hand1: []}

      let stillPlayersTurn = true;
      while (stillPlayersTurn) {
        console.log(`Player ${i}, you have ${players[i]}`);
        let playerChoice = prompt(
          `Dealer is showing ${dealer[0]}, what would you like to do: `
        );

        if (playerChoice === "n") {
          stillPlayersTurn = false;
          return playerChoice;
        } else if (playerChoice === "s") {
          // move to next player
          stillPlayersTurn = false;
        } else if (playerChoice === "h") {
          const dealtCard = shoe.shift();
          console.log(`You are dealt a ${dealtCard}`);

          currentPlayer["hand1"] = [...currentPlayer.hand1, dealtCard];
          console.log(`Hand ${currentPlayer["hand1"]}`);
          const handTotal = calculateHandTotal(currentPlayer["hand1"]);
          if (handTotal > 21) {
            console.log(` Player ${i} busts!`);
            stillPlayersTurn = false;
          }
        } else if (playerChoice === "d") {
          // work in bets in the future
          const dealtCard = shoe.shift();
          console.log(`You are dealt a ${dealtCard}`);
          currentPlayer["hand1"] = [...currentPlayer.hand1, dealtCard];
          console.log(`Hand ${currentPlayer["hand1"]}`);
          stillPlayersTurn = false;
        } else if (playerChoice === "sp") {
          //maybe add a stillCurrentHand while loop here to handle multiple hands?
          // add temporary player
        }
      }
    }

    continuePlaying = false;
    return "n";
  }
}

module.exports.blackJack = blackJack;
module.exports.deal = deal;
