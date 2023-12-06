import run from "aocrunner";

const integersBetweenSquareRoots = (time: number, distance: number) => {
  const sqrt = Math.sqrt(time ** 2 - 4 * distance);
  return Math.ceil((time + sqrt) / 2) - Math.floor((time - sqrt) / 2) - 1;
};

const part1 = (rawInput: string) => {
  const [time, distance] = rawInput
    .split("\n")
    .map((l) => l.split(/\s+/).slice(1).map(Number));
  return time.reduce(
    (acc, time, i) => acc * integersBetweenSquareRoots(time, distance[i]),
    1,
  );
};

const part2 = (rawInput: string) => {
  const [time, distance] = rawInput
    .split("\n")
    .map((l: string) => Number(l.replaceAll(" ", "").split(":")[1]));
  return integersBetweenSquareRoots(time, distance);
};

run({
  part1: {
    tests: [
      {
        input: `Time:      7  15   30
                Distance:  9  40  200`,
        expected: 288,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Time:      71530
                Distance:  940200`,
        expected: 71503,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
