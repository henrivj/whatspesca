const fs = require("fs")

const SENT_FILE = "./sent.txt"

function getSent() {
	if (!fs.existsSync(SENT_FILE)) return []
	return fs.readFileSync(SENT_FILE, "utf-8").split("\n").filter(Boolean)
}

function setSent(id) {
	fs.appendFileSync(SENT_FILE, id + "\n")
}

function delay(minSec, maxSec) {
	const totalMs = (Math.random() * (maxSec - minSec) + minSec) * 1000
	let remaining = Math.ceil(totalMs / 1000)

	process.stdout.write(`[DELAY] Waiting ${remaining}s...`)

	const interval = setInterval(() => {
		remaining--
		process.stdout.write(`\r[DELAY] ${remaining}s...   `)
		if (remaining <= 0) clearInterval(interval)
	}, 1000)

	return new Promise((resolve) => {
		setTimeout(() => {
			clearInterval(interval)
			process.stdout.write(`\r[DELAY] Done waiting.            \n`)
			resolve()
		}, totalMs)
	})
}

module.exports = { getSent, setSent, delay }
