import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

/*
    [G]         [P]         [M]
    [V]     [M] [W] [S]     [Q]
    [N]     [N] [G] [H]     [T] [F]
    [J]     [W] [V] [Q] [W] [F] [P]
[C] [H]     [T] [T] [G] [B] [Z] [B]
[S] [W] [S] [L] [F] [B] [P] [C] [H]
[G] [M] [Q] [S] [Z] [T] [J] [D] [S]
[B] [T] [M] [B] [J] [C] [T] [G] [N]
 1   2   3   4   5   6   7   8   9
* */

const parse = (input: string) => {
  const init: string[] = [];
  const moves: string[] = [];

  let numbersLine: any = null;
  input.split("\n").forEach((next: string, line: number) => {
    if (numbersLine == null) {
      if (next.slice(1, 2) === "1") {
        numbersLine = line;
      } else {
        for (let j = 0; j <= next.length; j += 4) {
          const crate = next[(j, j + 1)];
          const k = j / 4;
          (init[k] = init[k] || []).unshift(crate);
        }
      }
    } else if (next && line > numbersLine + 1) {
      const parts = next.split(" ");
      moves.push([Number(parts[1]), Number(parts[3]), Number(parts[5])]);
    }
  }, []);
  return [init.map((xs: string) => xs.filter((x) => x !== " ")), moves];
};

// CrateMover 9000
export const part1 = (input: string) => {
  const parsed = parse(input);

  const [init, moves] = parsed;
  const state = init;

  for (let i = 0; i < moves.length; i++) {
    const [moveCount, from, to] = moves[i];
    for (let j = 0; j < moveCount; j++) {
      const crate = state[from - 1].pop();
      state[to - 1].push(crate);
    }
  }

  return state.reduce((acc, next) => acc + next.pop(), "");
};

// CrateMover 9001
export const part2 = (input: string) => {
  const parsed = parse(input);

  const [init, moves] = parsed;
  const state = init;

  for (let i = 0; i < moves.length; i++) {
    const [moveCount, from, to] = moves[i];
    const l = state[from - 1].length;
    const crates = state[from - 1].splice(l - moveCount, moveCount);
    state[to - 1].push(...crates);
  }

  return state.reduce((acc, next) => acc + next.pop(), "");
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
