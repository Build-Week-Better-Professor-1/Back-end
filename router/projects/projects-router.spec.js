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

  beforeEach(async () => {
    await db("projects").truncate();
    await db("students").truncate();
    await db("users").truncate();
    await db("users").insert(example_professor);
    await db("students").insert(example_student);
    await db("projects").insert(example_project);
    token = auth.generateToken(example_professor);
  });

  describe("GET /api/projects/:id", () => {
    it("should return 200", async () => {
      const res = await request(server)
        .get(`/api/projects/${example_project.id}`)
        .set("Authorization", token);
      expect(res.status).toBe(200);
    });

    it("should return example project", async () => {
      const res = await request(server)
        .get(`/api/projects/${example_project.id}`)
        .set("Authorization", token);
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
