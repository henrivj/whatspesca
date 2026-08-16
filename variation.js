const { createSpinner } = require("nanospinner")

const REWRITE_PROMPT = `You are a text rewriting engine. Rewrite the message below in its original language.
Requirements:
- Preserve the exact meaning, intent, and approximate length.
- Significantly change the structure: reorder clauses, vary sentence length, move the link to a different position in the text, change how ideas connect.
- May add or remove details, but do not change the core idea.
- Use different vocabulary and natural synonyms; adjust tone slightly (more direct or more conversational).
- Keep the link URL exactly as-is — only its position in the text may change.
- Preserve emojis and formatting if present.
Output rules:
- Respond with ONLY the rewritten message.
- No quotes, no markdown, no code blocks, no numbering, no preamble, no explanations.
Message:
`

const generateVariation = async (message, { model, temperature }) => {
	const spinner = createSpinner("Generating message...").start()

	const res = await fetch("http://localhost:11434/api/generate", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			model,
			prompt: REWRITE_PROMPT + message,
			stream: false,
			options: { temperature }
		})
	}).catch((err) => {
		spinner.error({ text: `Failed to reach Ollama: ${err.message}` })
		console.error(err)
	})

	if (!res || !res.ok) {
		spinner.error({ text: `Ollama request failed (${res?.status})` })
		return
	}

	const { response } = await res.json()
	spinner.success({ text: "Done generating." })
	return response?.trim()
}

module.exports = { generateVariation }
