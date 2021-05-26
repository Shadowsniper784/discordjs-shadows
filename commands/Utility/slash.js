const options = [
	{
		name: 'text',
		description: 'What to say',
		type: 3,
		required: true
	}
];
module.exports = {
	name: 'say',
	description: 'Make the bot say something',
	testOnly: true,
	minArgs: 1,
	expectedArgs: '<text>',
	slash: true,
	callback: async ({ interaction, text, send }) => {
		 return text
	}
};
