const fs = require("fs")
const { createSpinner } = require("nanospinner")

function createFileIfNotExists(filePath) {
	if (!fs.existsSync(filePath)) {
		fs.writeFileSync(filePath, "")
	}
}

function getSent(filePath) {
	createFileIfNotExists(filePath)
	return fs
		.readFileSync(filePath, "utf-8")
		.split("\n")
		.map((line) => line.trim())
		.filter(Boolean)
}

function setSent(filePath, id) {
	fs.appendFileSync(filePath, `${id}\n`)
}

function randomLetters(length = 10) {
	const ALPHABET = "abcdefghijklmnopqrstuvwxyz"

	let result = ""
	for (let i = 0; i < length; i++) {
		result += ALPHABET[Math.floor(Math.random() * ALPHABET.length)]
	}
	return result
}

async function delay(minSec, maxSec) {
	const totalSeconds = Math.ceil(Math.random() * (maxSec - minSec) + minSec)
	const spinner = createSpinner(`Waiting ${totalSeconds}s...`).start()

	for (let remaining = totalSeconds; remaining > 0; remaining--) {
		spinner.update({ text: `Waiting ${remaining}s...` })
		await new Promise((resolve) => setTimeout(resolve, 1000))
	}

	spinner.success({ text: "Done waiting." })
}

module.exports = { getSent, setSent, randomLetters, delay }
