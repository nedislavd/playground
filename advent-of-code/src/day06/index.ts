import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const allUnique = (arr: string[]) => arr.length === new Set(arr).size;

const signalLocator = (signal: string[], markerLength: number) => {
  let firstMarker: number = 0;
  for (let i = 0; i < signal.length; i++) {
    let msgToCheck: string[] = [];
    for (let j = 0; j < markerLength; j++) {
      msgToCheck.push(signal[i + j]);
    }
    if (allUnique(msgToCheck)) {
      console.log("Marker found, starting at", i + markerLength);
      firstMarker = i + markerLength;
      break;
    }
  }
  return firstMarker;
};

const part1 = (rawInput: string) => {
  const input: string[] = parseInput(rawInput).split("");
  return signalLocator(input, 4);
};

const part2 = (rawInput: string) => {
  const input: string[] = parseInput(rawInput).split("");
  return signalLocator(input, 14);
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
