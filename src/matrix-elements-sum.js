const { NotImplementedError } = require('../extensions/index.js')

/**
 * Given matrix, a rectangular matrix of integers,
 * just add up all the values that don't appear below a "0".
 *
 * @param {Array<Array>} matrix
 * @return {Number}
 *
 * @example
 * matrix = [
 *  [0, 1, 1, 2],
 *  [0, 5, 0, 0],
 *  [2, 0, 3, 3]
 * ]
 *
 * The result should be 9
 */
function getMatrixElementsSum(matrix) {
	let sum = 0
	const skip = new Array(matrix[0].length).fill(false)
	matrix.forEach((row) =>
		row.forEach((value, i) => {
			if (!skip[i]) {
				if (value === 0) {
					skip[i] = true
				} else {
					sum += value
				}
			}
		}),
	)
	return sum
}

module.exports = {
	getMatrixElementsSum,
}
