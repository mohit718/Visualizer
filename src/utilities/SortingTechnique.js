export const BUBBLE = 0;
export const QUICK = 1;
export const MERGE = 2;
export const INSERTION = 3;

export const COMPARE = 0;
export const SWAP = 1;
export const FINISH = 2;

export const sort = {
  bubble: arr => {
    let animations = [];
    for (let i = 0, j = 0; i < arr.length; i++) {
      for (j = 0; j < arr.length - 1 - i; j++) {
        animations.push([COMPARE, j, j + 1]);
        if (arr[j] > arr[j + 1]) {
          animations.push([SWAP, j, j + 1]);
          let tmp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = tmp;
        }
      }
      animations.push([FINISH, j]);
    }
    console.log({ sorting: animations });
    return animations;
  },
  insertion: arr => {
    let animations = [];
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        animations.push([SWAP, i, j + 1]);
        arr[j + 1] = arr[j];
        j = j - 1;
      }
      arr[j + 1] = key;
    }
    console.log("Sorted Array: ");
    console.log(arr);
    console.log({ sorting: animations });

    return animations;
  },
  merge: arr => {},
  quick: arr => {},
};

const swap = (a, b) => {
  let t = a;
  a = b;
  b = t;
};
