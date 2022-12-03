import run from "aocrunner";

const chunkArray = (arr: string[], n: number) => {
  const chunkLength: number = Math.max(arr.length / n, 1);
  let chunks: string[] = [];
  for (let i = 0; i < n; i++) {
    if (chunkLength * (i + 1) <= arr.length)
      chunks.push(arr.slice(chunkLength * i, chunkLength * (i + 1)));
  }
  return chunks;
};

const alphaVal = (s: string) => s.toString().charCodeAt(0) - 97 + 1;

const calculatePriority = (letter: string) => {
  if (letter.toString().toUpperCase() === letter) {
    return alphaVal(letter.toLowerCase()) + 26;
  } else {
    return alphaVal(letter);
  }
};

const part1 = (rawInput: string) => {
  const rucksacks: string[] = rawInput.split("\n");
  let rucksackDuplicates: string[] = [];
  let sumPerRucksack: number = 0;

  for (let i = 0; i < rucksacks.length; i++) {
    const firstCompartment: string[] = chunkArray(rucksacks[i], 2)[0].split("");
    const secondCompartment: string[] = chunkArray(rucksacks[i], 2)[1].split(
      "",
    );
    const duplicates: string[] = firstCompartment.filter((fcValue) =>
      secondCompartment.some((scValue) => scValue === fcValue),
    );
    rucksackDuplicates.push([...new Set(duplicates)]);
  }

  rucksackDuplicates.forEach((duplicateLetter) => {
    sumPerRucksack += calculatePriority(duplicateLetter[0]);
  });

  return sumPerRucksack;
};

const part2 = (rawInput: string) => {
  let rucksacks: string[] = rawInput.split("\n");
  const elfGroupSize: number = 3;
  let elfGroups: string[][] = [];
  let groupDuplicates: string[] = [];
  let sumPerGroup: number = 0;

  // split rucksacks into groups of 3
  for (let i = 0; i < rucksacks.length; i += elfGroupSize) {
    elfGroups.push(rucksacks.slice(i, i + elfGroupSize));
  }
  // for each group, find the duplicate badges
  for (let i = 0; i < elfGroups.length; i++) {
    const duplicates: string[] = elfGroups[i][0]
      .split("")
      .filter(
        (badge) =>
          elfGroups[i][1].split("").includes(badge) &&
          elfGroups[i][2].split("").includes(badge),
      );
    groupDuplicates.push([...new Set(duplicates)]);
  }

  groupDuplicates.forEach((duplicateLetter) => {
    sumPerGroup += calculatePriority(duplicateLetter[0]);
  });

  return sumPerGroup;
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
