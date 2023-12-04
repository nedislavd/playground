import run from "aocrunner";

// const parseInput = (rawInput: string) => rawInput;

const parseInput = (rawInput: string) => rawInput.split("\n");

const isAdjacent = (a: Match, b: Match): boolean => {
  return (
    a.line - 1 <= b.line &&
    a.line + 1 >= b.line &&
    a.start <= b.end &&
    a.end >= b.start
  );
};

type Match = { text: string; start: number; end: number; line: number };

const findAll = (lines: string[], regex: RegExp): Match[] => {
  return lines.flatMap((line, lineIndex) =>
    Array.from(line.matchAll(regex), (match) => {
      const text = match[0];
      const start = match.index ?? 0;
      return { text, start, end: start + text.length, line: lineIndex };
    }),
  );
};

const sumParts = (input: string[]) => {
  const numbers = findAll(input, /\d+/g);
  const symbols = findAll(input, /[^.\d]/g);
  return numbers
    .filter((n) => symbols.some((s) => isAdjacent(n, s)))
    .map((n) => Number(n.text))
    .reduce((a, b) => a + b, 0);
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return sumParts(input);
};

/*
  Part 1 initial try, wrong test case results but correct input results
const getAdjacentPositions = (y: number, x: number): [number, number][] => {
  return [
    [y - 1, x - 1],
    [y - 1, x],
    [y - 1, x + 1],
    [y, x - 1],
    [y, x + 1],
    [y + 1, x - 1],
    [y + 1, x],
    [y + 1, x + 1],
  ];
};

const isNumberOrDot = (char: string): boolean => {
  return (char >= "0" && char <= "9") || char === ".";
};

const part1 = (rawInput: string) => {
  const lines = parseInput(rawInput).split("\n");
  let validSequences = [];

  for (let y = 0; y < lines.length; y++) {
    const line = lines[y];
    let sequence = "";
    let invalidSequence = false;
    let lineSum = 0;

    for (let x = 0; x < line.length; x++) {
      const char = line[x];

      if (char >= "0" && char <= "9") {
        if (
          !getAdjacentPositions(y, x)
            .map(([ay, ax]) => lines[ay]?.[ax])
            .every((a) => a === undefined || isNumberOrDot(a))
        ) {
          invalidSequence = true;
        }
        sequence += char;
      } else {
        if (invalidSequence && sequence.length > 0) {
          const seqValue = parseInt(sequence);
          console.log(
            `Adding sequence '${sequence}' at (${y}, ${x - sequence.length})`,
          );
          validSequences.push(seqValue);
          lineSum += seqValue;
        }
        sequence = "";
        invalidSequence = false;
      }
    }

    if (invalidSequence && sequence.length > 0) {
      const seqValue = parseInt(sequence);
      console.log(
        `Adding sequence '${sequence}' at (${y}, ${
          line.length - sequence.length
        })`,
      );
      validSequences.push(seqValue);
      lineSum += seqValue;
    }

    console.log(`Line ${y} sum: ${lineSum}`);
  }

  const totalSum = validSequences.reduce((a, b) => a + b, 0);
  console.log(`Total sum: ${totalSum}`);
  return totalSum;
};*/

const sumGearRatios = (input: string[]) => {
  const numbers = findAll(input, /\d+/g);
  const gears = findAll(input, /\*/g);
  return gears
    .map((g) => {
      const adjacentParts = numbers.filter((n) => isAdjacent(g, n));
      return adjacentParts.length === 2
        ? adjacentParts.map((p) => Number(p.text)).reduce((a, b) => a * b, 1)
        : 0;
    })
    .reduce((a, b) => a + b, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return sumGearRatios(input);
};

run({
  part1: {
    tests: [
      {
        input: `467..114..
                ...*......
                ..35..633.
                ......#...
                617*......
                .....+.58.
                ..592.....
                ......755.
                ...$.*....
                .664.598..`,
        // expected: 4361,
        expected: 4475,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `467..114..
                ...*......
                ..35..633.
                ......#...
                617*......
                .....+.58.
                ..592.....
                ......755.
                ...$.*....
                .664.598..`,
        // expected: 467835,
        expected: 451490,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
