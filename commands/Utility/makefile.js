module.exports = {
	name: 'makefile',
	description: 'Creates a file',
	ownerOnly: true,
	execute: async ({ message, args, client, text }) => {
		const split = text.split(' & ');
		const fs = require('fs');

		const content = `module.exports = {\nname: '${split[0]}',\nexecute(${split[1]}, client, instance) {\nconsole.log(\`${split[2]}: ${'${' + split[1] + '}'}\`)\n}\n}`;

		fs.writeFile(`${instance.dir}/events/${split[0]}.js`, content, err => {
			if (err) {
				console.error(err);
				return;
			}
			//file written successfully
		})
	}
};
