import request from "supertest";
import app from "../../server";
import { connectDBTest, disconnectDBTest } from "../setupDbTest";

const mockPaciente = {
  firstName: "Test",
  lastName: "Jest",
  birthDate: new Date("1989-08-04"),
  gender: "M",
  email: "test.jest@example.com",
  phone: "5551234345",
  address: "",
  bloodType: "O+",
  allergies: [],
  chronicDiseases: ["Hipertensión"],
};

describe("Testing functions for CRUD operations in PacienteService.ts file", () => {
  beforeAll(async () => {
    await connectDBTest();
  });

  afterAll(async () => {
    await disconnectDBTest();
  });

  let testId;

  /* --- Start GET all test cases --- */
  it("GET /api/v1/paciente works", async () => {
    const response = await request(app).get("/api/v1/paciente").send();

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toContain("json");
    expect(response.body).toHaveProperty("message", "Ok");
    expect(response.body).toHaveProperty("data");
  });

  /* --- Start POST test cases --- */
  it("POST /api/v1/paciente works", async () => {
    const response = await request(app)
      .post("/api/v1/paciente")
      .send(mockPaciente);

    expect(response.status).toBe(201);
    expect(response.headers["content-type"]).toContain("json");
    expect(response.body).toHaveProperty("message", "Created");
    expect(response.body).toHaveProperty("data");
  });

  it("POST /api/v1/paciente create a new patient correctly", async () => {
    const response = await request(app)
      .post("/api/v1/paciente")
      .send(mockPaciente);

    expect(response.body.data._id).toBeDefined();
    expect(response.body.data.email).toBe("test.jest@example.com");
    testId = response.body.data._id;
  });

  it("POST /api/v1/paciente bad request", async () => {
    const response = await request(app)
      .post("/api/v1/paciente")
      .send({
        firstName: "Test",
        lastName: "Jest",
        birthDate: new Date("1989-08-04"),
        gender: "k",
        email: "test.jest@example.com",
        phone: "5551234345",
        address: "",
        bloodType: "O+",
        allergies: [],
        chronicDiseases: ["Hipertensión"],
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Bad Request");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data[0].message).toBe(
      '"gender" must be one of [F, M, Other]'
    );
  });

  /* --- Start GET by id test cases --- */
  it("GET /api/v1/paciente/:id works", async () => {
    const response = await request(app)
      .get(`/api/v1/paciente/${testId}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toContain("json");
    expect(response.body).toHaveProperty("message", "Ok");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data._id).toBe(testId);
  });

  it("GET /api/v1/paciente/:id not found", async () => {
    const response = await request(app)
      .get(`/api/v1/paciente/777252B2ec5Ee6a22a8eDc34`)
      .send();

    expect(response.status).toBe(404);
    expect(response.headers["content-type"]).toContain("json");
    expect(response.body).toHaveProperty("message", "Not Found");
  });

  it("GET /api/v1/paciente/:id Invalid ID format", async () => {
    const response = await request(app).get(`/api/v1/paciente/77`).send();

    expect(response.status).toBe(400);
    expect(response.headers["content-type"]).toContain("json");
    expect(response.body).toHaveProperty("message", "Bad Request");
    expect(response.body).toHaveProperty("data", "Invalid ID format.");
  });

  /* --- Start PATCH test cases --- */
  it("PATCH /api/v1/paciente/:id works", async () => {
    const response = await request(app)
      .patch(`/api/v1/paciente/${testId}`)
      .send({ email: "test.jest_updated@email.com" });

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toContain("json");
    expect(response.body).toHaveProperty("message", "Ok");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data.email).toBe("test.jest_updated@email.com");
  });

  it("PATCH /api/v1/paciente/:id not found", async () => {
    const response = await request(app)
      .patch(`/api/v1/paciente/777252B2ec5Ee6a22a8eDc34`)
      .send();

    expect(response.status).toBe(404);
    expect(response.headers["content-type"]).toContain("json");
    expect(response.body).toHaveProperty("message", "Not Found");
  });

  /* --- Start DELETE test cases --- */
  it("DELETE /api/v1/paciente/:id works", async () => {
    const response = await request(app)
      .delete(`/api/v1/paciente/${testId}`)
      .send();

    expect(response.status).toBe(204);
  });

  it("DELETE /api/v1/paciente/:id not found", async () => {
    const response = await request(app)
      .delete(`/api/v1/paciente/${testId}`)
      .send();

    expect(response.status).toBe(404);
    expect(response.headers["content-type"]).toContain("json");
    expect(response.body).toHaveProperty("message", "Not Found");
  });
});
