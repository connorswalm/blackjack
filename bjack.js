const prompt = require("prompt-sync")({ sigint: true });
const { makeShoe } = require("./shoe");
const { calculateCorrectMove } = require("./checkCorrectMove");
const { testHandKnowledge } = require("./testHandKnowledge");
const { deal, blackJack } = require("./game");

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
    const userFeedback = blackJack();
    if (userFeedback === "n") {
      break;
    }
  }
}

main();
