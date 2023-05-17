import { contentUrlParans } from "./app/constants.js"
import { getContentDetail, getcontentListing } from "./app/service.js"
import { openContentDetailCard, updateContentDetail, updateContentListing } from "./app/ui.js"

const contentDetailCard = document.querySelector('dialog')
const searchForm = document.getElementById('search-form')
const prevButton = document.getElementById('prev-button')
const nextButton = document.getElementById('next-button')

const handleListing = async (keyword, page) => {
	const body = document.querySelector('body')
	body.classList.add('loading')
	const content = await getcontentListing(keyword, page)
	body.classList.remove('loading')
	updateContentListing(content)
}

handleListing(contentUrlParans.query, contentUrlParans.page)

searchForm.addEventListener('submit', (event) => {
	event.preventDefault()
	const formData = new FormData(event.target)
	contentUrlParans.query = formData.get('contentSearch') || 'books'
	contentUrlParans.page = 0;

	handleListing(contentUrlParans.query, contentUrlParans.page)
})

prevButton.addEventListener('click', () => {
	contentUrlParans.page -= contentUrlParans.limit
	handleListing(contentUrlParans.query, contentUrlParans.page)
})

nextButton.addEventListener('click', () => {
	contentUrlParans.page += contentUrlParans.limit
	handleListing(contentUrlParans.query, contentUrlParans.page)
})

contentDetailCard.addEventListener('modalOpen', async (event) => {
	openContentDetailCard()

	contentDetailCard.classList.add('loading')
	const contentDetails = await getContentDetail(event.detail)
	contentDetailCard.classList.remove('loading')

	updateContentDetail(contentDetails)
})
