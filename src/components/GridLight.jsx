import React from "react";
import { useState } from "react";

const config = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
];

export default function GridLight() {
  const [savedIndex, setSavedIndex] = useState([]);
  const [isDeactivating, setIsDeactivating] = useState(false);
  const clickHandler = (i) => {
    const newIndex = [...savedIndex, i];
    setSavedIndex(newIndex);
    const savedIndexLength = newIndex.length;
    const configLen = config.flat().filter(Boolean).length;
    if (savedIndexLength === configLen) {
      setIsDeactivating(true);
      deactivateGrid();
    }
  };

  const deactivateGrid = () => {
    let timer = setInterval(() => {
      setSavedIndex((prevIndex) => {
        if (prevIndex.length === 0) {
          clearInterval(timer);
          setIsDeactivating(false);
        }
        const myIndex = [...prevIndex];
        myIndex.pop();
        return myIndex;
      });
    }, 300);
  };
  return (
    <div className="grid-light">
      <div className="grid-wrapper">
        {config.flat().map((val, i) => {
          return val ? (
            <button
              key={i}
              disabled={savedIndex.includes(i) || isDeactivating}
              className={`cell ${savedIndex.includes(i) ? "activated" : ""}`}
              onClick={() => clickHandler(i)}
            ></button>
          ) : (
            <span key={i}></span>
          );
        })}
      </div>
    </div>
  );
}
