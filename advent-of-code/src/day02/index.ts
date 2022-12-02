import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

/*
 * First Column:    Second Column Self
 * A - Rock         X
 * B - Paper        Y
 * C - Scissors     Z
 * */
const part1 = (rawInput: string) => {
  const listOfGames: string[] = parseInput(rawInput).split("\n");
  let score = 0;
  for (let i = 0; i < listOfGames.length; i++) {
    const game: string[] = listOfGames[i].split(" ");

    // handle draws
    if (game[1] === "X" && game[0] === "A") {
      score += 1 + 3;
    } else if (game[1] === "Y" && game[0] === "B") {
      score += 2 + 3;
    } else if (game[1] === "Z" && game[0] === "C") {
      score += 3 + 3;
    }

    // handle wins
    if (game[1] === "X" && game[0] === "C") {
      score += 1 + 6;
    } else if (game[1] === "Y" && game[0] === "A") {
      score += 2 + 6;
    } else if (game[1] === "Z" && game[0] === "B") {
      score += 3 + 6;
    }

    // handle losses
    if (game[1] === "X" && game[0] === "B") {
      score += 1;
    } else if (game[1] === "Y" && game[0] === "C") {
      score += 2;
    } else if (game[1] === "Z" && game[0] === "A") {
      score += 3;
    }
  }
  return score;
};

/*
 * First Column:    Second Column Self
 * A - Rock         X - Need to end in Loss
 * B - Paper        Y - Need to end in Draw
 * C - Scissors     Z - Need to end in Win
 * */
const part2 = (rawInput: string) => {
  const listOfGames: string[] = parseInput(rawInput).split("\n");
  let score = 0;
  for (let i = 0; i < listOfGames.length; i++) {
    const game: string[] = listOfGames[i].split(" ");

    // handle wins
    if (game[1] === "Z" && game[0] === "A") {
      score += 2 + 6;
    } else if (game[1] === "Z" && game[0] === "B") {
      score += 3 + 6;
    } else if (game[1] === "Z" && game[0] === "C") {
      score += 1 + 6;
    }

    // handle draws
    if (game[1] === "Y" && game[0] === "A") {
      score += 1 + 3;
    } else if (game[1] === "Y" && game[0] === "B") {
      score += 2 + 3;
    } else if (game[1] === "Y" && game[0] === "C") {
      score += 3 + 3;
    }

    // handle losses
    if (game[1] === "X" && game[0] === "A") {
      score += 3;
    } else if (game[1] === "X" && game[0] === "B") {
      score += 1;
    } else if (game[1] === "X" && game[0] === "C") {
      score += 2;
    }
  }
  return score;
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
