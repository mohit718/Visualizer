/* BuiltIns */
import React, { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
/* Constants */
import { BUBBLE, INSERTION, QUICK, MERGE } from "../constants/sort";
/* Components */
import NavBar from "./NavBar";
/* Utilities */
import { getRandomArray } from "../utilities/Random";
import { resetBars, startAnimations } from "../utilities/Animation";
import {
  bubbleSort,
  insertionSort,
  mergeSort,
  quickSort,
} from "../utilities/Algorithms";
/* Styles */
import "./SortingVisualizer.css";

export default function SortingVisualizer() {
  const [isActive, setIsActive] = useState(false);
  const [array, setArray] = useState([]);
  const [sortTechnique, setSortTechnique] = useState(QUICK);
  const [timeouts, setTimeouts] = useState([]);
  const [arraySize, setArraySize] = useState(0);
  const [animationDelay, setAnimationDelay] = useState(0);

  const generateArray = useCallback(() => {
    setArray(getRandomArray(arraySize));
  }, [arraySize]);

  useEffect(() => {
    generateArray();
  }, [arraySize, generateArray]);

  const start = () => {
    setIsActive(true);
    handleSort();
  };

  const stop = () => {
    timeouts.forEach((timeout) => clearTimeout(timeout));
    setIsActive(false);
    resetBars(array);
  };

  const handleSort = () => {
    let newArray = [];
    array.forEach((x) => newArray.push(x));
    let animations = [];
    switch (sortTechnique) {
      case BUBBLE:
        console.log("Sorting by BUBBLE SORT");
        bubbleSort(newArray, animations);
        break;
      case INSERTION:
        console.log("Sorting by INSERTION SORT");
        insertionSort(newArray, animations);
        break;
      case MERGE:
        console.log("Sorting by MERGE SORT");
        mergeSort(
          newArray,
          newArray.slice(),
          0,
          newArray.length - 1,
          animations
        );
        break;
      case QUICK:
      default:
        console.log("Sorting by QUICK SORT");
        quickSort(newArray, 0, newArray.length - 1, animations);
        break;
    }
    handleAnimations(newArray, animations);
  };
  const handleAnimations = (newArray, animations) => {
    setTimeouts(
      startAnimations(animations, animationDelay, () => {
        setArray(newArray);
        setIsActive(false);
        animations = [];
      })
    );
  };
  return (
    <div className="main bg-dark overflow-hidden">
      <NavBar
        isActive={isActive}
        onToggle={() => (isActive ? stop() : start())}
        onGenerate={generateArray}
        onSetSortTechnique={setSortTechnique}
        onDelayChange={setAnimationDelay}
        onSizeChange={setArraySize}
      />
      <div className="d-flex flex-row justify-content-evenly container-fluid overflow-x-auto">
        {array.map((value, idx) => (
          <div
            className="bar w-100"
            style={{ height: `${(value + 10) * 3}px` }}
            key={idx}
          >
            <span className="fw-bolder text-dark p-1">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
