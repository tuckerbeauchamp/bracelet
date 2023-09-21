/***
 * Returns an array of colors indicating the final order of beads that should be used to construct a bracelet.
 * @param {string[]} colors An array of `unique` Strings where each string represents a bead color.
 * @param {number} size  The length of the bracelet to be constructed.
 * @return {string[]}  An array of colors indicating the final order of beads that should be used to construct a bracelet.
 */

module.exports = function generateBraceletPattern(colors, size) {
  // If there aren't at least 3 colors in the array, throw an error
  // If we don't have at least 3 colors, we can't guarantee that the pattern won't repeat
  if (colors.length < 3) {
    throw new Error("'colors' must contain at least three colors");
  }

  // There is also a situation where if the size of the bracelet is to big, we can't guarantee that the pattern won't repeat after a certain point
  // I looked into finding a way to calculate this, but it seems like the it would be a very complex problem to solve, most likely outside the scope of this task

  // array to store pattern
  const bracelet = [];
  // set to store used patterns
  const usedPatterns = new Set();
  // variable to store the previous color
  let previousColor = null;

  while (bracelet.length < size) {
    // get the colors that are not the same as the previous color
    const eligibleColors = colors.filter((color) => color !== previousColor);

    // choose a color from the eligible colors
    let color =
      eligibleColors[Math.floor(Math.random() * eligibleColors.length)];

    // create a pattern of the last two colors and the current color
    const pattern = bracelet.slice(-2).join("") + color;

    // check if the pattern is already used
    if (usedPatterns.has(pattern)) {
      // if it is, choose a different color
      continue;
    }

    // add the color to the bracelet
    bracelet.push(color);

    if (bracelet.length > 2) {
      // Store the pattern in the set
      usedPatterns.add(bracelet.slice(-3).join(""));
    }
    // Store the current color as the previous color for the next iteration
    previousColor = color;
  }

  return bracelet;
};
