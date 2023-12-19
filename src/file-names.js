const { NotImplementedError } = require('../extensions/index.js')

/**
 * There's a list of file, since two files cannot have equal names,
 * the one which comes later will have a suffix (k),
 * where k is the smallest integer such that the found name is not used yet.
 *
 * Return an array of names that will be given to the files.
 *
 * @param {Array} names
 * @return {Array}
 *
 * @example
 * For input ["file", "file", "image", "file(1)", "file"],
 * the output should be ["file", "file(1)", "image", "file(1)(1)", "file(2)"]
 *
 */
function renameFiles(names) {
	const files = new Map()
	return names.map((name) => {
		const fileCount = calcFile(name, files)

		if (fileCount > 0) {
			calcFile(`${name}(${fileCount})`, files)
			return `${name}(${fileCount})`
		}

		return name
	})

	function calcFile(filename, files) {
		files.has(filename)
			? files.set(filename, files.get(filename) + 1)
			: files.set(filename, 0)
		return files.get(filename)
	}
}

module.exports = {
	renameFiles,
}
