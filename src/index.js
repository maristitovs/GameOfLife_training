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
    setInterval(() => {
      this._iterate();
    }, 1000);
  }

  _iterate() {
    this.grid = this._generateNewGrid();
    this.provider.onIteration(this.grid);
  }

  _generateNewGrid() {
    return this.grid.map((row, rowIndex) => {
      return row.map((alive, columnIndex) => {
        const liveNeighbours = this._countLiveNeighbours(rowIndex, columnIndex);

        const { action, value } = this._getActionAndValue(
          alive,
          liveNeighbours
        );
        action && this.provider[action](rowIndex, columnIndex);
        return value;
      });
    });
  }

  _getActionAndValue(alive, liveNeighbours) {
    if (alive) {
      if (this._isIsolation(liveNeighbours)) {
        return { action: "onIsolation", value: false };
      } else if (this._isLive(liveNeighbours)) {
        return { action: "onLive", value: true };
      } else if (this._isOverPopulation(liveNeighbours)) {
        return { action: "onOverPopulation", value: false };
      }
    } else if (this._isReproduction(liveNeighbours)) {
      return { action: "onReproduction", value: true };
    } else {
      return { value: false };
    }
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
