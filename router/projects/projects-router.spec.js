const request = require("supertest");
const auth = require("../../api/auth.js");
const db = require("../../data/config.js");
const server = require("../../api/server.js");

describe("projects router", () => {
  const example_professor = {
    id: 1,
    name: "Schroeder",
    email: "Schroeder@gmail.com",
    password: "superposition",
  };

  const example_student = {
    id: 1,
    professor_id: 1,
    name: "Bob",
    email: "bob@gmail.com",
  };

  const example_project = {
    id: 1,
    student_id: 1,
    name: "example project",
    description: "example project description",
    due_date: "2020-04-28",
    completed: 0,
  };

  let token;

  beforeEach(() => {
    token = auth.generateToken(example_professor);
    return db("projects")
      .truncate()
      .then(() => db("students").truncate())
      .then(() => db("users").truncate())
      .then(() => db("users") .insert(example_professor))
      .then(() => db("students").insert(example_student))
      .then(() => db("projects").insert(example_project));
  });

  describe("GET /api/projects/:id", () => {
    it("should return example project", async () => {
      const res = await request(server)
        .get(`/api/projects/${example_project.id}`)
        .set("Authorization", token);
      expect(res.status).toBe(200);
      expect(res.body.project).toEqual(example_project);
    });

    it.todo("should return 404 on unknown projects");
  });

  describe("PUT /api/projects/:id", () => {
    it.todo("should return 200");
    it.todo("should return updated student");
    it.todo("should reject invalid student objects");
    it.todo("should return 404 on unknown students");
  });

  describe("DELETE /api/projects/:id", () => {
    it.todo("should return 200");
    it.todo("should return deleted student");
    it.todo("should return 404 on unknown students");
  });
});
