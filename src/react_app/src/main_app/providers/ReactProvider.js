//
const TABLE_ELEMENTS = ["iteration", "isolation", "live", "overPopulation", "reproduction"];

export default class ReactProvider {
  constructor(reactRef) {
    this.counters = this._resetCounter();
    this.reactRef = reactRef;
  }

  onIteration = grid => {
    this.reactRef.onIteration(grid, this.counters);
    this.counters = { ...this._resetCounter(), iteration: this.counters.iteration + 1 };
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

  _resetCounter = () => {
    return TABLE_ELEMENTS.reduce((acc, rule) => ({ ...acc, [rule]: 0 }), {});
  };
}
