const generateBraceletPattern = require("../lib/generate-bracelet");

describe("generateBraceletPattern", () => {
  it("should return an array with the same length as the size parameter", () => {
    const colors = ["Red", "Yellow", "Blue", "Green"];
    const size = 10;
    const result = generateBraceletPattern(colors, size);
    expect(result.length).toBe(size);
  });

  it("should return an array containing only colors from the colors parameter", () => {
    const colors = ["Red", "Yellow", "Blue", "Green"];
    const size = 10;
    const result = generateBraceletPattern(colors, size);
    result.forEach((color) => {
      expect(colors).toContain(color);
    });
  });

  it("should not contain two consecutive beads of the same color", () => {
    const colors = ["Red", "Yellow", "Blue", "Green"];
    const size = 10;
    const result = generateBraceletPattern(colors, size);
    for (let i = 0; i < result.length - 1; i++) {
      if (result[i] === result[i + 1]) {
        throw new Error("Two consecutive beads of the same color found");
      }
    }
  });

  it("should not contain any repeated patterns of three beads", () => {
    const colors = ["Red", "Yellow", "Blue", "Green", "Purple"];
    const size = 10;
    const result = generateBraceletPattern(colors, size);

    for (let i = 0; i < result.length - 2; i++) {
      // Get the starting pattern
      const currentPattern = [result[i], result[i + 1], result[i + 2]].join(
        ","
      );

      // Check if the pattern repeats
      let count = 0;
      for (let j = 0; j < result.length - 2; j++) {
        // Get the current pattern
        const testPattern = [result[j], result[j + 1], result[j + 2]].join(",");
        // If the current pattern matches the starting pattern, increment the count
        if (currentPattern === testPattern) {
          count++;
          // If the count is greater than or equal to 2, throw an error
          if (count >= 2) {
            throw new Error("Repeated 3 bead pattern found");
          }
        }
      }
    }
  });

  it("should throw an error if the colors parameter contains less than 3 colors", () => {
    const colors = ["Red", "Yellow"];
    const size = 10;
    expect(() => generateBraceletPattern(colors, size)).toThrow(
      "'colors' must contain at least three colors"
    );
  });

  it("should throw an error if the colors parameter contains duplicate colors", () => {
    const colors = ["Red", "Yellow", "Blue", "Green", "Red"];
    const size = 10;
    expect(() => generateBraceletPattern(colors, size)).toThrow(
      "'colors' must contain unique colors"
    );
  });
});
