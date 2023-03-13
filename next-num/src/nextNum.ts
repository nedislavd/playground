/**
 * A class for generating random numbers based on a given probability distribution.
 */
export default class RandomNumberGenerator {
  private nums: number[];
  private probs: number[];

  /**
   * Creates a new RandomNumberGenerator instance.
   * @param nums An array of numbers to be randomly selected.
   * @param probs An array of probabilities associated with each number.
   *              The probabilities must sum to approximately 1.
   * @throws An error if nums or probs are null or have different lengths, or if
   *         the probabilities do not sum to approximately 1.
   */
  constructor(nums: number[], probs: number[]) {
    // Check inputs are not null
    if (!nums || !probs) {
      throw new Error("nums and probs must be non-null arrays");
    }

    // Check lengths of inputs are the same
    if (nums.length !== probs.length) {
      throw new Error("nums and probs must have the same length");
    }

    // Check probabilities sum to approximately 1
    const sumProbs = probs.reduce((a, b) => a + b, 0);
    if (Math.abs(sumProbs - 1) > 1e-6) {
      throw new Error("Probabilities must sum to approximately 1");
    }

    this.nums = nums;
    this.probs = probs;
  }

  /**
   * Generates a random number between 0 and 1.
   * @returns A random number between 0 and 1.
   */
  private generateRandomNumber(): number {
    return Math.random();
  }

  /**
   * Returns the next random number based on the probability distribution.
   * @returns A random number based on the probability distribution.
   * @throws An error if there is an error in the probability distribution.
   */
  public nextNum(): number {
    let cumulativeProb = 0;
    const rand = this.generateRandomNumber();

    for (let i = 0; i < this.probs.length; i++) {
      cumulativeProb += this.probs[i];
      if (rand < cumulativeProb) {
        return this.nums[i];
      }
    }

    // In case there is an error in the probability distribution
    throw new Error("Invalid probability distribution");
  }
}
