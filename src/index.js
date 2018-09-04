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
    this.grid.forEach((row, rowIndex) => {
      const newRow = [];
      row.forEach((element, columnIndex) => {
        const neighbours = this._countNeighbours(rowIndex, columnIndex);
        // neighbours && console.log(neighbours, columnIndex, rowIndex);
        if (element) {
          if (neighbours < 2) {
            // RULE 1
            newRow.push(false);
            this.provider.onIsolation(rowIndex, columnIndex);
          } else if (neighbours === 2 || neighbours === 3) {
            // RULE 2
            newRow.push(true);
            this.provider.onLive(rowIndex, columnIndex);
          } else if (neighbours > 3) {
            // RULE 3
            newRow.push(false);
            this.provider.onOverPopulation(rowIndex, columnIndex);
          }
        } else {
          if (neighbours === 3) {
            // RULE 4
            newRow.push(true);
            this.provider.onReproduction(rowIndex, columnIndex);
          } else {
            newRow.push(element);
          }
        }
      });
      newGrid.push(newRow);
    });
    this.provider.onIteration(newGrid);
  }

  _countNeighbours(column, row) {
    let count = 0;

    POSITIONS.forEach(([y, x]) => {
      const posY = row + y;
      const posX = column + x;
      if (this._outOfBounds(posY, posX)) return;

      // this.grid[posY][posX] && console.warn(column, row);
      count += Number(this.grid[posY][posX]);
    });

    return count;
  }

  _outOfBounds(posY, posX) {
    return posX < 0 || posY < 0 || posX >= this.size || posY >= this.size;
  }
}

module.exports = {
  GameOfLife
};
