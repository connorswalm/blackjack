const prompt = require("prompt-sync")({ sigint: true });
const suits = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];
const tens = ["10", "J", "Q", "K"];

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

const calculateCorrectPairMove = (playerHand, dealerCard, suggestedMove) => {
  if (playerHand[0] === "A" && playerHand[1] === "A") {
    if (suggestedMove === "sp") {
      return true;
    }
  }
  if (tens.includes(playerHand[0]) && tens.includes(playerHand[1])) {
    if (suggestedMove === "s") {
      return true;
    }
  }

  if (playerHand[0] === "9" && playerHand[1] === "9") {
    if (
      ["2", "3", "4", "5", "6", "8", "9"].includes(dealerCard) &&
      suggestedMove === "sp"
    ) {
      return true;
    } else if (["7", ...tens, "A"] && suggestedMove === "s") {
      return true;
    }
  }

  if (playerHand[0] === "8" && playerHand[1] === "8") {
    if (suggestedMove === "sp") {
      return true;
    }
  }

  if (playerHand[0] === "7" && playerHand[1] === "7") {
    if (
      ["2", "3", "4", "5", "6", "7"].includes(dealerCard) &&
      suggestedMove === "sp"
    ) {
      return true;
    } else if (["8", "9", ...tens, "A"] && suggestedMove === "h") {
      return true;
    }
  }
  if (playerHand[0] === "6" && playerHand[1] === "6") {
    if (
      ["2", "3", "4", "5", "6"].includes(dealerCard) &&
      suggestedMove === "sp"
    ) {
      return true;
    } else if (
      ["7", "8", "9", ...tens, "A"].includes(dealerCard) &&
      suggestedMove === "h"
    ) {
      return true;
    }
  }

  if (playerHand[0] === "5" && playerHand[1] === "5") {
    if (
      ["2", "3", "4", "5", "6", "7", "8", "9"].includes(dealerCard) &&
      suggestedMove === "d"
    ) {
      return true;
    } else if ([...tens, "A"].includes(dealerCard) && suggestedMove === "h") {
      return true;
    }
  }
  if (playerHand[0] === "4" && playerHand[1] === "4") {
    if (
      ["2", "3", "4", "7", "8", "9", ...tens, "A"].includes(dealerCard) &&
      suggestedMove === "h"
    ) {
      return true;
    } else if (["5", "6"].includes(dealerCard) && suggestedMove === "sp") {
      return true;
    }
  }

  if (playerHand[0] === "3" && playerHand[1] === "3") {
    if (
      ["2", "3", "4", "5", "6", "7"].includes(dealerCard) &&
      suggestedMove === "sp"
    ) {
      return true;
    } else if (["8", "9", ...tens, "A"] && suggestedMove === "h") {
      return true;
    }
  }
  if (playerHand[0] === "2" && playerHand[1] === "2") {
    if (
      ["2", "3", "4", "5", "6", "7"].includes(dealerCard) &&
      suggestedMove === "sp"
    ) {
      return true;
    } else if (["8", "9", ...tens, "A"] && suggestedMove === "h") {
      return true;
    }
  }

  return false;
};

