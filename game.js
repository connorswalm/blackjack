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

module.exports.deal = deal;
