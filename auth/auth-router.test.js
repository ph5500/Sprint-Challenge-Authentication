const request = require("supertest");

const server = require("../api/server.js")

const random = Date.now();

describe("auth router", function () {
    it("should run the tests", function () {
        return request(server)
            .get("/api/auth")
            .then(res => {
                expect(res.status).toBe(200);
            });
    });

    it("should return JSON formatted body", function () {
        return request(server)
            .get("/api/auth")
            .then(res => {
                expect(res.type).toMatch("json");
            });
    });
});

describe("POST /register", function () {
    it("should return 201 success", function () {
        return request(server)
            .post("/api/auth/register")
            .send({
                username: `testing user ${random}`,
                password: "testing password"
            })
            .then(res => {
                expect(res.status).toBe(201);
            });
    });

    it("should return a JSON formatted body", function () {
        return request(server)
            .post("/api/auth/register")
            .send({
                username: `testing user ${random}`,
                password: "testing password"
            })
            .then(res => {
                expect(res.type).toMatch("json");
            });
    });
});

describe("POST /login", function () {
    it("should return 200 OK", function () {
        return request(server)
            .post("/api/auth/login")
            .send({
                username: `testing user ${random}`,
                password: "testing password"
            })
            .then(res => {
                expect(res.type).toBe(200);
            });
    });

    it("should return a success message", function () {
        return request(server)
            .post("/api/auth/login")
            .send({
                username: `testing user ${random}`,
                password: "testing password"
            })
            .then(res => {
                expect(res.body.message).toMatch('Welcome');
            });
    });

    it("should return a success message", function () {
        return request(server)
            .post("/api/auth/login")
            .send({
                username: `testing user ${random}`,
                password: "testing"
            })
            .then(res => {
                expect(res.body.message).toMatch('/login error');
            });
    });
});