import express from "express";
import {
  handleCreatePatient,
  handleDeletePatient,
  handleGetAllPatient,
  handleGetPatientById,
  handleUpdatePatient,
} from "../controllers/v1/Paciente";
import { validateBody } from "../middlewares/ValidateSchema";
import {
  CreatePacienteSchema,
  UpdatePacienteSchema,
} from "../validators/PacienteSchema";

const routerPaciente = express.Router();

routerPaciente.post(
  "/paciente",
  validateBody(CreatePacienteSchema),
  handleCreatePatient
);
routerPaciente.get("/paciente", handleGetAllPatient);
routerPaciente.get("/paciente/:id", handleGetPatientById);
routerPaciente.patch(
  "/paciente/:id",
  validateBody(UpdatePacienteSchema),
  handleUpdatePatient
);
routerPaciente.delete("/paciente/:id", handleDeletePatient);

export default routerPaciente;
