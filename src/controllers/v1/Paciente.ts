import { Request, Response } from "express";
import { log } from "../../libraries/Log";
import { validateId } from "../../utils/validateId";
import patientService from "../../services/PacienteService";
import { Controller } from "../../libraries/Controller";

export const handleCreatePatient = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { body } = req;

    const patient = await patientService.createNewPatient(body);

    return Controller.created(res, patient);
  } catch (error) {
    log.error("An error occurred when trying to create a new Patient.");
    Controller.serverError(res, error);
  }
};

export const handleGetPatientById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    validateId(req, res);
    const patientId = req.params.id;

    const patient = await patientService.getPatientById(patientId);

    if (!patient) {
      return Controller.notFound(res);
    }

    return Controller.ok(res, patient);
  } catch (error) {
    log.error("An error occurred when trying to get a patient.");
    log.error(error);
    Controller.serverError(res, error);
  }
};

export const handleGetAllPatient = async (
  _req: Request,
  res: Response
): Promise<any> => {
  try {
    const patients = await patientService.getAllPatients();

    return Controller.ok(res, patients);
  } catch (error) {
    log.error("An error occurred when trying to get all patient.");
    Controller.serverError(res, error);
  }
};

export const handleUpdatePatient = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    validateId(req, res);
    const patientId = req.params.id;
    const { body } = req;

    const patient = await patientService.updatePatient(patientId, body);

    if (!patient) {
      return Controller.notFound(res);
    }

    return Controller.ok(res, patient);
  } catch (error) {
    log.error("An error occurred when trying to update a patient.");
    Controller.serverError(res, error);
  }
};

export const handleDeletePatient = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    validateId(req, res);
    const patientId = req.params.id;

    const patient = await patientService.deletePatientById(patientId);

    if (!patient) {
      return Controller.notFound(res);
    }

    return Controller.noContent(res);
  } catch (error) {
    log.error("An error occurred when trying to delete a patient.");
    Controller.serverError(res, error);
  }
};
