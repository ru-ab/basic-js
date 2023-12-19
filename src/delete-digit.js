const { NotImplementedError } = require('../extensions/index.js')

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
function deleteDigit(n) {
	const digits = String(n).split('')
	const numbers = []

	for (let i = 0; i < digits.length; i += 1) {
		numbers.push(Number(digits.filter((_, j) => i !== j).join('')))
	}

	return Math.max(...numbers)
}

module.exports = {
	deleteDigit,
}
