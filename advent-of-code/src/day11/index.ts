import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const generateMonkeys = (input: string) => {
  return input.split("\n\n").map((a) => {
    let arr: string[] = a.split("\n");
    return {
      items: [...arr[1].matchAll(/\d+/g)].map((c) => BigInt(c[0])), //worry level
      op: [...arr[2].matchAll(/(old)|\*|\+|\d+/g)].map((c) =>
        isNaN(+c[0]) ? c[0] : BigInt(c[0]),
      ), //new =
      test: BigInt(arr[3].match(/\d+/)), //divisible by x
      onTrue: +arr[4].match(/\d+/), //throw to monkey x
      onFalse: +arr[5].match(/\d+/), //^
      inspections: 0,
    };
  });
};

const calcMegaMod = (monkeys: object[]) => {
  return monkeys.reduce((v, c) => v * c.test, 1n);
};

const rounds = function (
  n: number,
  part: number,
  monkeys: object[],
  megaMod: bigint,
) {
  for (let i = 0; i < n; i++) {
    for (let monkey: object of monkeys)
      while (monkey.items[0]) {
        let item = monkey.items.shift() % megaMod;
        let op = monkey.op.map((a) => (a == "old" ? item : a));

        //inspection
        if (op[1] == "+") item = op[0] + op[2];
        else if (op[1] == "*") item = op[0] * op[2];
        monkey.inspections++;

        //boredom
        if (part == 1) item /= 3n; //used for part 1

        //test
        if (item % monkey.test == 0) monkeys[monkey.onTrue].items.push(item);
        else monkeys[monkey.onFalse].items.push(item);
      }
  }
  let monkeyActivity = monkeys.map((a) => a.inspections).sort((a, b) => b - a);
  let monkeyBusiness = monkeyActivity[0] * monkeyActivity[1];

  return monkeyBusiness;
};

const part1 = (rawInput: string) => {
  const monkeys = generateMonkeys(parseInput(rawInput));
  const megaMod = calcMegaMod(monkeys);

  return rounds(20, 1, monkeys, megaMod);
};

const part2 = (rawInput: string) => {
  const monkeys = generateMonkeys(parseInput(rawInput));
  const megaMod = calcMegaMod(monkeys);

  return rounds(10000, 2, monkeys, megaMod);
};

const testInput = `Monkey 0:
  Monkey inspects an item with a worry level of 79.
    Worry level is multiplied by 19 to 1501.
    Monkey gets bored with item. Worry level is divided by 3 to 500.
    Current worry level is not divisible by 23.
    Item with worry level 500 is thrown to monkey 3.
  Monkey inspects an item with a worry level of 98.
    Worry level is multiplied by 19 to 1862.
    Monkey gets bored with item. Worry level is divided by 3 to 620.
    Current worry level is not divisible by 23.
    Item with worry level 620 is thrown to monkey 3.
Monkey 1:
  Monkey inspects an item with a worry level of 54.
    Worry level increases by 6 to 60.
    Monkey gets bored with item. Worry level is divided by 3 to 20.
    Current worry level is not divisible by 19.
    Item with worry level 20 is thrown to monkey 0.
  Monkey inspects an item with a worry level of 65.
    Worry level increases by 6 to 71.
    Monkey gets bored with item. Worry level is divided by 3 to 23.
    Current worry level is not divisible by 19.
    Item with worry level 23 is thrown to monkey 0.
  Monkey inspects an item with a worry level of 75.
    Worry level increases by 6 to 81.
    Monkey gets bored with item. Worry level is divided by 3 to 27.
    Current worry level is not divisible by 19.
    Item with worry level 27 is thrown to monkey 0.
  Monkey inspects an item with a worry level of 74.
    Worry level increases by 6 to 80.
    Monkey gets bored with item. Worry level is divided by 3 to 26.
    Current worry level is not divisible by 19.
    Item with worry level 26 is thrown to monkey 0.
Monkey 2:
  Monkey inspects an item with a worry level of 79.
    Worry level is multiplied by itself to 6241.
    Monkey gets bored with item. Worry level is divided by 3 to 2080.
    Current worry level is divisible by 13.
    Item with worry level 2080 is thrown to monkey 1.
  Monkey inspects an item with a worry level of 60.
    Worry level is multiplied by itself to 3600.
    Monkey gets bored with item. Worry level is divided by 3 to 1200.
    Current worry level is not divisible by 13.
    Item with worry level 1200 is thrown to monkey 3.
  Monkey inspects an item with a worry level of 97.
    Worry level is multiplied by itself to 9409.
    Monkey gets bored with item. Worry level is divided by 3 to 3136.
    Current worry level is not divisible by 13.
    Item with worry level 3136 is thrown to monkey 3.
Monkey 3:
  Monkey inspects an item with a worry level of 74.
    Worry level increases by 3 to 77.
    Monkey gets bored with item. Worry level is divided by 3 to 25.
    Current worry level is not divisible by 17.
    Item with worry level 25 is thrown to monkey 1.
  Monkey inspects an item with a worry level of 500.
    Worry level increases by 3 to 503.
    Monkey gets bored with item. Worry level is divided by 3 to 167.
    Current worry level is not divisible by 17.
    Item with worry level 167 is thrown to monkey 1.
  Monkey inspects an item with a worry level of 620.
    Worry level increases by 3 to 623.
    Monkey gets bored with item. Worry level is divided by 3 to 207.
    Current worry level is not divisible by 17.
    Item with worry level 207 is thrown to monkey 1.
  Monkey inspects an item with a worry level of 1200.
    Worry level increases by 3 to 1203.
    Monkey gets bored with item. Worry level is divided by 3 to 401.
    Current worry level is not divisible by 17.
    Item with worry level 401 is thrown to monkey 1.
  Monkey inspects an item with a worry level of 3136.
    Worry level increases by 3 to 3139.
    Monkey gets bored with item. Worry level is divided by 3 to 1046.
    Current worry level is not divisible by 17.
    Item with worry level 1046 is thrown to monkey 1.`;

run({
  part1: {
    tests: [
      // {
      //   input: testInput,
      //   expected: 10605,
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: testInput,
      //   expected: 2713310158,
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
