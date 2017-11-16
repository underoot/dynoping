const DYNO_HOST = process.env.npm_config_dyno_host;
const DYNO_INTERVAL = process.env.npm_config_dyno_interval || 1000 * 60 * 30;
const DYNO_TIMEOUT = process.env.npm_config_dyno_timeout || 1000 * 60;

const http = require('http');
const server = http.createServer((req, res) => {
	req.pipe(res);
});

setInterval(() => {
	const req = http.request({
		method: 'HEAD',
		host: DYNO_HOST,
		timeout: DYNO_TIMEOUT
	});

	req.on('error', err => {
		console.log('Cannot connect to dyno: ' + err.message);
	});

	req.end();
}, DYNO_INTERVAL);

if (require.main === module) {
	server.listen(process.env.PORT)
} else {
	module.exports = server;
}