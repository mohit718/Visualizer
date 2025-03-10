export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
export const getRandomArray = (size) => {
  let arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(getRandomInt(1, 99));
  }
  return arr;
};
