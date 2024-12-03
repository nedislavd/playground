import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  return parseInput(rawInput).split('\n')
      .flatMap(line => [...line.matchAll(/mul\((\d+),(\d+)\)/g)])
      .reduce((sum, match) => sum + parseInt(match[1], 10) * parseInt(match[2], 10), 0);
};

const part2 = (rawInput: string) => {
  return [...parseInput(rawInput).matchAll(/(?<=(?:do\(\)|^)(?:.(?!don't\(\)))*)mul\((\d+),(\d+)\)/gs)].reduce((sum, match) => {
    const [_, num1, num2] = match;
    return sum + parseInt(num1, 10) * parseInt(num2, 10);
  }, 0);
};

run({
  part1: {
    tests: [
      {
        input: `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`,
        expected: 161,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
        expected: 48,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
