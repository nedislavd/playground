import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

function findFirstLastDigits(s: any): number | null {
  // Ensure s is a string
  const str = String(s);

  // Find all digits in the string
  const digits = str.match(/\d/g);

  // If there's at least one digit
  if (digits) {
    // Convert the first and last digits (or first digit twice) to numbers and concatenate them
    const firstDigit = parseInt(digits[0], 10);
    const lastDigit = digits.length > 1 ? parseInt(digits[digits.length - 1], 10) : firstDigit;
    return parseInt(`${firstDigit}${lastDigit}`, 10);
  } else {
    // Return null or 0 if no digits are found (based on requirement)
    return null;
  }
}


const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let digitsSum: number = 0  ;
  input.trim().split("\n").map((line: string) => {
    digitsSum += findFirstLastDigits(line);
  })

  return digitsSum;
};

function replaceNumber(string: string): number {
  const digits = string
      .replace(/one/g, 'one1one')
      .replace(/two/g, 'two2two')
      .replace(/three/g, 'three3three')
      .replace(/four/g, 'four4four')
      .replace(/five/g, 'five5five')
      .replace(/six/g, 'six6six')
      .replace(/seven/g, 'seven7seven')
      .replace(/eight/g, 'eight8eight')
      .replace(/nine/g, 'nine9nine')
      .replace(/\D/g, '')
  return Number(digits[0] + digits.slice(-1))
}

const part2 = (rawInput: string) => {
  const input = rawInput.trim().split("\n");
  let digitsSum: number = 0;
  input.forEach((line :string) => {
    digitsSum += findFirstLastDigits(replaceNumber(line));
  });

  return digitsSum;
};

run({
  part1: {
    tests: [
      {
        input: `1abc2
                pqr3stu8vwx
                a1b2c3d4e5f
                treb7uchet`,
        expected: 142,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `two1nine
                eightwothree
                abcone2threexyz
                xtwone3four
                4nineeightseven2
                zoneight234
                7pqrstsixteen`,
        expected: 281,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
