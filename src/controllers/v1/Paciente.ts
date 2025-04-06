import { Request, Response } from "express";
import mongoose from "mongoose";
import { log } from "../../libraries/Log";
import Paciente from "../../models/Paciente";
import { validateId } from "../../utils/validateId";

export const handleCreatePatient = async (req: Request, res: Response) => {
  try {
    const { body } = req;

    const patient = await new Paciente({
      _id: new mongoose.Types.ObjectId(),
      firstName: body.firstName,
      lastName: body.lastName,
      birthDate: body.birthDate,
      gender: body.gender,
      email: body.email,
      phone: body.phone,
      address: body.address,
      bloodType: body?.bloodType ?? "", //optional
      allergies: body?.allergies ?? [], //optional string[]
      chronicDiseases: body?.chronicDisease ?? [], //optional string[]
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
    validateId(req, res);
    const patientId = req.params.id;

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
    validateId(req, res);
    const patientId = req.params.id;
    const { body } = req;

    const patient = await Paciente.findByIdAndUpdate(
      patientId,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!patient) {
      res.status(404).json({ message: "Not found." });
      return;
    }

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
    validateId(req, res);
    const patientId = req.params.id;

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
