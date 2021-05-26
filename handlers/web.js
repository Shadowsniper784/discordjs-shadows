module.exports = () => {
  const app = require('express')();
const server = require('http').Server(app);
app.get('/', (req, res) => {
	res.send('Hello World!');
});
//let port = 3000;

app.listen();
//() => {
//console.log(
//		`24/7 app listening at https://discordjs-shadow.shadowsniper784.repl.co/`
//	);
//})
}