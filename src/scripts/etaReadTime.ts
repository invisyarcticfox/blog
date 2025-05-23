export function etaReadTime(body:any) {
	const wordCount = body.split(/\s+/).length
	const mins = Math.ceil(wordCount / 225)

	if (mins === 1) {
		return '~1 min read'
	} else { return `${mins} min read` }
}