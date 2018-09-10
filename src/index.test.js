const fixtures = require("./fixtures");
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
  const copySetInterval = setInterval;
  afterEach(() => {
    setInterval = copySetInterval;
  });
  it("should initialize", () => {
    const provider = new TestProvider();
    const life = new GameOfLife(fixtures.onIteration.zero, provider);

    expect(life).toBeInstanceOf(GameOfLife);
    expect(life.size).toBe(7);
    expect(life.grid).toEqual(fixtures.onIteration.zero);
    expect(life.provider).toEqual(provider);
  });

  it("#onIteration", () => {
    const provider = new TestProvider();
    const life = new GameOfLife(fixtures.onIteration.zero, provider);
    setInterval = (callback, interval) => {
      for (let i = 0; i < 4; i++) {
        callback();
      }
    };

    life.start();

    expect(provider.onIteration).toHaveBeenCalledTimes(5);

    expect(provider.onIteration).toHaveBeenNthCalledWith(
      1,
      fixtures.onIteration.one
    );
    expect(provider.onIteration).toHaveBeenNthCalledWith(
      2,
      fixtures.onIteration.two
    );
    expect(provider.onIteration).toHaveBeenNthCalledWith(
      3,
      fixtures.onIteration.three
    );
    expect(provider.onIteration).toHaveBeenNthCalledWith(
      4,
      fixtures.onIteration.four
    );
    expect(provider.onIteration).toHaveBeenNthCalledWith(
      5,
      fixtures.onIteration.five
    );
  });

  it("#onIsolation", () => {
    const provider = new TestProvider();
    const life = new GameOfLife(fixtures.onIsolation.given, provider);
    life.start();

    expect(provider.onIsolation).toHaveBeenCalledTimes(1);
    expect(provider.onIsolation).toHaveBeenNthCalledWith(1, 2, 2);
    expect(provider.onIteration).toBeCalledWith(fixtures.onIsolation.expected);
  });

  it("#onLive", () => {
    const provider = new TestProvider();
    const life = new GameOfLife(fixtures.onLive.given, provider);
    life.start();

    expect(provider.onLive).toHaveBeenCalledTimes(3);
    expect(provider.onLive).toHaveBeenNthCalledWith(1, 1, 2);
    expect(provider.onLive).toHaveBeenNthCalledWith(2, 2, 2);
    expect(provider.onLive).toHaveBeenNthCalledWith(3, 2, 3);
    expect(provider.onIteration).toBeCalledWith(fixtures.onLive.expected);
  });

  it("#onOverPopulation", () => {
    const provider = new TestProvider();
    const life = new GameOfLife(fixtures.onOverPopulation.given, provider);
    life.start();

    expect(provider.onOverPopulation).toHaveBeenCalledTimes(1);
    expect(provider.onOverPopulation).toHaveBeenNthCalledWith(1, 2, 2);
    expect(provider.onIteration).toBeCalledWith(
      fixtures.onOverPopulation.expected
    );
  });

  it("#onReproduction", () => {
    const provider = new TestProvider();
    const life = new GameOfLife(fixtures.onReproduction.given, provider);
    life.start();

    expect(provider.onReproduction).toHaveBeenCalledTimes(1);
    expect(provider.onReproduction).toHaveBeenNthCalledWith(1, 1, 1);
    expect(provider.onIteration).toBeCalledWith(
      fixtures.onReproduction.expected
    );
  });
});
