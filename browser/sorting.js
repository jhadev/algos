// searching and sorting are incredibly time intensive.

// naive sorts (quadratic) keep looping and comparing until sorted
// Bubble Sort, Insertion Sort, Selection Sort

// divide & conquer sorts - recursively divide and sort smaller parts of list until entire list is sorted
// Merge Sort, Quick Sort - nlogn

// merge sort recursively merge sorted sub lists

// initialize empty array

// compare first index of the left array to the first index of the right array

// push the lower value to the empty array

// shift the array with the lower value

// repeat until both arrays are empty
const numList = [9, 2, 5, 6, 4, 3, 7, 10, 1, 8];
// split array into halves and merge them recursively
const mergeSort = arr => {
  if (arr.length === 1) {
    // return once arr is only a single item
    return arr;
  }

  // find middle of array rounded down
  const middle = Math.floor(arr.length / 2);
  // left array
  const left = arr.slice(0, middle);
  // right array
  const right = arr.slice(middle);

  return merge(mergeSort(left), mergeSort(right));
};

const merge = (left, right) => {
  // store result
  let result = [];
  // keep track of indices for recursion
  let indexLeft = 0;
  let indexRight = 0;
  // while indices are less than size of left and right
  while (indexLeft < left.length && indexRight < right.length) {
    // if left at current index is less than right at current index push into result
    // increment indexLeft
    if (left[indexLeft] < right[indexRight]) {
      result.push(left[indexLeft]);
      indexLeft += 1;
    } else {
      // do the same for right if reversed
      result.push(right[indexRight]);
      indexRight += 1;
    }
  }

  let leftSlice = left.slice(indexLeft);
  let rightSlice = right.slice(indexRight);
  // concat result
  return result.concat(leftSlice).concat(rightSlice);
};

console.log(mergeSort(numList));

// bubble sort

// i dont know what this is but it works
const someSort = arr => {
  let outerCount = 0;
  let innerCount = 0;
  let swapCount = 0;

  for (let i = 0; i < arr.length; i++) {
    outerCount += 1;
    for (let j = 0; j < arr.length; j++) {
      innerCount += 1;
      if (arr[i] < arr[j]) {
        swapCount += 1;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  }
  console.log(
    `outer count: ${outerCount}, inner count: ${innerCount}, swap count: ${swapCount}`
  );
  return arr;
};

console.log(someSort([7, 6, 8, 4, 2, 4, 10, 58, 39, 7, 8, 5]));

const swap = (arr, i, j) => {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

const bubbleSort = arr => {
  let outerCount = 0;
  let innerCount = 0;
  let swapCount = 0;

  for (let i = 0; i < arr.length; i++) {
    outerCount += 1;
    for (let j = 1; j < arr.length; j++) {
      innerCount += 1;

      if (arr[j - 1] > arr[j]) {
        swapCount += 1;
        swap(arr, j - 1, j);
      }
    }
    // console.log(arr);
  }
  console.log(
    `outer count: ${outerCount}, inner count: ${innerCount}, swap count: ${swapCount}`
  );
  return arr;
};

console.log(bubbleSort([7, 6, 8, 4, 2, 4, 10, 58, 39, 7, 8, 5]));

// ignores extra looping if items are already swapped.
// this ignores 0 ???
const bubbleSortOptimized = arr => {
  let outerCount = 0;
  let innerCount = 0;
  let swapCount = 0;
  let swapped;

  do {
    outerCount += 1;
    swapped = false;

    for (let i = 0; i < arr.length; i++) {
      innerCount += 1;

      if (arr[i] && arr[i + 1] && arr[i] > arr[i + 1]) {
        swapCount += 1;
        swap(arr, i, i + 1);
        swapped = true;
      }
    }
  } while (swapped);

  console.log(
    `outer count: ${outerCount}, inner count: ${innerCount}, swap count: ${swapCount}`
  );

  return arr;
};

console.log(bubbleSortOptimized([7, 6, 8, 4, 2, 4, 10, 58, 39, 7, 8, 5]));
