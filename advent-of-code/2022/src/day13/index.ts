import run from "aocrunner";
import { padArrToLength, sum } from "../utils/index.js";

const parseInput = (rawInput: string) => rawInput;

type Value = number | any[];
type Result = "continue" | "positive" | "negative";

// good ole recursion to the rescue
const orderValidator = (left: Value, right: Value): Result => {
  // handle number case
  if (typeof left === "number" && typeof right === "number") {
    if (left > right) return "negative";
    if (left < right) return "positive";
    return "continue";
  } else if (typeof left !== "number" && typeof right !== "number") {
    const maxLength = Math.max(left.length, right.length);
    const leftArr = padArrToLength(left, maxLength);
    const rightArr = padArrToLength(right, maxLength);
    const answer = leftArr.map(
      (val: Value, i: number): Result => orderValidator(val, rightArr[i]),
    );
    const firstNegative = answer.findIndex((a) => a === "negative");
    const firstPositive = answer.findIndex((a) => a === "positive");

    if (firstNegative != -1 && firstPositive != -1) {
      if (firstNegative < firstPositive) return "negative";
      else return "positive";
    }
    if (firstNegative != -1) return "negative";
    if (firstPositive != -1) return "positive";
    return "continue";
  } else {
    if (typeof left === "number") {
      if (left === -1) return "positive";
      return orderValidator([left], right);
    } else {
      if (right === -1) return "negative";
      return orderValidator(left, [right]);
    }
  }
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
    .split("\n\n")
    .map((a) => a.trim());

  // JSON Parse "cheating"
  const signalPackets = input.map((line) =>
    line.split("\n").map((pack) => JSON.parse(pack)),
  );
  const signalOrderStatus = signalPackets.map((packet) =>
    orderValidator(packet[0], packet[1]),
  );

  return signalOrderStatus
    .map((status, index) => (status === "positive" ? index + 1 : 0))
    .reduce(sum);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
    .split("\n\n")
    .map((a) => a.trim());
  const firstDivider = [[2]];
  const secondDivider = [[6]];

  const signalPackets = input
    .map((line) => line.split("\n").map((pack) => JSON.parse(pack)))
    .flat()
    .concat([firstDivider, secondDivider]);

  const signalOrderStatus = signalPackets.sort((a: Value, b: Value): number =>
    orderValidator(a, b) === "positive" ? -1 : 1,
  );

  const firstDividerPosition =
    signalOrderStatus.findIndex(
      (packet) => JSON.stringify(packet) === JSON.stringify(firstDivider),
    ) + 1; // cuz arrays are 0 indexed
  const secondDividerPosition =
    signalOrderStatus.findIndex(
      (packet) => JSON.stringify(packet) === JSON.stringify(secondDivider),
    ) + 1;

  return firstDividerPosition * secondDividerPosition;
};

const testInput = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 140,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
