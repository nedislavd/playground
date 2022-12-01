import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const listOfCalories = parseInput(rawInput);
  const listOfCaloriesPerElf: string[] = listOfCalories.split("\n");
  let sumOfCaloriesPerElf: number[] = [];
  let sumPerElf: number = 0;

  for (let i = 0; i < listOfCaloriesPerElf.length; i++) {
    if (listOfCaloriesPerElf[i] !== "") {
      sumPerElf += parseInt(listOfCaloriesPerElf[i]);
      continue;
    }
    sumOfCaloriesPerElf.push(sumPerElf);
    sumPerElf = 0;
  }
  return Math.max(...sumOfCaloriesPerElf);
};

const part2 = (rawInput: string) => {
  const listOfCalories = parseInput(rawInput);
  const listOfCaloriesPerElf: string[] = listOfCalories.split("\n");
  let sumOfCaloriesPerElf: number[] = [];
  let sumPerElf: number = 0;

  for (let i = 0; i < listOfCaloriesPerElf.length; i++) {
    if (listOfCaloriesPerElf[i] !== "") {
      sumPerElf += parseInt(listOfCaloriesPerElf[i]);
      continue;
    }
    sumOfCaloriesPerElf.push(sumPerElf);
    sumPerElf = 0;
  }
  return sumOfCaloriesPerElf
    .sort(function (a, b) {
      return b - a;
    })
    .slice(0, 3)
    .reduce((sum, x) => sum + x);
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
