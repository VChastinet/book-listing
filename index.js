import { SEARCH_PARAMS } from "./app/constants.js"
import { getContentDetail, getContentListing } from "./app/service.js"
import { openContentDetailCard, updateContentDetail, updateContentListing } from "./app/ui.js"

const contentDetailCard = document.querySelector('dialog')
const searchForm = document.getElementById('search-form')
const prevButton = document.getElementById('prev-button')
const nextButton = document.getElementById('next-button')

const handleListing = async (keyword, page) => {
	const body = document.querySelector('body')
	body.classList.add('loading')
	const content = await getContentListing(keyword, page)
	body.classList.remove('loading')
	updateContentListing(content)
}

handleListing(SEARCH_PARAMS.query, SEARCH_PARAMS.page)

searchForm.addEventListener('submit', (event) => {
	event.preventDefault()
	const formData = new FormData(event.target)
	SEARCH_PARAMS.query = formData.get('contentSearch') || 'books'
	SEARCH_PARAMS.page = 0;

	handleListing(SEARCH_PARAMS.query, SEARCH_PARAMS.page)
})

prevButton.addEventListener('click', () => {
	SEARCH_PARAMS.page -= SEARCH_PARAMS.limit
	handleListing(SEARCH_PARAMS.query, SEARCH_PARAMS.page)
})

nextButton.addEventListener('click', () => {
	SEARCH_PARAMS.page += SEARCH_PARAMS.limit
	handleListing(SEARCH_PARAMS.query, SEARCH_PARAMS.page)
})

contentDetailCard.addEventListener('modalOpen', async (event) => {
	openContentDetailCard()

	contentDetailCard.classList.add('loading')
	const contentDetails = await getContentDetail(event.detail)
	contentDetailCard.classList.remove('loading')

	updateContentDetail(contentDetails)
})
