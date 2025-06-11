export function etaReadTime(body:any) {
	const wordCount = body.split(/\s+/).length
	const mins = Math.ceil(wordCount / 225)

	if (mins === 1) {
		return '~1 min read'
	} else { return `${mins} min read` }
}

//

export function charCounter(body:any, returnText:boolean=false, comma:boolean=true) {
	const cleanBody = body.replace(
		// removes import lines
		/^(?:import\s+.*?from\s+['"].*?['"];?\s*|\s*\n)+/g,
		''
	).replace(
		// removes html tags
		/<(\w+)[^>]*>.*?<\/\1\s*>|<\w+[^>]*\/?>/gs,
		''
	).replace(
		// removes md links
		/\[(.*?)\]\(.*?\)/g,
		'$1'
	)

	if (returnText) {
		return cleanBody
	} else if(!comma) {
		return `${cleanBody.length} characters`
	} else {
		const formatCount = cleanBody.length.toLocaleString('en-GB')
		return `${formatCount} characters`
	}
}