import express from "express";
import {
  handleCreatePatient,
  handleDeletePatient,
  handleGetAllPatient,
  handleGetPatientById,
  handleUpdatePatient,
} from "../controllers/v1/Paciente";

const router = express.Router();

router.post("/paciente", handleCreatePatient);
router.get("/paciente", handleGetAllPatient);
router.get("/paciente/:patientId", handleGetPatientById);
router.put("/paciente/:patientId", handleUpdatePatient);
router.delete("/paciente/:patientId", handleDeletePatient);

export default router;
