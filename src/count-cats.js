const { NotImplementedError } = require('../extensions/index.js')

/**
 * Given matrix where you have to find cats by ears "^^"
 *
 * @param {Array<Array>} matrix
 * @return {Number} count of cats found
 *
 * @example
 * countCats([
 *  [0, 1, '^^'],
 *  [0, '^^', 2],
 *  ['^^', 1, 2]
 * ]) => 3`
 *
 */
function countCats(matrix) {
	function isCat(value) {
		return value === '^^'
	}

	return matrix.reduce(
		(catsInMatrix, row) =>
			catsInMatrix +
			row.reduce((catsInRow, value) => catsInRow + Number(isCat(value)), 0),
		0,
	)
}

module.exports = {
	countCats,
}
