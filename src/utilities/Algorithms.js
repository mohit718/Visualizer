import { COMPARE, FINISH, SWAP, UPDATE } from "../constants/operation";

export const bubbleSort = (arr, animations) => {
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
};

export const insertionSort = (arr, animations) => {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      animations.push([COMPARE, j, i]);
      animations.push([UPDATE, j + 1, arr[j]]);
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    animations.push([UPDATE, j + 1, key]);
    arr[j + 1] = key;
  }
};
export const mergeSort = (mainArray, auxArray, start, end, animations) => {
  if (start >= end) return;
  let mid = Math.floor((start + end) / 2);
  mergeSort(auxArray, mainArray, start, mid, animations);
  mergeSort(auxArray, mainArray, mid + 1, end, animations);
  doMerge(mainArray, auxArray, start, mid, end, animations);
};
const doMerge = (mainArray, auxArray, start, mid, end, animations) => {
  let i = start;
  let j = mid + 1;
  let k = start;
  while (i <= mid && j <= end) {
    animations.push([COMPARE, i, j]);
    if (auxArray[i] <= auxArray[j]) {
      animations.push([UPDATE, k, auxArray[i]]);
      mainArray[k++] = auxArray[i++];
    } else {
      animations.push([UPDATE, k, auxArray[j]]);
      mainArray[k++] = auxArray[j++];
    }
  }
  while (i <= mid) {
    animations.push([UPDATE, k, auxArray[i]]);
    mainArray[k++] = auxArray[i++];
  }
  while (j <= end) {
    animations.push([UPDATE, k, auxArray[j]]);
    mainArray[k++] = auxArray[j++];
  }
};

export const quickSort = (mainArr, start, end, animations) => {
  if (start < end) {
    let pi = partition(mainArr, start, end, animations);
    quickSort(mainArr, start, pi - 1, animations);
    quickSort(mainArr, pi + 1, end, animations);
  }
};

const partition = (mainArr, start, end, animations) => {
  let pivot = mainArr[end];
  let i = start - 1;
  for (let j = start; j < end; j++) {
    animations.push([COMPARE, j, end]);
    if (mainArr[j] <= pivot) {
      swap(mainArr, ++i, j);
      animations.push([SWAP, i, j]);
    }
  }
  swap(mainArr, ++i, end);
  animations.push([SWAP, i, end]);
  return i;
};

function swap(arr, i, j) {
  let t = arr[i];
  arr[i] = arr[j];
  arr[j] = t;
}
