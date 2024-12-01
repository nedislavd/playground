import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).trim().split("\n");

  let totalDistanceSum: number = 0;
  const leftSide: number[] = []
  const rightSide: number[] = []
  input.forEach((line) => {
    leftSide.push(parseInt(line.split('   ')[0]))
    rightSide.push(parseInt(line.split('   ')[1]))
  })
  leftSide.sort((a, b) => a - b)
  rightSide.sort((a, b) => a - b)

  leftSide.forEach((row, index) => {
    if (row < rightSide[index])  {
      totalDistanceSum += (rightSide[index] - row)
    } else if(row > rightSide[index]) {

      totalDistanceSum +=  (row - rightSide[index])
    }
  })

  return totalDistanceSum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).trim().split("\n");
  let similarityScore: number = 0;
  const leftSide: number[] = []
  const rightSide: number[] = []
  input.forEach((line) => {
    leftSide.push(parseInt(line.split('   ')[0]))
    rightSide.push(parseInt(line.split('   ')[1]))
  })

  leftSide.forEach((item) => {
    const count = rightSide.reduce((acc, cur) => cur === item ? ++acc : acc, 0);
    similarityScore += item*count
  })

  return similarityScore
};

run({
  part1: {
    tests: [
      // {
      //   input: `3   4
      //           4   3
      //           2   5
      //           1   3
      //           3   9
      //           3   3`,
      //   expected: 11,
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: `3   4
      //           4   3
      //           2   5
      //           1   3
      //           3   9
      //           3   3`,
      //   expected: 31,
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
