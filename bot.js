const client = require("./auth")
const { getSent, setSent, delay } = require("./utils")
const { generateVariation } = require("./variation.js")

const message = ` INSIRA SUA MENSAGEM AQUI `

client.on("group_join", async (event) => {
	let chat
	try {
		chat = await client.getChatById(event.chatId)
		const hidden = getSent()

		console.log("[GROUP_JOIN] joined group:", chat.name)

		for (const participant of chat.participants) {
			const participantId = participant.id._serialized
			if (participant.isAdmin || hidden.includes(participantId)) {
				console.log("[GROUP_JOIN] skipped", participantId)
				continue
			}

			const variatedMessage = await generateVariation(message)
			await delay(5, 10)

			try {
				console.log("[GROUP_JOIN] sending message to:", participant.id.user)
				await client.sendMessage(participantId, variatedMessage)

				setSent(participantId)
				hidden.push(participantId)
			} catch (error) {
				console.error(`[GROUP_JOIN] failed to message ${participantId}:`, error)
			}
		}
	} catch (error) {
		console.error("[GROUP_JOIN] error handling group_join:", error)
	}

	console.log("[GROUP_JOIN] leaving group:", chat.name)
	await chat.leave()
})
