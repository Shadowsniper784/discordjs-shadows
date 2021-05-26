const axios = require('axios')
module.exports = {
	name: 'docs',
	args: true,
	description: 'Search docs',
	expectedArgs: '[text]',
	execute: async ({ message, send, args }) => {
		const uri = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
			args
		)}`;

		axios
			.get(uri)
			.then(embed => {
				const { data } = embed;

				if (data && !data.error) {
					message.channel.send({ embed: data });
				} else {
					message.reply('Could not find that documentation');
				}
			})
			.catch(err => {
				console.error(err);
			});
	}
};
