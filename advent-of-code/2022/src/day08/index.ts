import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const forestRows: string[] = parseInput(rawInput).split("\n");
  let visibleTrees: number = 0;

  for (let y = 0; y < forestRows.length; y++) {
    for (let x = 0; x < forestRows[y].length; x++) {
      if (
        x == 0 ||
        y == 0 ||
        x == forestRows[y].length - 1 ||
        y == forestRows.length - 1
      ) {
        visibleTrees++;
        continue;
      }

      let isVisible = true;
      for (let i = 0; i < x; i++) {
        if (forestRows[y][i] >= forestRows[y][x]) isVisible = false;
      }
      if (isVisible) {
        visibleTrees++;
        continue;
      }

      isVisible = true;
      for (let i = x + 1; i < forestRows[y].length; i++) {
        if (forestRows[y][i] >= forestRows[y][x]) isVisible = false;
      }
      if (isVisible) {
        visibleTrees++;
        continue;
      }

      isVisible = true;
      for (let i = 0; i < y; i++) {
        if (forestRows[i][x] >= forestRows[y][x]) isVisible = false;
      }
      if (isVisible) {
        visibleTrees++;
        continue;
      }

      isVisible = true;
      for (let i = y + 1; i < forestRows.length; i++) {
        if (forestRows[i][x] >= forestRows[y][x]) isVisible = false;
      }
      if (isVisible) {
        visibleTrees++;
        continue;
      }
    }
  }
  return visibleTrees;
};

const part2 = (rawInput: string) => {
  let forestRows: string[] = parseInput(rawInput).split("\n");

  let highestScenicScore = 0;
  for (let y = 0; y < forestRows.length; y++) {
    for (let x = 0; x < forestRows[y].length; x++) {
      let left = 0;
      for (let i = x - 1; i >= 0; i--) {
        left++;
        if (forestRows[y][i] >= forestRows[y][x]) break;
      }

      let right = 0;
      for (let i = x + 1; i < forestRows[y].length; i++) {
        right++;
        if (forestRows[y][i] >= forestRows[y][x]) break;
      }

      let top = 0;
      for (let i = y - 1; i >= 0; i--) {
        top++;
        if (forestRows[i][x] >= forestRows[y][x]) break;
      }

      let bottom = 0;
      for (let i = y + 1; i < forestRows.length; i++) {
        bottom++;
        if (forestRows[i][x] >= forestRows[y][x]) break;
      }

      highestScenicScore = Math.max(
        left * right * top * bottom,
        highestScenicScore,
      );
    }
  }
  return highestScenicScore;
};

run({
  part1: {
    tests: [
      // {
      //   input: `30373
      //         25512
      //         65332
      //         33549
      //         35390`,
      //   expected: 21,
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
