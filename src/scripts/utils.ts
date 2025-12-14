export function etaReadTime(body:any, wpm:number=225):string {
	const content = body || ''
	const wordCount = content.split(/\s+/).length
	const mins = Math.ceil(wordCount / wpm)

	if (mins === 1) { return '~1 min read'
	} else { return `${mins} min read` }
}

export function removeMdStuff(input:string):string {
	const imprt = input.replace(/^(?:import\s+.*?from\s+['"].*?['"];?\s*|\s*\n)+/g, '')
	const html = imprt.replace(/<(\w+)[^>]*>.*?<\/\1\s*>|<\w+[^>]*\/?>/gs, '')
	const md = html.replace(/\[(.*?)\]\(.*?\)/g, '$1')
	return md.replace(/[\n\r]/g, '')
}

export function charCounter(body:any):number {
	return removeMdStuff(body).length
}