const calculateCorrectSoftTotalMove = (
  playerHand,
  dealerCard,
  suggestedMove
) => {
  playerHand = playerHand[0] === "A" ? playerHand : playerHand.reverse();

  if (tens.includes(playerHand[1])) {
    if (suggestedMove === "s") {
      return true;
    }
  }
  if (playerHand[1] === "9") {
    if (
      ["2", "3", "4", "5", "6", "7", "8", "9", ...tens, "A"].includes(
        dealerCard
      ) &&
      suggestedMove === "s"
    ) {
      return true;
    }
  }
  if (playerHand[1] === "8") {
    if (
      ["2", "3", "4", "5", "7", "8", "9", ...tens, "A"].includes(dealerCard) &&
      suggestedMove === "s"
    ) {
      return true;
    } else if (dealerCard === "6" && suggestedMove === "d") {
      return true;
    }
  }
  if (playerHand[1] === "7") {
    if (
      ["2", "3", "4", "5", "6"].includes(dealerCard) &&
      suggestedMove === "d"
    ) {
      return true;
    } else if (["7", "8"].includes(dealerCard) && suggestedMove === "s") {
      return true;
    } else if (
      ["9", ...tens, "A"].includes(dealerCard) &&
      suggestedMove === "h"
    ) {
      return true;
    }
  }
  if (playerHand[1] === "6") {
    if (
      ["2", "7", "8", "9", ...tens, "A"].includes(dealerCard) &&
      suggestedMove === "h"
    ) {
      return true;
    } else if (
      ["3", "4", "5", "6"].includes(dealerCard) &&
      suggestedMove === "d"
    ) {
      return true;
    }
  }
  if (playerHand[1] === "5") {
    if (
      ["2", "3", "7", "8", "9", ...tens, "A"].includes(dealerCard) &&
      suggestedMove === "h"
    ) {
      return true;
    } else if (["4", "5", "6"].includes(dealerCard) && suggestedMove === "d") {
      return true;
    }
  }
  if (playerHand[1] === "4") {
    if (
      ["2", "3", "7", "8", "9", ...tens, "A"].includes(dealerCard) &&
      suggestedMove === "h"
    ) {
      return true;
    } else if (["4", "5", "6"].includes(dealerCard) && suggestedMove === "d") {
      return true;
    }
  }
  if (playerHand[1] === "3") {
    if (
      ["2", "3", "4", "7", "8", "9", ...tens, "A"].includes(dealerCard) &&
      suggestedMove === "h"
    ) {
      return true;
    } else if (["5", "6"].includes(dealerCard) && suggestedMove === "d") {
      return true;
    }
  }
  if (playerHand[1] === "2") {
    if (
      ["2", "3", "4", "7", "8", "9", ...tens, "A"].includes(dealerCard) &&
      suggestedMove === "h"
    ) {
      return true;
    } else if (["5", "6"].includes(dealerCard) && suggestedMove === "d") {
      return true;
    }
  }
  return false;
};

const calculateCorrectHardTotalMove = (
  playerHand,
  dealerCard,
  suggestedMove
) => {
  let playerHandScore = 0;
  playerHandScore += tens.includes(playerHand[0])
    ? 10
    : parseInt(playerHand[0]);
  playerHandScore += tens.includes(playerHand[1])
    ? 10
    : parseInt(playerHand[1]);

  if (playerHandScore >= 17 && suggestedMove === "s") {
    return true;
  }

  if ([16, 15, 14, 13].includes(playerHandScore)) {
    if (
      ["2", "3", "4", "5", "6"].includes(dealerCard) &&
      suggestedMove === "s"
    ) {
      return true;
    }

    if (
      ["7", "8", "9", ...tens, "A"].includes(dealerCard) &&
      suggestedMove === "h"
    ) {
      return true;
    }
  }

  if (playerHandScore === 12) {
    if (
      ["2", "3", "7", "8", "9", ...tens, "A"].includes(dealerCard) &&
      suggestedMove === "h"
    ) {
      return true;
    }

    if (["4", "5", "6"].includes(dealerCard) && suggestedMove === "s") {
      return true;
    }
  }

  if (playerHandScore === 11) {
    if (suggestedMove === "d") {
      return true;
    }
  }

  if (playerHandScore === 10) {
    if (
      ["2", "3", "4", "5", "6", "7", "8", "9"].includes(dealerCard) &&
      suggestedMove === "d"
    ) {
      return true;
    }
    if ([...tens, "A"].includes(dealerCard) && suggestedMove === "h") {
      return true;
    }
  }

  if (playerHandScore === 9) {
    if (
      ["2", "7", "8", "9", ...tens, "A"].includes(dealerCard) &&
      suggestedMove === "h"
    ) {
      return true;
    }

    if (["3", "4", "5", "6"].includes(dealerCard) && suggestedMove === double) {
      return true;
    }
  }

  if (playerHandScore <= 8 && suggestedMove === "h") {
    return true;
  }

  return false;
};
const calculateCorrectMove = (playerHand, dealerCard, suggestedMove) => {
  if (
    playerHand[0] === playerHand[1] ||
    (tens.includes(playerHand[0]) && tens.includes(playerHand[1]))
  ) {
    return calculateCorrectPairMove(playerHand, dealerCard, suggestedMove);
  } else if (playerHand[0] === "A" || playerHand[1] === "A") {
    return calculateCorrectSoftTotalMove(playerHand, dealerCard, suggestedMove);
  } else {
    return calculateCorrectHardTotalMove(playerHand, dealerCard, suggestedMove);
  }
};
function main() {
  const validAction = ["sp", "s", "h", "d", "n"];

  let continueGame = true;
  let correctMoves = 0;
  let incorrectMoves = 0;
  while (continueGame) {
    const game = deal(makeDeck());
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
