import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

function safetyInspector(row: number[]): boolean {
  const rowConditions = [row, [...row].reverse()];
  return rowConditions.some((rowVariant) =>
      rowVariant.every((_, i, arr) => {
        if (i < arr.length - 1) {
          const a = arr[i];
          const b = arr[i + 1];
          return b >= a + 1 && b <= a + 3;
        }
        return true;
      })
  );
}

function safetyInspectorInBulgaria(row: number[]): boolean {
  return row.some((_, i) => {
    const modifiedRow = [...row];
    modifiedRow.splice(i, 1); // Remove one element at index `i`
    return safetyInspector(modifiedRow);
  });
}


const part1 = (rawInput: string) => {
  const rows = parseInput(rawInput)
      .trim()
      .split("\n")
      .filter(Boolean)
      .map(line => line.split(/\s+/)
      .map(Number));

  return rows.filter(safetyInspector).length
};

const part2 = (rawInput: string) => {
  const rows = parseInput(rawInput)
      .trim()
      .split("\n")
      .filter(Boolean)
      .map(line => line.split(/\s+/)
          .map(Number));

  return rows.filter(safetyInspectorInBulgaria).length
};

run({
  part1: {
    tests: [
      {
        input: `7 6 4 2 1
                1 2 7 8 9
                9 7 6 2 1
                1 3 2 4 5
                8 6 4 4 1
                1 3 6 7 9`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `7 6 4 2 1
                1 2 7 8 9
                9 7 6 2 1
                1 3 2 4 5
                8 6 4 4 1
                1 3 6 7 9`,
        expected: 3,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
