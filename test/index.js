var app = require("../app");
var request = require("supertest");
var expect = require("expect.js");

describe("api", () => {
  it("list users", (done) => {
    request(app)
      .get("/users")
      .expect(200)
      .end((err, res) => {
        expect(res.body.length).to.eql(30);
        expect(res.body[0]).to.have.property("id");
        done();
      });
  });

  it("get user detail", (done) => {
    request(app)
      .get("/user/robaraujo")
      .expect(200)
      .end((err, res) => {
        expect(res.body.login).to.eql("robaraujo");
        expect(res.body).to.have.property("id");
        done();
      });
  });

  it("get user repos", (done) => {
    request(app)
      .get("/user/robaraujo/repos")
      .expect(200)
      .end((err, res) => {
        expect(res.body[0]).to.have.property("id");
        done();
      });
  });
});
