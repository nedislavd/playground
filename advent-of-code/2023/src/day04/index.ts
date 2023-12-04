import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

// points double after the first one
const pointsCalculator = (matchCount: string): number => {
  const matches = parseInt(matchCount);

  if (matches === 0) return 0;

  let points = 1;
  for (let i = 1; i < matches; i++) {
    points *= 2;
  }

  return points;
};

const scratchCardCounter = (card: string): number => {
  const winningNumbers = [
    ...new Set(
      card
        .split(" | ")[0]
        .split(" ")
        .filter((element) => element !== ""),
    ),
  ];
  const scratchNumbers = [
    ...new Set(
      card
        .split(" | ")[1]
        .split(" ")
        .filter((element) => element !== ""),
    ),
  ];

  let winNumberCounter: number = 0;
  scratchNumbers.map((number: string) => {
    if (winningNumbers.includes(number)) winNumberCounter++;
  });

  return winNumberCounter;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let totalPoints: number = 0;
  input
    .trim()
    .split("\n")
    .map((card: string) => {
      const gameID = parseInt(card.split(":")[0].split("Card ")[1]);
      const winningPoints = pointsCalculator(
        scratchCardCounter(card.split(":")[1]),
      );
      totalPoints += winningPoints;
    });
  return totalPoints;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).trim().split("\n");
  let winningCardsArray = new Array(input.length).fill(0);

  input.map((card: string, index: number) => {
    const gameID = parseInt(card.split(":")[0].split("Card ")[1]);
    // bump current card counter
    winningCardsArray[gameID - 1] += 1;
    const winNumberCounter: number = scratchCardCounter(card.split(":")[1]);
    for (let i = 1; i <= winNumberCounter; i++) {
      winningCardsArray[index + i] += 1 * winningCardsArray[gameID - 1];
    }
  });

  const winningCardsCount = winningCardsArray.reduce(
    (accumulator, currentValue) => {
      return accumulator + currentValue;
    },
    0,
  );
  return winningCardsCount;
};

run({
  part1: {
    tests: [
      {
        input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
                Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
                Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
                Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
                Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
                Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
                Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
                Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
                Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
                Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
                Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        expected: 30,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
