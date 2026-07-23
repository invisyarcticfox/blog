export function removeMdStuff(input:string):string {
	return input
		.replace(/^import .*$/gm, '')
    .replace(/<Image[\s\S]*?\/>/g, '')
    .replace(/<div[^>]*\/>|<div[^>]*>[\s\S]*?<\/div>/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
		.replace(/\r?\n+/g, '')
		.trim()
}

export function charCount(input:string) { return removeMdStuff(input).length }

export function readTime(input:string, wpm:number=225):number {
	const words = removeMdStuff(input).split(/\s+/).filter(Boolean).length
	return Math.max(1, Math.ceil(words / wpm))
}