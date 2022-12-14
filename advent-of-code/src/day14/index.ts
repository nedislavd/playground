import run from "aocrunner";

type Position = [number, number];

const calculatePaths = (
  input: string[],
  maxDepth: number = 0,
  part2: boolean = false,
) => {
  let calculatedMaxDepth = maxDepth;
  const path = input.flatMap((inp) => {
    const lines = inp.split(" -> ");
    const points: Position[] = lines.map(
      (l) => l.split(",").map(Number) as Position,
    );

    if (part2) {
      points.forEach(
        (point) =>
          (calculatedMaxDepth = Math.max(calculatedMaxDepth, point[1] + 2)),
      );
    }

    return points.reduce(
      (tally: Position[], curr: Position, idx: number): Position[] => {
        if (idx < 1) return tally;
        const prev = points[idx - 1];
        if (curr[0] === prev[0]) {
          const howMany = Math.abs(curr[1] - prev[1]) + 1;
          return [
            ...tally,
            ...(Array.from(
              { length: howMany },
              (_, i) => i + Math.min(curr[1], prev[1]),
            ).map((a) => [curr[0], a]) as Position[]),
          ];
        } else {
          const howMany = Math.abs(curr[0] - prev[0]) + 1;
          return [
            ...tally,
            ...(Array.from(
              { length: howMany },
              (_, i) => i + Math.min(curr[0], prev[0]),
            ).map((a) => [a, curr[1]]) as Position[]),
          ];
        }
      },
      [],
    );
  });
  return [path, calculatedMaxDepth];
};

const getNextPosition = (
  curr: Position,
  occupied: Set<string>,
  maxDepth: number = 0,
  part2: boolean = false,
): Position | "end" => {
  const down = [curr[0], curr[1] + 1] as Position;
  const downLeft = [curr[0] - 1, curr[1] + 1] as Position;
  const downRight = [curr[0] + 1, curr[1] + 1] as Position;
  if (!part2) {
    if (!occupied.has(down.toString())) return down;
    if (!occupied.has(downLeft.toString())) return downLeft;
    if (!occupied.has(downRight.toString())) return downRight;
  } else {
    if (!occupied.has(down.toString()) && down[1] < maxDepth) return down;
    if (!occupied.has(downLeft.toString()) && down[1] < maxDepth)
      return downLeft;
    if (!occupied.has(downRight.toString()) && down[1] < maxDepth)
      return downRight;
  }

  return "end";
};

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
    .split("\n")
    .filter((l) => l.length > 0);

  const startingPos = [500, 0] as Position;
  const maxDist = 1000;
  const [paths] = calculatePaths(input);

  const blocked = new Set(paths.map((p) => p.toString()));
  const sand = new Set();

  let falling = true;
  do {
    let sandPos = startingPos;
    let distanceFallen = 0;
    while (
      getNextPosition(sandPos, blocked) !== "end" &&
      distanceFallen < maxDist
    ) {
      sandPos = getNextPosition(sandPos, blocked) as Position;
      distanceFallen++;
    }
    blocked.add(sandPos.toString());
    sand.add(sandPos.toString());
    falling = distanceFallen !== maxDist;
  } while (falling);

  return sand.size - 1;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
    .split("\n")
    .filter((l) => l.length > 0);

  const startingPos = [500, 0] as Position;
  const [paths, maxDepth] = calculatePaths(input, -1, true);

  const blocked = new Set(paths.map((p) => p.toString()));
  const sand = new Set();

  let falling = true;
  do {
    let sandPos = startingPos;

    while (
      getNextPosition(sandPos, blocked, maxDepth, true) !== "end" &&
      sandPos[1] < maxDepth
    )
      sandPos = getNextPosition(sandPos, blocked, maxDepth, true) as Position;
    blocked.add(sandPos.toString());
    sand.add(sandPos.toString());
    falling = !(sandPos[0] === startingPos[0] && sandPos[1] === startingPos[1]);
  } while (falling);

  return sand.size;
};

const testInput = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 24,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 93,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
