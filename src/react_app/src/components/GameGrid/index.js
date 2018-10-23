import React from "react";

import "./styles.css";

const cellClassName = cell => {
  return cell ? "cell alive" : "cell dead";
};

const Cell = ({ cell }) => <div className={cellClassName(cell)} />;

const Row = ({ row }) => (
  <div className="row">
    {row.map((cell, colIndex) => (
      <Cell key={colIndex} cell={cell} />
    ))}
  </div>
);

const GameGrid = ({ grid }) => {
  return (
    <div id="grid" className="grid">
      {grid.map((row, rowIndex) => (
        <Row key={rowIndex} row={row} />
      ))}
    </div>
  );
};

export default GameGrid;
