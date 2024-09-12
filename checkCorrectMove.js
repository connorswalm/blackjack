const { tens, suits } = require("./consts");

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

module.exports.calculateCorrectMove = calculateCorrectMove;
