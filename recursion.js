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
