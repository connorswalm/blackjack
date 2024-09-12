const prompt = require("prompt-sync")({ sigint: true });
const { makeShoe } = require("./shoe");
const { calculateCorrectMove } = require("./checkCorrectMove");
const { testHandKnowledge } = require("./testHandKnowledge");

function main() {
  console.log("What game would you like to play?");
  console.log("t : Test Hand Knowledge Minigame");

  let gameChoice = prompt("What is your choice : ");

  while (gameChoice === "t") {
    const userFeedback = testHandKnowledge();
    if (userFeedback === "n") {
      break;
    }
  }
}

main();
