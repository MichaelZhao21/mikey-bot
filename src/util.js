/**
 * Generate a random number in the range [min, max)
 * 
 * @param {number} min Minimum value (inclusive)
 * @param {number} max Maximum value (exclusive)
 * @returns {number} The randomly generated value
 */
function randInt(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

module.exports = { randInt };