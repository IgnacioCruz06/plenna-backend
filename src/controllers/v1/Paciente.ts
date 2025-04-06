import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Paciente from "../../models/Paciente";
import { log } from "../../libraries/Log";

const handleCreatePatient = (req: Request, res: Response) => {
  try {
    const body = req.body;

    const patient = new Paciente({
      _id: new mongoose.Types.ObjectId(),
      firstName: body.firstName,
      lastName: body.lastName,
      birthDate: body.birthDate,
      gender: body.gender,
      contact: {
        email: body.contact,
        phone: body.phone,
        address: body.address,
      },
      medicalInfo: {
        bloodType: body.medicalInfo.bloodType, //optional
        allergies: body.medicalInfo.allergies, //optional string[]
        chronicDiseases: body.medicalInfo.chronicDiseases, //optional string[]
      },
    });

    patient.save();

    res.status(201).json({ message: "created", data: patient });
  } catch (error) {
    log.error("An error occurred when trying to create a new Patient.");
    log.error(error);
    res.status(500).json({
      error: "An error occurred when trying to create a new Patient.",
    });
  }
};

const handleGetPatientById = (req: Request, res: Response) => {
  try {
    const patientId = req.params.patientId;

    const patient = Paciente.findById(patientId);

    if (!patient) {
      res.status(404).json({ message: "Not found." });
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

const handleGetAllPatient = (_req: Request, res: Response) => {
  try {
    const patients = Paciente.find();

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

const handleUpdatePatient = (req: Request, res: Response) => {
  try {
    const patientId = req.params.patientId;
    const body = req.body;

    const patient = Paciente.findById(patientId);

    if (!patient) {
      res.status(404).json({ message: "Not found." });
    }

    patient.setUpdate(body); //TODO: complete this implementation

    res.status(200).json({ message: "ok", data: patient });
  } catch (error) {
    log.error("An error occurred when trying to update a patient.");
    log.error(error);
    res.status(500).json({
      error: "An error occurred when trying to update a patient.",
    });
  }
};

const handledeletePatient = (req: Request, res: Response) => {
  try {
    const patientId = req.params.patientId;

    const patient = Paciente.findByIdAndDelete(patientId);

    if (!patient) {
      res.status(404).json({ message: "Not found." });
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
