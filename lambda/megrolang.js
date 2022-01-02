'use strict';
const { list: Phrases, count: CountPhrase } = require('./services/firebase/entities/phrases')
const { list: Story, getChapter, count: CountStory, countChapter } = require('./services/firebase/entities/histories');
const PAGES = 4
/**
 * @param {object} event
 * @param {string} event.type the database origin
 * @param {string} event.id the story id to load your chapters
 * @param {bool} event.isFirst is the first page
 * @param {bool} event.isLast is the last page
 * @param {object} event.first the first element of the page
 * @param {object} event.last the last element of the page
 * @param {bool} event.mode [0,1,2] 0 - prev, 1 - next, 2 - total
*/
module.exports.handle = async (event) => {
	let response = {}
	
	try {
		switch (event.type){
			case 'phrase': response = await handlePhrase(event); break;
			case 'story': response = await handleStory(event); break;
			case 'chapter': response = await handleChapter(event); break;
			default: throw "Invalid type of data"; break;
		}
		
		return {
			statusCode: 200,
			body: {type: event.type, data: response.items, ...response.paginator}
		}
	} catch (error) {
		console.log({error})
		const err = (typeof error === "string" ? error : "Erro inesperado, tente novamente mais tarde.")
		return {statusCode: 400, body: err}
	}
};

const createPaginator = (event) => {
	if( event.isFirst && event.isLast && event.first && event.last) {
		return {
			isFirst: event.isFirst, 
			isLast: event.isLast,
			first: event.first,
			last: event.last,
		}
	}
	return null
}

const handlePhrase =  async (event) => {
	if (event.mode==="2") {
		const total = await CountPhrase()
		return Promise.resolve({items: total, paginator: null})
	}
	return Phrases((event.limit || PAGES), createPaginator(event), event.mode);
}

const handleStory = async (event) => {
	if (event.mode==="2") {
		const total = await CountStory()
		return Promise.resolve({items: total, paginator: null})
	}
	return Story((event.limit || PAGES), createPaginator(event), event.mode);
}

const handleChapter = async (event) => {
	if (!event.id) {
		throw "The id of story is required"
	}
	if (event.mode==="2") {
		const total = await countChapter()
		return Promise.resolve({items: total, paginator: null})
	}
	let {items, paginator} = await getChapter(event.id, (event.limit || PAGES), createPaginator(event), event.mode);
	items.sort((a, b) => a.order - b.order)
	items = items.map(({id, content, order, history}) => ({id, content, order, history: history.id}))
	return Promise.resolve({items, paginator})
}