import RandomNumberGenerator from "./nextNum";

const nums: number[] = [-1, 0, 1, 2, 3];
const probs: number[] = [0.01, 0.3, 0.58, 0.1, 0.01];
const rng = new RandomNumberGenerator(nums, probs);

const result = new Map<number, number>();
for (let i = 0; i < 100; i++) {
  const num = rng.nextNum();
  result.set(num, (result.get(num) || 0) + 1);
}

console.log([...result.entries()]);

const notNumbers = [...nums];
