import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

/* Generates an array of numbers with a start and end*/
const range = (start: number, end: number) => {
  return Array(Number(end) - Number(start) + Number(1))
    .fill("")
    .map((_, idx: number) => Number(start) + Number(idx));
};

const containedCheck = (
  firstElfRange: number[],
  secondElfRange: number[],
  fn: any,
) => {
  return (
    firstElfRange[fn]((num: number) => secondElfRange.includes(num)) ||
    secondElfRange[fn]((num: number) => firstElfRange.includes(num))
  );
};

const part1 = (rawInput: string) => {
  let containEveryCounter: number = 0;
  const elfPairs: string[][] = parseInput(rawInput)
    .split("\n")
    .map((pair) => pair.split(","));

  // create arrays from each pair's ranges
  elfPairs.forEach((pair) => {
    const firstElfRange: number[] = range(
      Number(pair[0].split("-")[0]),
      Number(pair[0].split("-")[1]),
    );
    const secondElfRange: number[] = range(
      Number(pair[1].split("-")[0]),
      Number(pair[1].split("-")[1]),
    );

    // check if Array.every is true for each pair
    if (containedCheck(firstElfRange, secondElfRange, "every")) {
      containEveryCounter++;
    }
  });

  return containEveryCounter;
};

const part2 = (rawInput: string) => {
  let containSomeCounter: number = 0;
  const elfPairs: string[][] = parseInput(rawInput)
    .split("\n")
    .map((pair) => pair.split(","));

  // create arrays from each pair's ranges
  elfPairs.forEach((pair) => {
    const firstElfRange: number[] = range(
      Number(pair[0].split("-")[0]),
      Number(pair[0].split("-")[1]),
    );
    const secondElfRange: number[] = range(
      Number(pair[1].split("-")[0]),
      Number(pair[1].split("-")[1]),
    );

    // check if Array.every is true for each pair
    if (containedCheck(firstElfRange, secondElfRange, "some")) {
      containSomeCounter++;
    }
  });

  return containSomeCounter;
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
