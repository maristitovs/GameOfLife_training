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
    const gridReduce = (newGrid, row, rowIndex) => {
      const reduceRow = (newRow, alive, columnIndex) => {
        const liveNeighbours = this._countLiveNeighbours(rowIndex, columnIndex);
        if (alive) {
          if (this._isIsolation(liveNeighbours)) {
            newRow.push(false);
            this.provider.onIsolation(rowIndex, columnIndex);
          } else if (this._isLive(liveNeighbours)) {
            newRow.push(true);
            this.provider.onLive(rowIndex, columnIndex);
          } else if (this._isOverPopulation(liveNeighbours)) {
            newRow.push(false);
            this.provider.onOverPopulation(rowIndex, columnIndex);
          }
        } else {
          if (this._isReproduction(liveNeighbours)) {
            newRow.push(true);
            this.provider.onReproduction(rowIndex, columnIndex);
          } else {
            newRow.push(false);
          }
        }
        return newRow;
      };

      newGrid.push(row.reduce(reduceRow, []));
      return newGrid;
      // };
    };
    const newGrid = this.grid.reduce(gridReduce, []);
    this.provider.onIteration(newGrid);
  }

  _isIsolation(liveNeighbours) {
    return liveNeighbours < 2;
  }

  _isLive(liveNeighbours) {
    // boolean
    return [2, 3].includes(liveNeighbours);
  }

  _isOverPopulation(liveNeighbours) {
    return liveNeighbours > 3;
  }

  _isReproduction(liveNeighbours) {
    return liveNeighbours === 3;
  }

  _countLiveNeighbours(row, column) {
    const reducer = (liveNeighbours, [y, x]) => {
      const posY = row + y;
      const posX = column + x;
      if (this._outOfBounds(posY, posX)) return liveNeighbours;

      return liveNeighbours + Number(this.grid[posY][posX]);
    };

    return POSITIONS.reduce(reducer, 0);
  }

  _outOfBounds(posY, posX) {
    return posX < 0 || posY < 0 || posX >= this.size || posY >= this.size;
  }
}

module.exports = {
  GameOfLife
};
