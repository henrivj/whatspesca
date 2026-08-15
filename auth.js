const { Client, LocalAuth } = require("whatsapp-web.js")
const qrcode = require("qrcode-terminal")

const client = new Client({
	authStrategy: new LocalAuth(),
	puppeteer: { headless: false }
})

client.on("qr", (qr) => {
	console.log("[AUTH] scan the QR code below:")
	qrcode.generate(qr, { small: true })
})

client.on("authenticated", () => console.log("[AUTH] authenticated"))
client.on("auth_failure", (msg) => console.error("[AUTH] auth failure:", msg))
client.on("disconnected", (reason) => console.error("[AUTH] disconnected:", reason))

client.ready = new Promise((resolve) => {
	client.once("ready", () => {
		console.log("[AUTH] client is ready")
		resolve()
	})
})

client.initialize()

module.exports = client
