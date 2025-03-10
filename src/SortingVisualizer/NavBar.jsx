/* BuiltIn  */
import React, { useEffect, useState } from "react";
/* Constants */
import { BUBBLE, INSERTION, MERGE, QUICK } from "../constants/sort";
import { FaGithub } from 'react-icons/fa';


const sortingTechniques = [
  { label: "Quick Sort", value: QUICK },
  { label: "Merge Sort", value: MERGE },
  { label: "Bubble Sort", value: BUBBLE },
  { label: "Insertion Sort", value: INSERTION },
];

const getMaxSize = () => {
  let width = window.innerWidth;
  let maxSize = Math.floor(width / 35);
  return maxSize;
};

export default function NavBar({
  maxSize,
  isActive,
  onToggle,
  onGenerate,
  onSetSortTechnique,
  onDelayChange,
  onSizeChange,
}) {
  const [sortTechnique, setSortTechnique] = useState(QUICK);
  const [animationDelay, setAnimationDelay] = useState(50);
  const [arraySize, setArraySize] = useState(Math.floor(getMaxSize() / 2));

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
    <nav className="navbar navbar-expand-xl navbar-dark bg-dark container-fluid text-light">
      <div className="row g-0 gx-2 gy-3 w-100 p-2 p-lg-3">
        <div className="col-12 row g-0 my-3">
          <h2 className="col-8 text-light fs-1 fw-bold text-nowrap text-start">Sorting Visualizer</h2>
          <div className="col-4 text-end">
          <button
            className="btn btn-primary text-light fw-bold fs-5"
            onClick={() =>
              window.open("https://github.com/mohit718/Visualizer", "_blank")
            }
          >
            Github{" "}
            <span className="">
              <FaGithub />
            </span>
          </button></div>
        </div>
        {/* size-bar */}
        <div className="col-12 col-lg-2 row g-0">
          <span className="text-start fw-bolder fs-6 text-nowrap col-4 col-lg-12">
            Size: {arraySize}
          </span>
          <input
            type="range"
            className="col-8 col-lg-11"
            id="array-size"
            min="3"
            max={getMaxSize()}
            disabled={isActive}
            value={arraySize}
            onChange={(e) => setArraySize(e.target.value)}
          />
        </div>
        {/* delay-bar */}
        <div className="col-12 col-lg-2 row g-0">
          <span className="text-start fw-bolder fs-6 text-nowrap col-4 col-lg-12">
            Delay: {animationDelay}ms
          </span>
          <input
            type="range"
            className="col-8 col-lg-11"
            id="animation-delay"
            min="5"
            max="500"
            disabled={isActive}
            value={animationDelay}
            onChange={(e) => setAnimationDelay(e.target.value)}
          />
        </div>
        {/* sorting-techniques */}
        <div className="col-12 col-lg-6 btn-group" role="group">
          {sortingTechniques.map(({ label, value }) => {
            return (
              <button
                key={value}
                className={
                  "btn btn-sm btn-outline-primary " +
                  (sortTechnique === value && "active")
                }
                disabled={isActive}
                onClick={() => setSortTechnique(value)}
              >
                {label}
              </button>
            );
          })}
        </div>
        {/* generate-sort-buttons */}
        <div className="col-12 col-lg-2 text-center text-lg-end">
          <div className="btn-group" role="group">
            <button
              className="btn p-2 px-4 btn-secondary"
              onClick={onGenerate}
              disabled={isActive}
            >
              Generate
            </button>
            <button
              className={
                "fw-bold btn p-2 px-4 " +
                (isActive ? "btn-danger" : "btn-success")
              }
              onClick={onToggle}
            >
              {isActive ? "Stop" : "Sort"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
