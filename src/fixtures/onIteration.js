const zero = [
  [false, false, false, false, false, false, false],
  [false, false, false, false, false, true, false],
  [false, false, true, false, true, true, false],
  [false, false, false, true, true, false, false],
  [false, true, true, true, false, false, false],
  [true, true, false, false, false, false, false],
  [true, true, false, false, false, false, false]
];

const one = [
  [false, false, false, false, false, false, false],
  [false, false, false, false, true, true, false],
  [false, false, false, false, false, true, false],
  [false, true, false, false, false, true, false],
  [true, true, false, true, true, false, false],
  [false, false, false, false, false, false, false],
  [true, true, false, false, false, false, false]
];

const two = [
  [false, false, false, false, false, false, false],
  [false, false, false, false, true, true, false],
  [false, false, false, false, false, true, true],
  [true, true, true, false, false, true, false],
  [true, true, true, false, true, false, false],
  [false, false, true, false, false, false, false],
  [false, false, false, false, false, false, false]
];

const three = [
  [false, false, false, false, false, false, false],
  [false, false, false, false, true, true, true],
  [false, true, false, false, false, false, true],
  [true, false, true, true, true, true, true],
  [true, false, false, false, false, false, false],
  [false, false, true, true, false, false, false],
  [false, false, false, false, false, false, false]
];

const four = [
  [false, false, false, false, false, true, false],
  [false, false, false, false, false, true, true],
  [false, true, true, false, false, false, false],
  [true, false, true, true, true, true, true],
  [false, false, false, false, false, true, false],
  [false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false]
];

const five = [
  [false, false, false, false, false, true, true],
  [false, false, false, false, false, true, true],
  [false, true, true, false, false, false, false],
  [false, false, true, true, true, true, true],
  [false, false, false, true, false, true, true],
  [false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false]
];

module.exports = { zero, one, two, three, four, five };
