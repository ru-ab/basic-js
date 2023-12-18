const { NotImplementedError } = require('../extensions/index.js')

/**
 * @typedef {Object} RepeaterOptions
 * @property {Number} repeatTimes
 * @property {String} separator
 * @property {String} addition
 * @property {Number} additionRepeatTimes
 * @property {String} additionSeparator
 */

/**
 * Create a repeating string based on the given parameters
 *
 * @param {String} str string to repeat
 * @param {RepeaterOptions} options options object
 * @return {String} repeating string
 *
 *
 * @example
 *
 * repeater('STRING', { repeatTimes: 3, separator: '**',
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */
function repeater(
	str,
	{
		repeatTimes,
		separator = '+',
		addition,
		additionRepeatTimes,
		additionSeparator = '|',
	},
) {
	if (typeof addition !== 'undefined' && typeof addition !== 'string') {
		addition = String(addition)
	}

	return new Array(repeatTimes)
		.fill(
			`${str}${new Array(additionRepeatTimes)
				.fill(addition)
				.join(additionSeparator)}`,
		)
		.join(separator)
}

module.exports = {
	repeater,
}
