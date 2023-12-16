const { NotImplementedError } = require('../extensions/index.js')

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
	if (!Array.isArray(arr)) {
		throw new Error("'arr' parameter must be an instance of the Array!")
	}

	const operations = []

	for (let i = 0; i < arr.length; i += 1) {
		if (!isControlValue(arr[i])) {
			if (operations.length === i) {
				operations.push(1)
			}
			continue
		}

		operations.push(0)

		switch (arr[i]) {
			case '--discard-next':
				if (i + 1 < arr.length && !isControlValue(arr[i + 1])) {
					operations.push(0)
				}
				continue

			case '--discard-prev':
				if (i - 1 >= 0 && !isControlValue(arr[i - 1])) {
					operations[i - 1] -= 1
				}
				continue

			case '--double-next':
				if (i + 1 < arr.length && !isControlValue(arr[i + 1])) {
					operations.push(2)
				}
				continue

			case '--double-prev':
				if (
					i - 1 >= 0 &&
					!isControlValue(arr[i - 1]) &&
					operations[i - 1] > 0
				) {
					operations[i - 1] += 1
				}
				continue

			default:
				continue
		}
	}

	const result = []
	for (let i = 0; i < arr.length; i += 1) {
		if (operations[i] <= 0) {
			continue
		}

		result.splice(result.length, 0, ...new Array(operations[i]).fill(arr[i]))
	}

	return result

	function isControlValue(value) {
		return [
			'--discard-next',
			'--discard-prev',
			'--double-next',
			'--double-prev',
		].some((v) => v === value)
	}
}

module.exports = {
	transform,
}
