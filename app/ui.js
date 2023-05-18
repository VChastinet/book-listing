import { SEARCH_PARAMS } from "./constants.js"

const contentCardTemplate = (title, author, cover) => {
	const contentCardContainer = document.createElement('div')
	contentCardContainer.classList.add('content-card')

	contentCardContainer.innerHTML = `
	<img src="${cover}" alt="content cover image" />
	<div>
		<p>${title}</p>
		<span>${author}</span>
	</div>
`

	return contentCardContainer
}

export const openContentDetailCard = () => {
	const contentDetail = document.querySelector('dialog')

	contentDetail.showModal()
	contentDetail.classList.remove('translate-y-full')
}

export const updateContentDetail = (details) => {
	const { title, author, descriptionContent, coverSrc, subjectList } = details

	const coverElement = document.querySelector("#content-details > img")
	const titleElement = document.querySelector("#content-details > h2")
	const authorElement = document.querySelector("#content-details > p")
	const subjectListElement = document.querySelector("#content-details > ul")
	const descriptionElement = document.querySelector("#content-details > q")

	const subjectListing = subjectList.map(subject => `<li title=${subject}>${subject}</li>`).join('')

	titleElement.textContent = title
	authorElement.textContent = author
	descriptionElement.textContent = descriptionContent
	subjectListElement.innerHTML = subjectListing

	coverElement.setAttribute('src', coverSrc)
}

export const updateContentListing = (contentList) => {
	const contentDetail = document.querySelector('dialog')
	const prevButton = document.getElementById('prev-button')
	const nextButton = document.getElementById('next-button')
	const contentListing = document.getElementById('content-list')

	contentListing.innerHTML = '';

	contentList.forEach((content) => {
		const { coverSrc, authorName, title, contentRef } = content
		const contentCard = contentCardTemplate(title, authorName, coverSrc)

		contentCard.addEventListener('click', () => {
			const openModalEvent = new CustomEvent('modalOpen', { detail: contentRef })
			contentDetail.dispatchEvent(openModalEvent)
		})

		contentListing.insertAdjacentElement('beforeend', contentCard)
	})

	nextButton.toggleAttribute('disabled', contentList.length < SEARCH_PARAMS.limit);
	prevButton.toggleAttribute('disabled', !SEARCH_PARAMS.page);
}
