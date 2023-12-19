const { NotImplementedError } = require('../extensions/index.js')

/**
 * Given two strings, find the number of common characters between them.
 *
 * @param {String} s1
 * @param {String} s2
 * @return {Number}
 *
 * @example
 * For s1 = "aabcc" and s2 = "adcaa", the output should be 3
 * Strings have 3 common characters - 2 "a"s and 1 "c".
 */
function getCommonCharacterCount(s1, s2) {
	return s1.split('').reduce((count, char) => {
		if (!s2.includes(char)) {
			return count
		}
		s2 = s2.replace(char, '')
		return count + 1
	}, 0)
}

module.exports = {
	getCommonCharacterCount,
}
