/* BuiltIn  */
import React, { useEffect, useState } from "react";
/* Constants */
import { BUBBLE, INSERTION, MERGE, QUICK } from "../constants/sort";

const sortingTechniques = [
  { label: "Quick Sort", value: QUICK },
  { label: "Merge Sort", value: MERGE },
  { label: "Bubble Sort", value: BUBBLE },
  { label: "Insertion Sort", value: INSERTION },
];

const getMaxSize = () => {
  let maxSize = 50;
  let width = window.innerWidth;
  if (width >= 540) {
    maxSize = 90;
  } else if (width >= 1024) {
    maxSize = 150;
  }
  return maxSize;
};

export default function NavBar({
  isActive,
  onToggle,
  onGenerate,
  onSetSortTechnique,
  onDelayChange,
  onSizeChange,
}) {
  const [sortTechnique, setSortTechnique] = useState(QUICK);
  const [animationDelay, setAnimationDelay] = useState(50);
  const [arraySize, setArraySize] = useState(50);

  useEffect(() => {
    onSetSortTechnique(sortTechnique);
  }, [sortTechnique, onSetSortTechnique]);

  useEffect(() => {
    onDelayChange(animationDelay);
  }, [animationDelay, onDelayChange]);

  useEffect(() => {
    onSizeChange(arraySize);
  }, [arraySize, onSizeChange]);

  return (
    <nav className="navbar navbar-expand-xl navbar-dark bg-dark">
      <div className="col-12 col-xl-2 row">
        <h2 className="text-light">Sorting</h2>
      </div>
      <div className="col-12 col-xl-5 px-3 row">
        <div className="col-12 col-md-2 my-1">
          <button
            className="btn btn-secondary"
            onClick={onGenerate}
            disabled={isActive}>
            Generate
          </button>
        </div>
        <div className="col-12 col-md-10 my-1 btn-group" role="group">
          {sortingTechniques.map(({ label, value }) => {
            return (
              <button
                key={value}
                className={
                  "btn btn-sm btn-outline-primary " +
                  (sortTechnique === value && "active")
                }
                disabled={isActive}
                onClick={() => setSortTechnique(value)}>
                {label}
              </button>
            );
          })}
        </div>
      </div>
      <div className="col-12 col-xl-4 row">
        <div className="col-12 col-lg-6">
          <label htmlFor="array-size" className="form-label text-light mx-3">
            Size
          </label>
          <span className="text-light h5">{arraySize}</span>
          <input
            type="range"
            className="form-range"
            id="array-size"
            min="10"
            max={getMaxSize()}
            disabled={isActive}
            onChange={e => setArraySize(e.target.value)}
          />
        </div>
        <div className="col-12 col-lg-6">
          <label
            htmlFor="animation-delay"
            className="form-label text-light mx-3">
            Delay
          </label>
          <span className="text-light h5">{animationDelay}ms</span>
          <input
            type="range"
            className="form-range"
            id="animation-delay"
            min="5"
            max="500"
            disabled={isActive}
            onChange={e => setAnimationDelay(e.target.value)}
          />
        </div>
      </div>
      <div className="col-12 col-xl-1 ">
        <button
          className={"btn btn-lg " + (isActive ? "btn-danger" : "btn-success")}
          onClick={onToggle}>
          {isActive ? "Stop" : "Sort"}
        </button>
      </div>
    </nav>
  );
}
