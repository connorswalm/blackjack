const prompt = require("prompt-sync")({ sigint: true });
const { makeShoe } = require("./shoe");
const { calculateCorrectMove } = require("./checkCorrectMove");
const { testHandKnowledge } = require("./testHandKnowledge");
const { deal } = require("./game");

function main() {
  console.log("What game would you like to play?");
  console.log("t : Test Hand Knowledge Minigame");
  console.log("p : Play Blackjack");

  let gameChoice = prompt("What is your choice : ");

  while (gameChoice === "t") {
    const userFeedback = testHandKnowledge();
    if (userFeedback === "n") {
      break;
    }
  }

  while (gameChoice === "p") {
    let game = {
      players: [],
      shoe: [],
      dealer: [],
    };
    //play blackjack

    // make a shoe
    // set how many players to begin dealing to
    // always ensure you have enough cards
    // deal a hand
    // cleanup

    let numberOfDecks = prompt("How many decks are we playing with: ");

    const shoe = makeShoe(parseInt(numberOfDecks));

    // console.log(shoe);
    let numberOfPlayers = prompt("How many hands are we playing with: ");

    let players = [];
    for (let i = 0; i < numberOfPlayers; i++) {
      players.push([]);
    }
    game.players = players;
    game.shoe = shoe;
    console.log(game);

    let continuePlaying = true;
    console.log("Begin Play!");
    while (continuePlaying) {
      // place bets eventually
      let { players, shoe, dealer } = game;
      players.forEach((player) => player.push(shoe.shift()));
      dealer.push(shoe.shift());

      players.forEach((player) => player.push(shoe.shift()));
      dealer.push(shoe.shift());

      console.log(`Dealer is showing a ${dealer[0]}`);
      players.forEach((player, i) => console.log(`Player ${i} has ${player}`));
      for (let i = 0; i < players.length; i++) {
        console.log(`Player ${i}, you have ${players[i]}`);
        let playerChoice = prompt(
          `Dealer is showing ${dealer[0]}, what would you like to do: `
        );
        let currentPlayersMove = true;
        let currentPlayer = [];
        while (currentPlayersMove) {
          if (playerChoice === "n") {
            continuePlaying = false;
            gameChoice = "m";
            currentPlayersMove = false;
            break;
          } else if (playerChoice === "s") {
            console.log("stand");
            currentPlayersMove = false;
          } else if (playerChoice === "d") {
            currentPlayer.push(shoe.shift());
          } else if (playerChoice === "sp") {
            // add support to add a player
          } else if (playerChoice === "h") {
            currentPlayer.push(shoe.shift);
          }
        }
      }
    }
    // start playing

    // deal a card to every player and the dealer
    // deal a 2nd card to every player

    // let a player play their entire hand until they stand or bust
  }
}

main();
