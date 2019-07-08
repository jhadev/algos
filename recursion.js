// call stack game

let tracker = 0;

const callMe = str => {
  // str starts as undefined bc when callMe is initially called there is no argument
  tracker += 1;
  if (tracker === 3) {
    return `hey yo ${str}`;
  }
  return callMe('anytime');
};

console.log(callMe());

// recursive loop

const loopNTimes = n => {
  console.log('n ===', n);
  if (n <= 1) {
    return 'complete';
  }
  return loopNTimes(n - 1);
};

loopNTimes(3);

// factorial with loop

const iterativeFactorial = num => {
  let result = 1;

  for (let i = 2; i <= num; i++) {
    console.log(`result = ${result} * ${i} (${result * i})`);
    result *= i;
  }

  return result;
};

console.log(iterativeFactorial(5));

// factorial with recursion

const recursiveFactorial = num => {
  if (num === 1) {
    console.log('this is the base case');
    return 1;
  } else {
    console.log(`returning ${num} * recursiveFactorial(${num - 1})`);
    return num * recursiveFactorial(num - 1);
  }
};

console.log(recursiveFactorial(5));
