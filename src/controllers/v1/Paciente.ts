import { Request, Response } from "express";
import { log } from "../../libraries/Log";
import { validateId } from "../../utils/validateId";
import {
  createNewPatient,
  deletePatientById,
  getAllPatients,
  getPatientById,
  updatePatient,
} from "../../services/PacienteService";

export const handleCreatePatient = async (req: Request, res: Response) => {
  try {
    const { body } = req;

    const patient = await createNewPatient(body);

    res.status(201).json({ message: "created", data: patient });
  } catch (error) {
    log.error("An error occurred when trying to create a new Patient.");
    log.error(error);
    res.status(500).json({
      error: "Internal server error.",
    });
  }
};

export const handleGetPatientById = async (req: Request, res: Response) => {
  try {
    validateId(req, res);
    const patientId = req.params.id;

    const patient = await getPatientById(patientId);

    if (patient) {
      res.status(200).json({ message: "ok", data: patient });
    } else {
      res.status(404).json({ message: "Not found." });
    }
  } catch (error) {
    log.error("An error occurred when trying to get a patient.");
    log.error(error);
    res.status(500).json({
      error: "Internal server error.",
    });
  }
};

export const handleGetAllPatient = async (_req: Request, res: Response) => {
  try {
    const patients = await getAllPatients();

    res.status(200).json({ message: "ok", data: patients });
  } catch (error) {
    log.error("An error occurred when trying to get all patient.");
    log.error(error);
    res.status(500).json({
      error: "Internal server error.",
    });
  }
};

export const handleUpdatePatient = async (req: Request, res: Response) => {
  try {
    validateId(req, res);
    const patientId = req.params.id;
    const { body } = req;

    const patient = await updatePatient(patientId, body);

    if (patient) {
      res.status(200).json({ message: "ok", data: patient });
    } else {
      res.status(404).json({ message: "Not found." });
    }
  } catch (error) {
    log.error("An error occurred when trying to update a patient.");
    log.error(error);
    res.status(500).json({
      error: "Internal server error.",
    });
  }
};

export const handleDeletePatient = async (req: Request, res: Response) => {
  try {
    validateId(req, res);
    const patientId = req.params.id;

    const patient = await deletePatientById(patientId);

    if (patient) {
      res.status(204).json({ message: "deleted" });
    } else {
      res.status(404).json({ message: "Not found." });
    }
  } catch (error) {
    log.error("An error occurred when trying to delete a patient.");
    log.error(error);
    res.status(500).json({
      error: "An error occurred when trying to delete a patient.",
    });
  }
};
