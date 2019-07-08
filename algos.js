const isUniq = arr => {
  let result = true;

  for (let i = 0; i < arr.length; i += 1) {
    for (let j = 0; j < arr.length; j += 1) {
      if (i !== j && arr[i] === arr[j]) {
        result = false;
      }
    }
  }
  return result;
};

console.log(isUniq([1, 2, 3]));

// quadratic O(n^2)

// better way

const isUnique = arr => {
  const cache = {};
  let result = true;

  for (let i = 0; i < arr.length; i += 1) {
    // check if we have seen the previous index in array by looking it up in the cache object
    if (cache[arr[i]]) {
      result = false;
    } else {
      cache[arr[i]] = true;
    }
  }

  return result;
};

// linear O(n)

// my answer
const uniqSort = arr => {
  arr = Array.from(new Set(arr));
  return arr.sort((a, b) => a - b);
};

console.log(uniqSort([5, 3, 6, 2, 2, 6, 8, 2, 4]));

// with caching

const uniqSortCache = arr => {
  // can use a map instead of an object
  const cache = {};
  const result = [arr[0]];

  for (let i = 0; i < arr.length; i += 1) {
    // lookup cache if unique push into result
    if (!cache[arr[i]]) {
      result.push(arr[i]);
      // save value into cache
      cache[arr[i]] = true;
    }
  }
  // above is linear
  // is nlogn
  return result.sort((a, b) => a - b);
};

const timesTen = num => num * 10;

const cache = {};

const memoTimesTen = num => {
  if (num in cache) {
    console.log('cache', num);
    return cache[num];
  } else {
    console.log('result');
    let result = timesTen(num);
    cache[num] = result;
    return result;
  }
};

console.log(memoTimesTen(9));
console.log(memoTimesTen(9));

const memoClosure = () => {
  let cache = {};
  return num => {
    if (num in cache) {
      console.log('cache', num);
      return cache[num];
    } else {
      console.log('result');
      let result = timesTen(num);
      cache[num] = result;
      return result;
    }
  };
};

const memo = memoClosure();

console.log(memo(20));
console.log(memo(20));

const timesTwenty = num => num * 20;

// need to use a callback that provides a hard coded multiplier func
const memoize = callback => {
  let cache = {};
  return num => {
    if (num in cache) {
      console.log('Retrieving from cache', num);
      return cache[num];
    } else {
      console.log('Result saved in cache');
      let result = callback(num);
      cache[num] = result;
      return result;
    }
  };
};

const memoizeTen = memoize(timesTen);

console.log(memoizeTen(20, 5));
console.log(memoizeTen(20, 5));

const multiplier = (num1, num2) => num1 * num2;
// can use multiplier func above takes 2 args
const memoizeArgs = callback => {
  let cache = {};
  return (...args) => {
    let [num1, num2] = args;
    if (num1 in cache) {
      console.log('Retrieving from cache', num1);
      return cache[num1];
    } else {
      console.log('Result saved in cache');
      let result = callback(num1, num2);
      cache[num1] = result;
      return result;
    }
  };
};

const memoizeTwoArgs = memoizeArgs(multiplier);

console.log(memoizeTwoArgs(10, 10));
console.log(memoizeTwoArgs(10, 10));
