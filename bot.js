const client = require("./auth")
const { getSent, setSent, randomLetters, delay } = require("./utils")
const { generateVariation } = require("./variation")

const MESSAGE_TEMPLATE = ` SUA MENSAGEM AQUI `

const DELAY_MIN = 60
const DELAY_MAX = 120
const SENT_FILE_PATH = "./sent.txt"

const sentParticipants = getSent(SENT_FILE_PATH)

client.on("group_join", async (event) => {
	try {
		const chat = await client.getChatById(event.chatId)

		console.log(`[GROUP] joined group: ${chat.name}`)

		for (const participant of chat.participants) {
			if (participant.isAdmin) {
				console.log(`[CHAT] skipped ${participant.id._serialized}: is admin`)
				continue
			}

			if (sentParticipants.includes(participant.id._serialized)) {
				console.log(`[CHAT] skipped ${participant.id._serialized}: already sent`)
				continue
			}

			try {
				const participantId = participant.id._serialized
				const variatedMessage = await generateVariation(MESSAGE_TEMPLATE, { model: "qwen2.5:14b", temperature: 1.25 })

				const contactName = randomLetters(8)
				const contactSurname = participant.id.user

				await client.saveOrEditAddressbookContact(participantId, contactName, contactSurname, true)
				const contact = await client.getContactById(participantId)

				if (contact) {
					console.log(`[CHAT] Contact saved: ${participantId} as: ${contactName} ${contactSurname}`)
					await delay(DELAY_MIN, DELAY_MAX)

					await client.sendMessage(participantId, variatedMessage)
					console.log(`[CHAT] Sent message to: ${participantId}`)

					setSent(SENT_FILE_PATH, participantId)
				}
			} catch (error) {
				console.error(`[CHAT] failed to process participant ${participant.id._serialized}:`, error)
			}
		}

		console.log(`[GROUP] leaving group: ${chat.name}`)
		await chat.leave()
	} catch (error) {
		console.error(`[GROUP] error handling group_join:`, error)
	}
})
