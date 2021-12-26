'use strict';
const { list: Phrases } = require('./services/firebase/entities/phrases')
const { list: Story, getChapter } = require('./services/firebase/entities/histories')

module.exports.handle = async (event) => {
	let data = []
	let errors = []
	
	switch (event.type){
		default: errors.push("Invalid type of data"); break;
		case 'phrase': data = await Phrases(); break;
		case 'story': data = await Story(); break;
		case 'chapter':
			if (event.id) {
				data = await getChapter(event.id);
				data.sort((a, b) => a.order - b.order)
			} else{
				errors.push("The id of story is required")
			}
			break;
	}
	return {
		statusCode: (errors.length > 0 ? 400 : 200),
		body: (errors.length > 0 ? errors : {type: event.type, data}),
	};
};