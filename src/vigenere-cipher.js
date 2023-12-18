const { NotImplementedError } = require('../extensions/index.js')

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
	#isDirect

	constructor(isDirect = true) {
		this.#isDirect = isDirect
	}

	/**
	 * @param {String} message
	 * @param {String} key
	 */
	encrypt(message, key) {
		if (!message || !key) {
			throw new Error('Incorrect arguments!')
		}

		const getKey = this.#getKeyFunc(key)
		const resultArr = message
			.toUpperCase()
			.split('')
			.map((char) => this.#encryptChar(char, getKey))

		return this.#isDirect ? resultArr.join('') : resultArr.reverse().join('')
	}

	/**
	 * @param {String} message
	 * @param {String} key
	 */
	decrypt(message, key) {
		if (!message || !key) {
			throw new Error('Incorrect arguments!')
		}

		const getKey = this.#getKeyFunc(key)
		const resultArr = message
			.split('')
			.map((char) => this.#decryptChar(char, getKey))

		return this.#isDirect ? resultArr.join('') : resultArr.reverse().join('')
	}

	#getKeyFunc(key) {
		let index = 0
		return () => key[index++ % key.length].toUpperCase()
	}

	#encryptChar(char, getKey) {
		return this.#shiftChar(char, getKey, 1)
	}

	#decryptChar(char, getKey) {
		return this.#shiftChar(char, getKey, -1)
	}

	#shiftChar(char, getKey, direction) {
		const charCode = char.charCodeAt(0)
		const aCode = 'A'.charCodeAt(0)
		const zCode = 'Z'.charCodeAt(0)
		if (charCode < aCode || charCode > zCode) {
			return char
		}

		const shift = getKey().charCodeAt(0) - aCode
		const shiftedCode = charCode + direction * shift

		return shiftedCode - aCode >= 0
			? String.fromCharCode(aCode + ((shiftedCode - aCode) % 26))
			: String.fromCharCode(zCode + shiftedCode - aCode + 1)
	}
}

module.exports = {
	VigenereCipheringMachine,
}
