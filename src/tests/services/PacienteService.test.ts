import request from "supertest";
import app from "../../server";
import { setupDB } from "../../db";
import mongoose from "mongoose";

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
  beforeEach(async () => {
    setupDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("GET /api/v1/paciente works", async () => {
    const response = await request(app).get("/api/v1/paciente").send();

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toContain("json");
    expect(response.body).toHaveProperty("message", "Ok");
    expect(response.body).toHaveProperty("data");
  });

  it("POST /api/v1/paciente works", async () => {
    const response = await request(app)
      .post("/api/v1/paciente")
      .send(mockPaciente);

    expect(response.status).toBe(201);
    expect(response.headers["content-type"]).toContain("json");
    expect(response.body).toHaveProperty("message", "Created");
    expect(response.body).toHaveProperty("data");
  });

  it("POST /api/v1/paciente create a new patiente correctly", async () => {
    const response = await request(app)
      .post("/api/v1/paciente")
      .send(mockPaciente);

    expect(response.body._id).toBeDefined();
    expect(response.body.email).toBe("test.jest@example.com");
  });
});
