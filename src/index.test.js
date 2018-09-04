const { GameOfLife } = require("./index");

class TestProvider {
  constructor({
    onIteration,
    onIsolation,
    onLive,
    onOverPopulation,
    onReproduction
  }) {
    this.onIteration = onIteration || jest.fn();
    this.onIsolation = onIsolation || jest.fn();
    this.onLive = onLive || jest.fn();
    this.onOverPopulation = onOverPopulation || jest.fn();
    this.onReproduction = onReproduction || jest.fn();
  }
}

describe("GameOfLife", () => {
  const grid = [
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, true, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false]
  ];

  it("should initialize", () => {
    const provider = new TestProvider({});
    const life = new GameOfLife(grid, provider);

    expect(life).toBeInstanceOf(GameOfLife);
    expect(life.size).toBe(7);
    expect(life.grid).toEqual(grid);
    expect(life.provider).toEqual(provider);
  });

  it("#onIteration", () => {
    const onIteration = jest.fn();
    const provider = new TestProvider({ onIteration });
    const life = new GameOfLife(grid, provider);
    life.start();

    expect(onIteration).toBeCalledWith([
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false]
    ]);
  });
});
