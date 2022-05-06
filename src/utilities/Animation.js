import { COMPARE, FINISH, SWAP } from "./SortingTechnique";

const swapHeights = (nodeA, nodeB) => {
  let h1 = nodeA.style.height;
  nodeA.style.height = nodeB.style.height;
  nodeB.style.height = h1;
};
const bars = document.getElementsByClassName("bar");
const resetBars = () => {
  for (let i = 0; i < bars.length; i++) {
    bars[i].classList.remove("compare");
    bars[i].classList.remove("swap");
    bars[i].classList.remove("finish");
  }
};
const removeCompareSwap = () => {
  for (let i = 0; i < bars.length; i++) {
    bars[i].classList.remove("compare");
    bars[i].classList.remove("swap");
  }
};

export const handleAnimations = (animations, speed = 100, callback) => {
  let lastAnimation = {};
  let n = animations.length;
  resetBars();
  let timeouts = [];
  animations.forEach((animation, idx) => {
    timeouts.push(
      setTimeout(() => {
        if (lastAnimation && Object.keys(lastAnimation).length !== 0) {
          bars[lastAnimation[1]]?.classList.remove("compare");
          bars[lastAnimation[2]]?.classList.remove("compare");
          bars[lastAnimation[1]]?.classList.remove("swap");
          bars[lastAnimation[2]]?.classList.remove("swap");
        }
        lastAnimation = animation;
        if (animation[0] === COMPARE) {
          bars[animation[1]].classList.add("compare");
          bars[animation[2]].classList.add("compare");
        } else if (animation[0] === SWAP) {
          bars[animation[1]].classList.add("swap");
          bars[animation[2]].classList.add("swap");
          swapHeights(bars[animation[1]], bars[animation[2]]);
        } else if (animation[0] == FINISH) {
          bars[animation[1]].classList.add("finish");
        }
      }, speed * idx)
    );
  });
  const time = speed * (n - 1);
  console.log({ time: time });
  timeouts.push(
    setTimeout(() => {
      removeCompareSwap();
      callback();
    }, time)
  );
  return timeouts;
};
