export function etaReadTime(body:any, wpm:number=225) {
	const wordCount = body.split(/\s+/).length
	const mins = Math.ceil(wordCount / wpm)

	if (mins === 1) { return '~1 min read'
	} else { return `${mins} min read` }
}

//

export function charCounter(body:any, comma:boolean=true):string {
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
	).length


	if (comma) { return `${cleanBody.toLocaleString('en-gb')} characters`
	} else { return `${cleanBody} characters` }
}