// import { useEffect, useRef } from "react";
import { useState } from "react";
import Notification from "./Notification";

export default function useNotification(position = "top-right") {
  const [notification, setNotification] = useState([]);
  // const listRef = useRef(null);
  const triggerNotification = (props) => {
    setNotification([...notification, props]);
    setTimeout(() => {
      removeStack(props.id);
    }, props.duration);
  };
  //   const handleScrolling = (el) => {
  //     const isTopPosition = ["top-left", "top-right"].includes(position);
  //     if (isTopPosition) {
  //       el?.scrollTo(0, el.scrollHeight);
  //       console.log("isTopPosition", isTopPosition, el?.scrollHeight);
  //     } else {
  //       el?.scrollTo(0, 0);
  //     }
  //   };

  //   useEffect(() => {
  //     handleScrolling(listRef.current);
  //   }, [triggerNotification]);
  const removeStack = (id) => {
    setNotification((prev) => prev.filter((val) => val.id !== id));
  };
  const sortedData = position.includes("bottom")
    ? [...notification].reverse()
    : [...notification];
  const NotificationCmp =
    sortedData.length > 0 ? (
      <div className={`${position}`}>
        {sortedData.map((val, i) => {
          return (
            <Notification
              key={i}
              {...val}
              onClose={() => removeStack(val.id)}
            />
          );
        })}
      </div>
    ) : null;
  return { triggerNotification, NotificationCmp };
}
