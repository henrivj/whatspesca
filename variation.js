const generateVariation = async (message) => {
	const prompt = `
You are a text rewriting engine. Rewrite the message below.

Requirements:
- Preserve the exact meaning, intent, and approximate length.
- Significantly change the structure: reorder clauses, vary sentence length, move the link to a different position in the text, change how ideas connect.
- Use different vocabulary and natural synonyms; adjust tone slightly (more direct or more conversational).
- Keep the link URL exactly as-is — only its position in the text may change.
- Preserve emojis and formatting if present.

Output rules:
- Respond with ONLY the rewritten message.
- No quotes, no markdown, no code blocks, no numbering, no preamble, no explanations.
- Do not include any text before or after the rewritten message.

Message:
"""
${message}
"""
	`.trim()

	const res = await fetch("http://localhost:11434/api/generate", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			model: "qwen2.5:14b",
			prompt,
			stream: false,
			options: { temperature: 1.2 }
		})
	})

	if (!res.ok) return console.error(`Ollama request failed (${res.status})`)

	const { response } = await res.json()
	return response.trim()
}

module.exports = { generateVariation }
