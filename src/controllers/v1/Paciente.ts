import { /* NextFunction, */ Request, Response } from "express";
import mongoose from "mongoose";
import { log } from "../../libraries/Log";
import Paciente from "../../models/Paciente";

export const handleCreatePatient = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    const patient = await new Paciente({
      _id: new mongoose.Types.ObjectId(),
      firstName: body.firstName,
      lastName: body.lastName,
      birthDate: body.birthDate,
      gender: body.gender,
      contact: {
        email: body.contact.email,
        phone: body.contact.phone,
        address: body.contact.address,
      },
      medicalInfo: {
        bloodType: body.medicalInfo?.bloodType, //optional
        allergies: body.medicalInfo?.allergies, //optional string[]
        chronicDiseases: body.medicalInfo?.chronicDiseases, //optional string[]
      },
    });

    await patient.save();

    res.status(201).json({ message: "created", data: patient });
  } catch (error) {
    log.error("An error occurred when trying to create a new Patient.");
    log.error(error);
    res.status(500).json({
      error: "An error occurred when trying to create a new Patient.",
    });
  }
};

export const handleGetPatientById = async (req: Request, res: Response) => {
  try {
    const patientId = req.params.patientId;
    console.log("🚀 ~ handleGetPatientById ~ patientId:", patientId);

    const patient = await Paciente.findById(patientId);

    if (!patient) {
      res.status(404).json({ message: "Not found." });
      return;
    }

    res.status(200).json({ message: "ok", data: patient });
  } catch (error) {
    log.error("An error occurred when trying to get a patient.");
    log.error(error);
    res.status(500).json({
      error: "An error occurred when trying to get a patient.",
    });
  }
};

export const handleGetAllPatient = async (_req: Request, res: Response) => {
  try {
    const patients = await Paciente.find();
    console.log("🚀 ~ handleGetAllPatient ~ patients:", patients);

    if (!patients) {
      return;
    }

    res.status(200).json({ message: "ok", data: patients });
  } catch (error) {
    log.error("An error occurred when trying to get all patient.");
    log.error(error);
    res.status(500).json({
      error: "An error occurred when trying to get all patient.",
    });
  }
};

export const handleUpdatePatient = async (req: Request, res: Response) => {
  try {
    const patientId = req.params.patientId;
    const body = req.body;

    const patient = await Paciente.findByIdAndUpdate(patientId, body);

    if (!patient) {
      res.status(404).json({ message: "Not found." });
      return;
    }

    //await patient.setUpdate(body); //TODO: complete this implementation

    res.status(200).json({ message: "ok", data: patient });
  } catch (error) {
    log.error("An error occurred when trying to update a patient.");
    log.error(error);
    res.status(500).json({
      error: "An error occurred when trying to update a patient.",
    });
  }
};

export const handleDeletePatient = async (req: Request, res: Response) => {
  try {
    const patientId = req.params.patientId;

    const patient = await Paciente.findByIdAndDelete(patientId);

    if (!patient) {
      res.status(404).json({ message: "Not found." });
      return;
    }

    res.status(204).json({ message: "deleted" });
  } catch (error) {
    log.error("An error occurred when trying to delete a patient.");
    log.error(error);
    res.status(500).json({
      error: "An error occurred when trying to delete a patient.",
    });
  }
};

/* export default {
  handleCreatePatient,
  handleGetAllPatient,
  handleGetPatientById,
  handleUpdatePatient,
  handleDeletePatient,
}; */
