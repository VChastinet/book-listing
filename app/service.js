import { API_URL, COVER_API_URL, COVER_IMG_FALLBACK, SEARCH_PARAMS } from "./constants.js"

export const getContentListing = async (keyword, page) => {
	const contentListUrl = `${API_URL}/search.json?q=${keyword}&limit=${SEARCH_PARAMS.limit}&offset=${page}`
	const { docs } = await fetch(contentListUrl).then(res => res.json())

	const contentList = docs.map(content => {
		const { cover_i, author_name, title, key } = content
		const coverSrc = cover_i ? `${COVER_API_URL}/b/id/${cover_i}.jpg` : COVER_IMG_FALLBACK
		const authorName = author_name ? author_name[0] : '-'

		return {
			coverSrc,
			authorName,
			title,
			contentRef: key
		}
	})

	return contentList
}

export const getContentDetail = async (contentRef) => {
	const contentDetailUrl = `${API_URL}${contentRef}.json`
	const { title, description, subjects, authors, covers } = await fetch(contentDetailUrl).then(res => res.json())
	const authorDetails = {}

	if (authors) {
		const authorDetailUrl = `${API_URL}${authors[0].author.key}.json`
		const { name, bio } = await fetch(authorDetailUrl).then(res => res.json())

		authorDetails.name = name
		authorDetails.bio = bio
	}

	const coverSrc = covers ? `${COVER_API_URL}/b/id/${covers[0]}.jpg` : COVER_IMG_FALLBACK
	const getDescription = description ? (description.value ?? description) : null
	const descriptionContent = getDescription ?? authorDetails.bio ?? 'No Description Provided'
	const subjectList = subjects ?? []
	const authorName = authorDetails.name ??'-'

	return { title, authorName, descriptionContent, coverSrc, subjectList }
}
