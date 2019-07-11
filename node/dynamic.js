const trace = require('../trace');
// dynamic programming - buzz word

// approaches - top down (recursive) bottom up (iterative)

// overlapping subproblems

// makeChange example

const coins = [10, 6, 1];
// want to avoid a global cache when possible
const globalCache = {};

const makeChange = (arr, total) => {
  // return if it is cached already
  if (globalCache[total]) return globalCache[total];

  let minCoins = -1;

  // loop
  arr.forEach(item => {
    if (total - item >= 0) {
      let currentMinCoins = makeChange(arr, total - item);
      if (minCoins === -1 || currentMinCoins < minCoins) {
        minCoins = currentMinCoins;
      }
    }
  });
  // save to cache
  globalCache[total] = minCoins + 1;
  return globalCache[total];
};

trace(makeChange(coins, 12));

/* ========================================================================= */

const memoize = callback => {
  let cache = {};
  return (...args) => {
    let [num1, num2] = args;
    if (num2 in cache) {
      trace('Retrieving from cache', num2);
      return cache[num2];
    } else {
      trace('Result saved in cache');
      let result = callback(num1, num2);
      cache[num2] = result;
      return result;
    }
  };
};

// local cache
const makeChangeMemoized = memoize(makeChange);

trace(makeChangeMemoized(coins, 12));
trace(makeChangeMemoized(coins, 12));
