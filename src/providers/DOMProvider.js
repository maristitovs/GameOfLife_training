// import fixtures from "../fixtures";
const MAX_ROWS = 10;
const TABLE_ELEMENTS = ["iteration", "isolation", "live", "overPopulation", "reproduction"];

export default class DOMProvider {
  constructor() {
    this.game = document.querySelector("#game");
    this.changelog = document.querySelector("#changelog tbody");
    this.counters = { iteration: 0, isolation: 0, live: 0, overPopulation: 0, reproduction: 0 };
    while (this.game.firstChild) {
      this.game.removeChild(this.game.firstChild);
    }
    while (this.changelog.firstChild) {
      this.changelog.removeChild(this.changelog.firstChild);
    }
  }

  onIteration = grid => {
    !this.created && this._createGrid(grid);
    this.counters.iteration++;
    this._changeGrid(grid);

    this.counters.iteration > MAX_ROWS && this._removeLast();

    this._updateChangelog();
    this._resetCounters();
  };
  onIsolation = () => {
    this.counters.isolation++;
  };
  onLive = () => {
    this.counters.live++;
  };
  onOverPopulation = () => {
    this.counters.overPopulation++;
  };
  onReproduction = () => {
    this.counters.reproduction++;
  };

  grid = (sizeX, sizeY) => {
    return [...Array(sizeY)].map(() => {
      return [...Array(sizeX)].map(() => Boolean(Math.round(Math.random())));
    });
  };

  _createGrid = grid => {
    grid.forEach(row => this.game.appendChild(this._createGameRow(row)));
    this.created = true;
  };

  _createGameRow = row => {
    const element = document.createElement("div");
    element.classList.add("row");
    row.forEach(() => element.appendChild(this._createCell()));
    return element;
  };
  _createCell = () => {
    const element = document.createElement("div");
    element.classList.add("cell");
    return element;
  };

  _changeGrid = grid => {
    grid.forEach((row, rowIndex) => {
      row.forEach((alive, columnIndex) => {
        const classes = this.game.children[rowIndex].children[columnIndex].classList;
        if (alive) {
          classes.add("alive");
          classes.remove("dead");
        } else {
          classes.add("dead");
          classes.remove("alive");
        }
      });
    });
  };
  _updateChangelog = () => {
    const table = this.changelog;
    const row = table.insertRow(0);
    const iterationCount = row.insertCell(0);
    const isolationCount = row.insertCell(1);
    const liveCount = row.insertCell(2);
    const overPopulationCount = row.insertCell(3);
    const reproductionCount = row.insertCell(4);

    iterationCount.textContent = this.counters.iteration;
    isolationCount.textContent = this.counters.isolation;
    liveCount.textContent = this.counters.live;
    overPopulationCount.textContent = this.counters.overPopulation;
    reproductionCount.textContent = this.counters.reproduction;
  };
  _removeLast = () => {
    this.changelog.deleteRow(MAX_ROWS - 1);
  };
  _resetCounters = () => {
    TABLE_ELEMENTS.forEach(element => {
      if (element != "iteration") {
        this.counters[element] = 0;
      }
    });
  };
}
