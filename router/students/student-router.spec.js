const request = require("supertest");
const auth = require("../../api/auth.js");
const db = require("../../data/config.js");
const server = require("../../api/server.js");

describe("students router", () => {
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

  let token;

  beforeEach(async () => {
    await db("students").truncate();
    await db("users").truncate();
    await db("users").insert(example_professor);
    await db("students").insert(example_student);
    token = auth.generateToken(example_professor);
  });

  describe("GET /api/students", () => {
    it("should return 200", async () => {
      const res = await request(server)
        .get(`/api/students`)
        .set("Authorization", token);
      expect(res.status).toBe(200);
    });

    it("should return list with example student", async () => {
      const res = await request(server)
        .get(`/api/students`)
        .set("Authorization", token);
      expect(res.body.students).toEqual([example_student]);
    });
  });

  describe("GET /api/students/:id", () => {
    it("should return 200", async () => {
      const res = await request(server)
        .get(`/api/students/${example_student.id}`)
        .set("Authorization", token);
      expect(res.status).toBe(200);
    });

    it("should return example student", async () => {
      const res = await request(server)
        .get(`/api/students/${example_student.id}`)
        .set("Authorization", token);
      expect(res.body.student).toEqual(example_student);
    });

    it.todo("should return 404 on unknown students");
  });

  describe("POST /api/students", () => {
    const new_student = {
      name: "Evan",
      email: "evan@gmail.com",
    };

    it("should return 201", async () => {
      const res = await request(server)
        .post(`/api/students`)
        .send(new_student)
        .set("Authorization", token);
      expect(res.status).toBe(201);
    });

    it("should return new student", async () => {
      const res = await request(server)
        .post(`/api/students`)
        .send(new_student)
        .set("Authorization", token);
      expect(res.body.student.professor_id).toBe(example_professor.id);
      expect(res.body.student.name).toBe(new_student.name);
      expect(res.body.student.email).toBe(new_student.email);
    });

    it("should return 400 on invalid student objects", async () => {
      const res = await request(server)
        .post(`/api/students`)
        .send({ random_key: "hey-o" })
        .set("Authorization", token);
      expect(res.status).toBe(400);
    });

    it("should return 404 on unknown students", async () => {
      const res = await request(server)
        .get(`/api/students/1337`)
        .set("Authorization", token);
      expect(res.status).toBe(404);
    });
  });

  describe("PUT /api/students", () => {
    it.todo("should return 200");
    it.todo("should return updated student");
    it.todo("should reject invalid student objects");
    it.todo("should return 404 on unknown students");
  });

  describe("DELETE /api/students", () => {
    it.todo("should return 200");
    it.todo("should return deleted student");
    it.todo("should return 404 on unknown students");
  });
});
