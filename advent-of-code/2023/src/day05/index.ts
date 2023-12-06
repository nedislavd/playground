import run from "aocrunner";

const parseInput = (rawInput: string) => {
  rawInput;
};

const part1Solution = (input: string) => {
  class GardenMap {
    destination: number;
    source: number;
    range: number;

    constructor(mapStr: string) {
      const [destination, source, range] = mapStr
        .split(" ")
        .filter((str) => str !== "")
        .map(Number);

      this.destination = destination;
      this.source = source;
      this.range = range;
    }

    public isInRange(input: number) {
      return input >= this.source && input < this.source + this.range;
    }

    public output(input: number) {
      return input + this.destination - this.source;
    }
  }

  const parseSeeds = (line: string) => {
    return line
      .split(":")[1]
      .split(" ")
      .filter((number) => number !== "")
      .map(Number);
  };

  const parseGardenMapGroups = (lines: string[]) => {
    const gardenMapGroups: GardenMap[][] = [];
    lines.forEach((line) => {
      if (line === "") {
        gardenMapGroups.push([]);
        return;
      }
      if (line.endsWith(":")) return;
      gardenMapGroups[gardenMapGroups.length - 1].push(new GardenMap(line));
    });
    return gardenMapGroups;
  };

  const calculateOutput = (input: number, gardenMapGroup: GardenMap[]) => {
    let output = input;
    for (const gardenMap of gardenMapGroup) {
      if (gardenMap.isInRange(output)) {
        output = gardenMap.output(output);
        if (input !== output) break;
      }
    }
    return output;
  };

  const calculateSeedLocation = (
    input: number,
    gardenMapGroups: GardenMap[][],
  ) => {
    let output = input;
    for (const gardenMapGroup of gardenMapGroups) {
      output = calculateOutput(output, gardenMapGroup);
    }
    return output;
  };

  const lines = input.split("\n").map((line) => line.trim());
  const seeds = parseSeeds(lines[0]);
  const gardenMapGroups = parseGardenMapGroups(lines.slice(1));
  const locations = seeds.map((seed) =>
    calculateSeedLocation(seed, gardenMapGroups),
  );

  return locations.reduce((acc, location) => Math.min(acc, location), Infinity);
};

const part1 = (rawInput: string) => {
  return part1Solution(rawInput);
};

const part2Solution = (input: string) => {
  class Range {
    constructor(
      public readonly start: number,
      public readonly end: number,
      public isTransformed = false,
    ) {}

    get length() {
      return this.end - this.start;
    }

    public getIntersection(range: Range): Range | null {
      if (this.end <= range.start || this.start >= range.end) return null;
      return new Range(
        Math.max(this.start, range.start),
        Math.min(this.end, range.end),
      );
    }

    public subtractIntersection(intersection: Range): Range[] {
      const result: Range[] = [];
      if (this.start < intersection.start) {
        result.push(new Range(this.start, intersection.start));
      }
      if (this.end > intersection.end) {
        result.push(new Range(intersection.end, this.end));
      }
      return result;
    }
  }

  class GardenMap {
    public destination: Range;
    public source: Range;

    constructor(mapStr: string) {
      const [destinationStart, sourceStart, length] = mapStr
        .split(" ")
        .filter((str) => str !== "")
        .map(Number);

      this.destination = new Range(destinationStart, destinationStart + length);
      this.source = new Range(sourceStart, sourceStart + length);
    }

    get offset() {
      return this.destination.start - this.source.start;
    }

    public transformRange(inputRange: Range): Range[] {
      if (inputRange.isTransformed) return [inputRange];

      const intersection = this.source.getIntersection(inputRange);

      if (!intersection) return [inputRange];

      const transformed = new Range(
        intersection.start + this.offset,
        intersection.end + this.offset,
        true,
      );

      return [transformed, ...inputRange.subtractIntersection(intersection)];
    }
  }

  const parseSeedRanges = (line: string): Range[] => {
    const numbers = line
      .split(":")[1]
      .split(" ")
      .filter((number) => number !== "")
      .map(Number);

    const ranges: Range[] = [];
    for (let i = 0; i < numbers.length; i += 2) {
      ranges.push(new Range(numbers[i], numbers[i] + numbers[i + 1]));
    }

    return ranges;
  };

  const parseGardenMapGroups = (lines: string[]): GardenMap[][] => {
    const gardenMapGroups: GardenMap[][] = [];
    lines.forEach((line) => {
      if (line === "") {
        gardenMapGroups.push([]);
        return;
      }
      if (line.endsWith(":")) return;
      gardenMapGroups[gardenMapGroups.length - 1].push(new GardenMap(line));
    });
    return gardenMapGroups;
  };

  const resetTransformed = (ranges: Range[]): void => {
    for (const range of ranges) {
      range.isTransformed = false;
    }
  };

  const calculateGardenMapGroupTransform = (
    ranges: Range[],
    gardenMapGroup: GardenMap[],
  ): Range[] => {
    for (const gardenMap of gardenMapGroup) {
      ranges = ranges.flatMap((range) => gardenMap.transformRange(range));
    }
    return ranges;
  };

  const calculateSeedLocation = (
    ranges: Range[],
    gardenMapGroups: GardenMap[][],
  ): Range[] => {
    for (const gardenMapGroup of gardenMapGroups) {
      resetTransformed(ranges);
      ranges = calculateGardenMapGroupTransform(ranges, gardenMapGroup);
    }
    return ranges;
  };

  const getMin = (ranges: Range[]): number => {
    let min = Infinity;
    for (const range of ranges) {
      min = Math.min(min, range.start);
    }
    return min;
  };

  const lines = input.split("\n").map((line) => line.trim());
  const seedRanges = parseSeedRanges(lines[0]);
  const gardenMapGroups = parseGardenMapGroups(lines.slice(1));

  return getMin(calculateSeedLocation(seedRanges, gardenMapGroups));
};

const part2 = (rawInput: string) => {
  return part2Solution(rawInput);
};

run({
  part1: {
    tests: [
      {
        input: `seeds: 79 14 55 13

                seed-to-soil map:
                50 98 2
                52 50 48
                
                soil-to-fertilizer map:
                0 15 37
                37 52 2
                39 0 15
                
                fertilizer-to-water map:
                49 53 8
                0 11 42
                42 0 7
                57 7 4
                
                water-to-light map:
                88 18 7
                18 25 70
                
                light-to-temperature map:
                45 77 23
                81 45 19
                68 64 13
                
                temperature-to-humidity map:
                0 69 1
                1 0 69
                
                humidity-to-location map:
                60 56 37
                56 93 4`,
        expected: 35,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `seeds: 79 14 55 13

                seed-to-soil map:
                50 98 2
                52 50 48
                
                soil-to-fertilizer map:
                0 15 37
                37 52 2
                39 0 15
                
                fertilizer-to-water map:
                49 53 8
                0 11 42
                42 0 7
                57 7 4
                
                water-to-light map:
                88 18 7
                18 25 70
                
                light-to-temperature map:
                45 77 23
                81 45 19
                68 64 13
                
                temperature-to-humidity map:
                0 69 1
                1 0 69
                
                humidity-to-location map:
                60 56 37
                56 93 4`,
        expected: 46,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
