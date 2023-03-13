import { describe, expect, it } from "@jest/globals";
import RandomNumberGenerator from "./nextNum";

describe("RandomNumberGenerator", () => {
  describe("constructor", () => {
    it("should throw an error if nums and probs have different lengths", () => {
      expect(() => new RandomNumberGenerator([1, 2, 3], [0.2, 0.8])).toThrow(
        "nums and probs must have the same length"
      );
    });

    it("should throw an error if probabilities do not sum to approximately 1", () => {
      expect(
        () => new RandomNumberGenerator([1, 2, 3], [0.2, 0.3, 0.4])
      ).toThrow("Probabilities must sum to approximately 1");
    });

    it("should create a new instance with the correct nums and probs", () => {
      const nums = [1, 2, 3];
      const probs = [0.2, 0.3, 0.5];
      const rng = new RandomNumberGenerator(nums, probs);
      expect(rng).toBeInstanceOf(RandomNumberGenerator);
      expect(rng["nums"]).toEqual(nums);
      expect(rng["probs"]).toEqual(probs);
    });
  });

  describe("nextNum", () => {
    it("should generate random numbers based on the probability distribution", () => {
      const nums = [1, 2, 3, 4, 5];
      const probs = [0.1, 0.2, 0.3, 0.2, 0.2];
      const rng = new RandomNumberGenerator(nums, probs);
      const numCounts: any = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      const numIterations = 100000;

      for (let i = 0; i < numIterations; i++) {
        const num = rng.nextNum();
        numCounts[num]++;
      }

      const expectedCounts: any = {
        1: numIterations * probs[0],
        2: numIterations * probs[1],
        3: numIterations * probs[2],
        4: numIterations * probs[3],
        5: numIterations * probs[4],
      };

      for (const num of nums) {
        const expectedCount = expectedCounts[num];
        const actualCount = numCounts[num];
        const tolerance = numIterations * 0.01; // Allow 1% tolerance
        expect(actualCount).toBeGreaterThan(expectedCount - tolerance);
        expect(actualCount).toBeLessThan(expectedCount + tolerance);
      }
    });
  });
});
