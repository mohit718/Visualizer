import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import NavBar from "./NavBar";
import { getRandomArray } from "../utilities/Random";
import "./SortingVisualizer.css";
import {
  BUBBLE,
  INSERTION,
  QUICK,
  MERGE,
  sort,
  COMPARE,
  FINISH,
  SWAP,
} from "../utilities/SortingTechnique";
import { handleAnimations } from "../utilities/Animation";

export default function SortingVisualizer() {
  const [isActive, setIsActive] = useState(false);
  const [array, setArray] = useState([]);
  const [sortTechnique, setSortTechnique] = useState(BUBBLE);
  const [timeouts, setTimeouts] = useState([]);

  useEffect(() => {
    resetArray();
  }, []);

  const toggleState = () => {
    if (isActive) {
      setIsActive(false);
      timeouts.forEach(timeout => clearTimeout(timeout));
    } else {
      setIsActive(true);
      handleSort();
    }
  };

  const resetArray = () => {
    setArray(getRandomArray(5));
  };

  const handleSort = () => {
    let newArray = [];
    array.forEach(x => newArray.push(x));
    let animations = [];
    switch (sortTechnique) {
      case BUBBLE:
        console.log("Sorting by BUBBLE SORT");
        animations = sort.bubble(newArray);
        break;
      case INSERTION:
        console.log("Sorting by INSERTION SORT");
        animations = sort.insertion(newArray);
        break;
      case MERGE:
        console.log("Sorting by MERGE SORT");
        animations = sort.merge(newArray);
        break;
      case QUICK:
      default:
        console.log("Sorting by QUICK SORT");
        animations = sort.quick(newArray);
        break;
    }
    setTimeouts(
      handleAnimations(animations, 50, () => {
        setArray(newArray);
        setIsActive(false);
        animations = [];
      })
    );
  };

  return (
    <div className="main bg-dark">
      <NavBar
        isActive={isActive}
        onToggleState={toggleState}
        onResetArray={resetArray}
        onSetSortTechnique={setSortTechnique}
      />
      <div className="d-flex flex-row justify-content-evenly container">
        {array.map((value, idx) => (
          <div
            className="bar w-100 "
            style={{ height: `${value}px` }}
            key={idx}></div>
        ))}
      </div>
    </div>
  );
}
