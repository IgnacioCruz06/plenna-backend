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

const router = express.Router();

router.post(
  "/paciente",
  validateBody(CreatePacienteSchema),
  handleCreatePatient
);
router.get("/paciente", handleGetAllPatient);
router.get("/paciente/:id", handleGetPatientById);
router.patch(
  "/paciente/:id",
  validateBody(UpdatePacienteSchema),
  handleUpdatePatient
);
router.delete("/paciente/:id", handleDeletePatient);

export default router;
