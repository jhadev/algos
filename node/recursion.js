const trace = require('../trace');

let tracker = 0;

const callMe = str => {
  // str starts as undefined bc when callMe is initially called there is no argument
  tracker += 1;
  if (tracker === 3) {
    return `hey yo ${str}`;
  }
  return callMe('anytime');
};

trace(callMe());

// recursive loop

const loopNTimes = num => {
  trace('num ===', num);
  if (num <= 1) {
    return 'complete';
  }
  return loopNTimes(num - 1);
};

loopNTimes(3);

// factorial with loop

const iterativeFactorial = num => {
  let result = 1;

  for (let i = 2; i <= num; i++) {
    trace(`result = ${result} * ${i} (${result * i})`);
    result *= i;
  }

  return result;
};

trace(iterativeFactorial(5));

// factorial with recursion

const recursiveFactorial = num => {
  if (num === 1) {
    trace('this is the base case');
    return 1;
  } else {
    trace(`returning ${num} * recursiveFactorial(${num - 1})`);
    return num * recursiveFactorial(num - 1);
  }
};

trace(recursiveFactorial(5));

const logNumbersIteration = (start, end) => {
  trace(`looping from ${start} until ${end}`);

  for (let i = start; i <= end; i += 1) {
    trace(`hitting index ${i}`);
  }
};

const logNumbersRecursive = (start, end) => {
  trace(`recursively looping from ${start} until ${end}`);

  const recurse = index => {
    trace(`hitting index ${index}`);

    if (index < end) {
      recurse(index + 1);
    }
  };

  recurse(start);
};

trace(logNumbersRecursive(5, 24));

// same as above
const memoFunctionLoop = (index, end) => {
  trace(`looping from ${index} until ${end}`);

  if (index < end) {
    // passed in from the parameter to loop recursively.
    memoFunctionLoop(index + 1, end);
  }
};

trace(memoFunctionLoop(1, 20));

// accumulator technique

// prettyJoin

const prettyJoin = (arr, string) => {
  const recurse = (index, resultSoFar) => {
    // at every recursion resultSoFar adds arr at current index
    resultSoFar += arr[index];
    // exit condition
    if (index === arr.length - 1) {
      return resultSoFar;
    } else {
      // do it again
      return recurse(index + 1, resultSoFar + string);
    }
  };

  return recurse(0, '');
};

const cipher = ['s', 'cr', 't cod', ' :) :)'];

trace(prettyJoin(cipher, 'e'));

const prettyJoinIterative = (arr, string) => {
  let resultSoFar = '';

  // stop at second to last index
  for (let i = 0; i < arr.length - 1; i += 1) {
    resultSoFar += arr[i] + string;
    trace(resultSoFar);
  }

  return resultSoFar + arr[arr.length - 1];
};

trace(prettyJoinIterative(cipher, 'e'));

// memoized factorial

const memoize = callback => {
  let cache = {};
  return num => {
    if (num in cache) {
      trace('Retrieving from cache', num);
      return cache[num];
    } else {
      trace('Result saved in cache');
      let result = callback(num);
      cache[num] = result;
      return result;
    }
  };
};

// holy moly
const factorialWithMemo = memoize(num => {
  if (num === 0) {
    return 1;
  } else {
    // run back through memoize callback with num - 1 as arg
    return num * factorialWithMemo(num - 1);
  }
});

trace(factorialWithMemo(5));
trace(factorialWithMemo(6));

// linear Search

const linearSearch = (arr, query) => {
  // set base case -1 = not found
  let idx = -1;
  // loop
  arr.forEach((item, index) => {
    if (item === query) {
      // always going to return last index if their are duplicates
      idx = index;
    }
  });

  return idx;
};

// O(n)
trace(linearSearch([4, 6, 10, 18, 42], 10));

// divide and conquer binary search MUST BE SORTED FIRST

const binarySearch = (arr, item) => {
  // set vars
  let min = 0;
  let max = arr.length - 1;
  let guess;

  while (min <= max) {
    // start at min and max
    trace(min, max);
    // divide
    guess = Math.floor((min + max) / 2);
    trace(guess);
    // if arr at index of guess is equal to item passed in- exit
    if (arr[guess] === item) {
      return guess;
      // grow min and shrink max until found
    } else {
      if (arr[guess] < item) {
        min = guess + 1;
      } else {
        max = guess - 1;
      }
    }
  }

  return -1;
};

trace(binarySearch([1, 5, 7, 17, 19, 42, 109], 42));

// eek not performant
const iterativeShallowMerge = arr => {
  const merged = [];
  arr.forEach(innerArr => {
    innerArr.forEach(item => {
      merged.push(item);
    });
  });

  return merged;
};
trace(iterativeShallowMerge([[5, 5, 5], [2, 3, 4], [8, 4, 3]]));

// eeker not performant
const iterativeDeeperMerge = arr => {
  const merged = [];
  arr.forEach(inner => {
    // assumes inner is an array already
    inner.forEach(item => {
      if (Array.isArray(item)) {
        let deeper = item;
        deeper.forEach(value => {
          merged.push(value);
        });
      } else {
        merged.push(item);
      }
    });
  });

  return merged;
};

trace(iterativeDeeperMerge([[5, 6, 4, [8, 4, 3]], [4, 5, 6]]));

// eek big mess
let merged = [];

const recursiveMergeWithLoop = (arr, index) => {
  let max = arr.length - 1;
  trace('index ===', arr[index]);
  if (Array.isArray(arr[index])) {
    arr[index].forEach(item => {
      merged.push(item);
    });
  } else {
    merged.push(arr[index]);
  }
  if (index === max) {
    return merged;
  }
  return recursiveMergeWithLoop(arr, index + 1);
};

trace(recursiveMergeWithLoop([1, 2, 4, [4, 6, 43, 39], 5, 5, [2, 4, 5]], 0));

const altRecursiveLoop = arr => {
  const max = arr.length - 1;

  const repeat = index => {
    trace(`hitting index ${index} === ${arr[index]}`);
    // exit condition
    if (index === max) {
      return 'loop finished';
    }

    return repeat(index + 1);
  };
  // only starts at first index
  return repeat(0);
};

trace(altRecursiveLoop([5, 6, 7, 8, 9, 10]));

// in progress
// this kinda works exit conditions stops after first nested array
const recurseMerge = arr => {
  const merged = [];
  const max = arr.length - 1;

  const recurse = index => {
    // if the arr at current index is an array run loop inner recursively
    if (Array.isArray(arr[index])) {
      const max = arr[index].length - 1;

      const loopInner = secondIndex => {
        merged.push(arr[index][secondIndex]);

        if (secondIndex === max) {
          // this stops after first array is found
          return merged;
        }

        return loopInner(secondIndex + 1);
      };

      return loopInner(0);
    } else {
      merged.push(arr[index]);
    }

    if (index === max) {
      return merged;
    }

    return recurse(index + 1);
  };

  return recurse(0);
};

// does not work if inner array is before the other items. Needs alot of work.
trace(recurseMerge([13, 4, 5, [3, 6, 7]]));

// to be continued
