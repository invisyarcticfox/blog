export function etaReadTime(body:any, wpm:number=225):string {
	const content = body || ''
	const wordCount = content.split(/\s+/).length
	const mins = Math.ceil(wordCount / wpm)

	if (mins === 1) { return '~1 min read'
	} else { return `${mins} min read` }
}


export function charCounter(body:any, comma:boolean=true, txt:boolean=false):string {
	const content = body || ''
	const cleanBody = content.replace(
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
	).replace(/[\n\r]/g, '')


	if (comma && !txt) { return `${cleanBody.length.toLocaleString('en-gb')} characters`
	} else if (txt && !comma) { return cleanBody
	} else { return `${cleanBody.length} characters` }
}