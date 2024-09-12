const prompt = require("prompt-sync")({ sigint: true });
const { makeShoe } = require("./shoe");
const { deal } = require("./game");
const { calculateCorrectMove } = require("./checkCorrectMove");
function testHandKnowledge() {
  const validAction = ["sp", "s", "h", "d", "n"];

  let continueGame = true;
  let correctMoves = 0;
  let incorrectMoves = 0;
  while (continueGame) {
    const game = deal(makeShoe(1));
    console.log("-------");
    console.log(`You have ${game.playerHand}`);
    console.log(`Dealer is showing ${game.dealerHand[0]}`);
    console.log("-------");

    let playerMove = prompt("What do you do? (sp/s/h/d) :");
    if (playerMove === "n") {
      console.log(`You played ${correctMoves + incorrectMoves} hands`);
      console.log(
        `You had ${correctMoves} correct moves and ${incorrectMoves} incorrect moves`
      );
      console.log(
        `For a total accuracy of ${Math.round(
          (correctMoves / (correctMoves + incorrectMoves)) * 100
        )}%`
      );
      return playerMove;
    } else {
      const moveWasCorrect = calculateCorrectMove(
        game.playerHand,
        game.dealerHand[0],
        playerMove
      );
      if (moveWasCorrect) {
        console.log("\n");
        console.log("Correct! Correct! Correct!");
        console.log("Correct! Correct! Correct!");
        correctMoves += 1;
        // console.log(
        //   `Your hand ${game.playerHand} with dealer showing ${game.dealerHand[0]} and move of ${playerMove} is correct`
        // );
      } else {
        console.log("\n");
        console.log("Wrong! Wrong! Wrong!");
        console.log("Wrong! Wrong! Wrong!");
        incorrectMoves += 1;
        // console.log(
        //   `Your hand ${game.playerHand} with dealer showing ${game.dealerHand[0]} and move of ${playerMove} is NOT correct`
        // );
      }
    }
  }
}

module.exports.testHandKnowledge = testHandKnowledge;
