import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const sizeFinder = (input: string) => {
  const lines: string[] = parseInput(input).trim().split("\n");
  let sizes: any = { "/": 0 };
  let paths = ["/"];

  for (let i = 1; i < lines.length; i++) {
    const [, cmd, dir] = lines[i].split(" ");
    if (cmd === "ls") {
      for (i++; i < lines.length; i++) {
        const parts: string[] = lines[i].split(" ");
        if (parts[0] === "$") {
          i--;
          break;
        }
        if (parts[0] !== "dir") {
          for (const path of paths) {
            sizes[path] = (sizes[path] ?? 0) + +parts[0];
          }
        }
      }
    } else {
      if (dir === "..") {
        paths.pop();
      } else {
        paths.push(`${paths.at(-1)}${dir}/`);
      }
    }
  }

  return sizes;
};

const part1 = (rawInput: string) => {
  return Object.values(sizeFinder(rawInput))
    .filter((size) => size <= 100000)
    .reduce((acc, size) => acc + size);
};

const part2 = (rawInput: string) => {
  const sizes = sizeFinder(rawInput);
  return Math.min(
    ...Object.values(sizes).filter((size) => size >= sizes["/"] - 40000000),
  );
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
