import React, { useState } from "react";
import { BUBBLE, INSERTION, MERGE, QUICK } from "../utilities/SortingTechnique";

export default function NavBar({
  isActive,
  onToggleState,
  onResetArray,
  onSetSortTechnique,
}) {
  const [sortTechnique, setSortTechnique] = useState(0);

  const handleSort = val => {
    setSortTechnique(val);
    onSetSortTechnique(sortTechnique);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="col-2">
        <h2 className="text-light">Sorting</h2>
      </div>
      <div className="col-8">
        <div className="btn-group" role="group">
          <button
            className={
              "btn btn-secondary " + (sortTechnique === BUBBLE && "active")
            }
            disabled={isActive}
            onClick={() => handleSort(BUBBLE)}>
            Bubble Sort
          </button>
          <button
            className={
              "btn btn-secondary " + (sortTechnique === INSERTION && "active")
            }
            disabled={isActive}
            onClick={() => handleSort(INSERTION)}>
            Insertion Sort
          </button>
          <button
            className={
              "btn btn-secondary " + (sortTechnique === MERGE && "active")
            }
            disabled={isActive}
            onClick={() => handleSort(MERGE)}>
            Merge Sort
          </button>
          <button
            className={
              "btn btn-secondary " + (sortTechnique === QUICK && "active")
            }
            disabled={isActive}
            onClick={() => handleSort(QUICK)}>
            Quick Sort
          </button>
        </div>
      </div>
      <div className="col-2">
        <div className="btn-group" role="group">
          <button
            className={
              "btn btn-lg " + (isActive ? "btn-danger" : "btn-success")
            }
            onClick={onToggleState}>
            {isActive ? "Stop" : "Sort"}
          </button>
          <button
            className="btn btn-lg btn-secondary"
            onClick={onResetArray}
            disabled={isActive}>
            Reset
          </button>
        </div>
      </div>
    </nav>
  );
}
