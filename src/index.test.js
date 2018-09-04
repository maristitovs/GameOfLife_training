const { GameOfLife } = require("./index");

class TestProvider {
  constructor() {
    this.onIteration = jest.fn();
    this.onIsolation = jest.fn();
    this.onLive = jest.fn();
    this.onOverPopulation = jest.fn();
    this.onReproduction = jest.fn();
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
    const provider = new TestProvider();
    const life = new GameOfLife(grid, provider);
    life.start();

    expect(provider.onIteration).toBeCalledWith([
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false]
    ]);
  });

  it("#onIsolation", () => {
    const provider = new TestProvider();
    const life = new GameOfLife(grid, provider);
    life.start();

    expect(provider.onIsolation).toBeCalledWith(3, 3);
  });
  it("#onLive", () => {
    const liveGrid = [
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false],
      [false, false, true, false, false, false, false],
      [false, false, false, true, false, false, false],
      [false, false, false, false, true, false, false],
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false]
    ];
    const provider = new TestProvider();
    const life = new GameOfLife(liveGrid, provider);
    life.start();

    expect(provider.onLive).toBeCalledWith(3, 3);
    expect(provider.onIsolation).toBeCalledWith(2, 2);
    expect(provider.onIsolation).toBeCalledWith(4, 4);
  });

  it("#onOverPopulation", () => {
    const overGrid = [
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false],
      [false, false, false, true, true, false, false],
      [false, false, false, true, true, false, false],
      [false, false, false, true, false, false, false],
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false]
    ];
    const provider = new TestProvider();
    const life = new GameOfLife(overGrid, provider);
    life.start();

    expect(provider.onOverPopulation).toBeCalledWith(3, 3);
    expect(provider.onOverPopulation).toBeCalledWith(4, 3);
  });
  it("#onReproduction", () => {
    const reproductionGrid = [
      [false, true, false, false, false, false, false],
      [true, true, false, false, false, false, false],
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false],
      [false, false, false, false, false, true, true],
      [false, false, false, false, false, true, false]
    ];
    const provider = new TestProvider();
    const life = new GameOfLife(reproductionGrid, provider);
    life.start();

    // expect(provider.onReproduction).toBeCalledTwice();
    expect(provider.onReproduction).toBeCalledWith(0, 0);
    expect(provider.onReproduction).toBeCalledWith(6, 6);
  });
});
