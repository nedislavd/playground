import run from "aocrunner";
import { _chunk_ } from "../utils/index.js";

type Command = { cmd: "noop" } | { cmd: "addx"; value: number }

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((line) => {
    const [cmd, value] = line.split(" ");
    return (
      cmd === "noop" ? { cmd: cmd } : { cmd: cmd, value: Number(value) }
    ) as Command;
  });

const crtTubeGenerator = (rawInput: string) => {
  const input: object[] = parseInput(rawInput);
  let register: number = 1;
  let cycle: number = 0;
  let signalStrengthSum: number = 0;
  let screen: string[] = [];

  const nextCycle = () => {
    cycle++;
    if (cycle >= 20 && (cycle - 20) % 40 === 0) {
      signalStrengthSum += cycle * register;
    }

    const pixelPosInLine = (cycle - 1) % 40;
    screen.push(
      pixelPosInLine >= register - 1 && pixelPosInLine <= register + 1
        ? "#"
        : " ",
    );
  };

  for (const item of input) {
    if (item.cmd === "noop") {
      nextCycle();
    } else {
      nextCycle();
      nextCycle();
      register += item.value;
    }
  }

  return { signalStrenght: signalStrengthSum, renderedScreen: screen };
};

const part1 = (rawInput: string) => {
  return crtTubeGenerator(rawInput).signalStrenght;
};

const part2 = (rawInput: string) => {
  return _chunk_(40, crtTubeGenerator(rawInput).renderedScreen)
    .map((line) => line.join(""))
    .join("\n");
};

const testInput = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`;

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 13140,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected:
          `##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....`.replace(/\./g, " "),
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
