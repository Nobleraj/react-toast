import React, { createRef, forwardRef } from "react";
import { useRef } from "react";
import { useEffect } from "react";

export default function Notes({ notes = [], setNotes }) {
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    const updatedNotes = notes.map((note) => {
      const savedNote = savedNotes.find((val) => val.id === note.id);
      if (savedNote) {
        return { ...savedNote };
      } else {
        const position = getPosition();
        return { ...note, position };
      }
    });
    updatePosition(updatedNotes);
  }, [notes.length]);
  const getPosition = () => {
    const maxX = window.innerWidth - 300;
    const maxY = window.innerHeight - 300;
    return {
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY),
    };
  };
  const noteRefs = useRef([]);
  const handleDragStart = (note, e) => {
    const id = note.id;
    const currentRef = noteRefs.current[id].current;
    const rect = currentRef.getBoundingClientRect();
    const startPos = note.position;
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const handleMouseMove = (e) => {
      const newX = e.clientX - offsetX;
      const newY = e.clientY - offsetY;
      currentRef.style.left = `${newX}px`;
      currentRef.style.top = `${newY}px`;
    };
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      const finalRect = currentRef.getBoundingClientRect();
      const finalPosition = {
        x: finalRect.left,
        y: finalRect.top,
      };
      if (checkOverLap(id)) {
        currentRef.style.left = `${startPos.x}px`;
        currentRef.style.top = `${startPos.y}px`;
      } else {
        const updatedNotes = notes.map((val) =>
          val.id === id ? { ...val, position: finalPosition } : { ...val }
        );
        updatePosition(updatedNotes);
      }
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  const checkOverLap = (id) => {
    const currRef = noteRefs.current[id].current;
    const currRec = currRef.getBoundingClientRect();
    const isOverLap = notes.some((itm) => {
      if (itm.id === id) {
        return false;
      }
      const otherRef = noteRefs.current[itm.id].current;
      const otherRec = otherRef.getBoundingClientRect();
      const overlap = !(
        currRec.right < otherRec.left ||
        currRec.left > otherRec.right ||
        currRec.bottom < otherRec.top ||
        currRec.top > otherRec.bottom
      );
      return overlap;
    });
    return isOverLap;
  };
  const updatePosition = (updatedNotes) => {
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };
  return (
    <div>
      {notes.map((itm) => {
        return (
          <Item
            key={itm.id}
            ref={
              noteRefs.current[itm.id]
                ? noteRefs.current[itm.id]
                : (noteRefs.current[itm.id] = createRef())
            }
            content={itm.body}
            position={itm.position}
            onMouseDown={(e) => handleDragStart(itm, e)}
          />
        );
      })}
    </div>
  );
}

const Item = forwardRef(function Item({ content, position, ...props }, ref) {
  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        left: `${position?.x}px`,
        top: `${position?.y}px`,
        padding: "10px",
        background: "lightyellow",
        width: "250px",
        cursor: "move",
        userSelect: "none",
        border: "1px solid grey",
      }}
      {...props}
    >
      📌 {content}
    </div>
  );
});
