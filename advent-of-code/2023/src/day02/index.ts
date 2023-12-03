import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const totalCubes = {
  red: 12,
  green: 13,
  blue: 14,
}

const roundValidator = (round: string) => {
  const cubes = round.split(',');
  let cubesCount = {
    red: 0,
    green: 0,
    blue: 0,
  }
  cubes.map((cube: string) => {
      cubesCount[cube.trim().split(' ')[1]] += parseInt(cube.trim().split(' ')[0]);
  })
  let validRound = true ;
  Object.keys(cubesCount).map((color: string) => {
    if (cubesCount[color] > totalCubes[color]) {
        validRound = false;
    }
  })

  return validRound;
}

const gameArbiter = (sets: string) => {
  const rounds = sets.split(';');
    let validGame = true;
    rounds.map((round: string) => {
        if (roundValidator(round) === false) validGame = false;
    })
  return validGame;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let gameIDsums: number = 0;
  input.trim().split("\n").map((line: string) => {
    const gameID = parseInt(line.split(':')[0].split('Game ')[1]);
    const validGame = gameArbiter(line.split(':')[1]);
    if (validGame) gameIDsums += gameID;
  })
  return gameIDsums;
};

const gameMinCubes = function (sets: string) {
    const rounds = sets.split(';');
    let minValidCubes = {
        red: 0,
        green: 0,
        blue: 0,
    }
    rounds.map((round: string) => {
      const cubes = round.split(',');

      let roundCubes = {
        red: 0,
        green: 0,
        blue: 0,
      }
      cubes.map((cube: string) => {
        roundCubes[cube.trim().split(' ')[1]] = parseInt(cube.trim().split(' ')[0]);
      })

      Object.keys(roundCubes).map((color: string) => {
        if (roundCubes[color] > minValidCubes[color]) {
          minValidCubes[color] = roundCubes[color];
        }
      })

    })

    return parseInt(minValidCubes['red'] * minValidCubes['green'] * minValidCubes['blue']);
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let gamePowerSums: number = 0;
  input.trim().split("\n").map((line: string) => {
    gamePowerSums += gameMinCubes(line.split(':')[1]);
  })
  return gamePowerSums;
};

run({
  part1: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
                Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
                Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
                Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
                Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
                Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
                Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
                Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
                Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 2286,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
