// prettier-ignore
const POSITIONS = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1], [0, 1],
  [1, -1], [1, 0], [1, 1]
];

class GameOfLife {
  constructor(initialGrid, provider) {
    this.grid = [...initialGrid];
    this.provider = provider;
    this.size = this.grid.length;
  }

  start() {
    this._iterate();
  }

  _iterate() {
    const newGrid = [];
    this.grid.forEach((row, columnIndex) => {
      row.forEach((element, rowIndex) => {
        const neighbours = this._countNeighbours(columnIndex, rowIndex);
        // neighbours && console.log(neighbours, columnIndex, rowIndex);
        if (element === true && neighbours < 2) {
          // RULE 1
          newGrid.push(false);
          this.provider.onIsolation(columnIndex, rowIndex);
        } else if (element === true && (neighbours === 2 || neighbours === 3)) {
          // RULE 2
          newGrid.push(true);
          this.provider.onLive(columnIndex, rowIndex);
        } else if (element === true && neighbours > 3) {
          // RULE 3
          newGrid.push(false);
          this.provider.onOverPopulation(columnIndex, rowIndex);
        } else if (element === false && neighbours === 3) {
          // RULE 4
          newGrid.push(true);
          this.provider.onReproduction(columnIndex, rowIndex);
        } else {
          newGrid.push(element);
        }
      });
    });
    this.provider.onIteration(newGrid);
  }

  _countNeighbours(column, row) {
    let count = 0;

    POSITIONS.forEach(([x, y]) => {
      const posX = row + x;
      const posY = column + y;
      if (this._outOfBounds(posX, posY)) return;

      this.grid[posY][posX] && console.warn(column, row);
      count += Number(this.grid[posY][posX]);
    });

    return count;
  }

  _outOfBounds(posX, posY) {
    return posX < 0 || posY < 0 || posX >= this.size || posY >= this.size;
  }
}

module.exports = {
  GameOfLife
};
