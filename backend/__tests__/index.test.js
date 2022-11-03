const request = require("supertest");
const nock = require("nock");

const app = require('../server');

describe("test server", () => {
	const scope = nock("http://localhost:5000/rate-limiter");
	describe("rate limiter api", () => {
		it("should return 200", async () => {
			scope
				.get("/pro")
				.once()
				.replyWithFile(200, __dirname + "/__mocks__/rateLimiter.json");
			const response = await request(app)
				.get("/pro");
			expect(response.status).toEqual(200);
			expect(response.body).toMatchSnapshot();
		});
		it("should return 503", async () => {
			const response = await request(app).get("/free");
			expect(response.status).toEqual(503);
		});
		it("should return 429", async () => {
			scope.get("/free").once().reply(429, {
                "response": "error",
                "maxLimitCalls": "reached max limit for your plan - 5 per second - 1",
                "ttl": "Thu Nov 03 2022 17:39:09 GMT+0200 (Israel Standard Time)"
            });
			const response = await request(app)
				.get("/free");
			expect(response.status).toEqual(429);
		});
	});
});