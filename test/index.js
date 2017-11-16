const assert = require('assert');
const sinon = require('sinon');
const request = require('supertest');

describe('dynoping', () => {
	let setInterval = null;
	let server = null;

	before('get random port', (done) => {
		require('net').createServer().listen(function() {
			process.env.PORT = this.address().port;
			this.close(done);
		});
	});

	before('stub timer function', () => {
		setInterval = sinon.stub(global, 'setInterval').callsFake(() => void 0);
	});

	before('require module', () => {
		server = require('..');
	});

	it('should add task to timer', () => {
		assert.equal(setInterval.calledOnce, true, "expected add task to timer but it's not happened");
	});

	it('should start server on process.env.PORT', () => {
		return request(server)
			.get('/')
			.expect(200);
	});

	after('unref server', () => {
		server.unref();
	})
});