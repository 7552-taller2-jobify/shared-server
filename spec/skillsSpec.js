// var request = require("supertest");
// var app = require("../app/server/skills");

// var skill
// beforeEach(function() {
//   skill = jasmine.createSpyObj('Skill',
//     ['findAll', 'create', 'update', 'destroy']);
// });

describe("A suite is just a function", function() {
  var a;

  it("and so is a spec", function() {
    a = true;

    expect(a).toBe(true);
  });
});

describe("SkillsRoute", function() {
//  describe("GET /", function() {
//    it("should return 200 with empty skills", function(done) {
//      request(app)
//        .get("/")
//        .expect('Content-Type', /json/)
//        .expect(200, {skills: [], metadata: {version: "1.0.0", count: 0}})
//        .end(function(err, res) {
//          if (err) return done(err);
//          done();
//        });
//    });
//    it("should return 500 with empty skills", function(done) {
//      var Skill = require("../app/server/models/skill");
//      spyOn(Skill, "findAll").and.callFake(function() {
//        throw new Error({code: 500, message: "booms"});
//      });
//
//      request(app)
//        .get("/")
//        .expect('Content-Type', /json/)
//        .expect(500, {code: 500, message: "boom"})
//        .end(function(err, res) {
//          if (err) return done(err);
//          done();
//        });
//    });
//  });
});
