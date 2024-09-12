const prompt = require("prompt-sync")({ sigint: true });
const { makeShoe } = require("./shoe");
const { tens } = require("./consts");
const { calculateCorrectMove } = require("./checkCorrectMove");
function deal(shoe) {
  if (shoe.length < 4) {
    throw new Error("Shoe must contain at least 4 elements.");
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

function main() {
  const validAction = ["sp", "s", "h", "d", "n"];

  let continueGame = true;
  let correctMoves = 0;
  let incorrectMoves = 0;
  while (continueGame) {
    const game = deal(makeShoe(1));
    console.log(game);
    // console.log(game);
    console.log("-------");
    console.log(`You have ${game.playerHand}`);
    console.log(`Dealer is showing ${game.dealerHand[0]}`);
    console.log("-------");

    if (typeof game.dealerHand[0] === undefined) {
      console.log(game);
    }

    let playerMove = prompt("What do you do? (sp/s/h/d) :");
    if (playerMove === "n") {
      break;
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
  console.log(`You played ${correctMoves + incorrectMoves} hands`);
  console.log(
    `You had ${correctMoves} correct moves and ${incorrectMoves} incorrect moves`
  );
  console.log(
    `For a total accuracy of ${Math.round(
      (correctMoves / (correctMoves + incorrectMoves)) * 100
    )}%`
  );

  //   console.log(calculateCorrectMove(["A", "A"], ["4", "2"], "sp"));
  //   console.log(calculateCorrectMove(["Q", "10"], ["4", "2"], "s"));
  //   console.log(calculateCorrectMove(["9", "9"], "7", "s"));
  //   console.log(calculateCorrectMove(["9", "9"], "2", "sp"));
  //   console.log(calculateCorrectMove(["8", "8"], "10", "sp"));
  //   console.log(calculateCorrectMove(["5", "5"], "10", "h"));
  //   console.log(calculateCorrectMove(["5", "5"], "9", "d"));
  //   console.log(calculateCorrectMove(["4", "4"], "5", "sp"));
  //   console.log(calculateCorrectMove(["4", "4"], "2", "h"));
  //   console.log(calculateCorrectMove(["9", "A"], "6", "s"));
  //   console.log(calculateCorrectMove(["5", "A"], "4", "d"));
  //   console.log(calculateCorrectMove(["10", "5"], "5", "h"));
  //   console.log(calculateCorrectMove(["10", "5"], "9", "s"));
}

main();
