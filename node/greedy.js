const trace = require('../trace');

// easy way out situation - always make the locally optimal choice without considering the big picture

// better to have a solution than no solution at all - use case

// Write a function, makeChange, that returns an integer that represents the least number of coins that add up to an amount where the amount is always divisible by 5.

// coin values: 5, 10, 25

// greedy approach because it will break down for other use cases.
// always subtracts largest coin possible first.
const makeChange = (coins, amount) => {
  // sort coins biggest to smallest - this is why it is greedy
  coins.sort((a, b) => b - a);
  // initialize total to 0
  let coinTotal = 0;
  // initialize i for while loop
  let i = 0;

  while (amount > 0) {
    if (coins[i] <= amount) {
      amount -= coins[i];
      coinTotal += 1;
    } else {
      i += 1;
    }
  }

  return coinTotal;
};

// works
trace(makeChange([5, 10, 25], 50));

// does not work
// breaks down using this data set returns 3 and optimal solution would be 2
trace(makeChange([1, 6, 10], 12));

// brute force approach
/*
calculate every single combination and keep track of the min
*/
let counter = 0;
const coins = [10, 6, 1];
const makeChangeWithForce = (value, index) => {
  // increment counter just to log the recursion
  counter += 1;
  trace(`recursion ${counter}: calling ${value} at ${index}`);

  if (value === 0) return 0;
  // just initialize minCoin - key in if block to check if it is undefined
  let minCoins;

  coins.forEach((coin, index) => {
    if (value - coin >= 0) {
      let currentMinCoins = makeChangeWithForce(value - coin, index);
      if (minCoins === undefined || currentMinCoins < minCoins) {
        minCoins = currentMinCoins;
      }
    }
  });

  return minCoins + 1;
};

trace(makeChangeWithForce(12));
