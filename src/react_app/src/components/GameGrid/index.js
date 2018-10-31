import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Cell from "./Cell";
import styles from "./styles";

const GameGrid = ({ grid, classes }) => {
  return (
    <Paper elevation={8} className={classes.grid}>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className={classes.row}>
          {row.map((cell, colIndex) => (
            <Cell key={colIndex} cell={cell} />
          ))}
        </div>
      ))}
    </Paper>
  );
};

export default withStyles(styles)(GameGrid);
