import React, { useState } from "react";

const SpecialCard = (props) => {
  const [targetbox, setTargetBox] = useState(null);
  const { index, swap,title,details } = props;

  const cssGrid = {
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
  };

  const dragEnd = (event) => {
    setTargetBox(null);
  };

  const dragStart = (event) => {
    event.dataTransfer.setData("text", event.target.id);
    setTargetBox(true);
  };

  const drop = (event) => {
    if (event.target.id) {
      swap(event.dataTransfer.getData("text"), event.target.id);
      event.dataTransfer.clearData();
    }
  };

  if (targetbox === null) {
    return (
      <div
        className={cssGrid[index]}
        id={title}
        draggable="true"
        onDrop={drop}
        onDragStart={dragStart}
        onDragOver={(event) => event.preventDefault()}
        onDragEnd={dragEnd}
      >
        <h3>{title}</h3>
        <p>{details}</p>
      </div>
    );
  } else {
    const style = { backgroundColor: "red" };
    return (
      <div
        style={style}
        className={cssGrid[index]}
        id={title}
        draggable="true"
        onDrop={drop}
        onDragStart={dragStart}
        onDragOver={(event) => event.preventDefault()}
        onDragEnd={dragEnd}
      ></div>
    );
  }
};

export default SpecialCard;
