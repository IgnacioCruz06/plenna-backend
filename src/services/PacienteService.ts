import mongoose from "mongoose";
import { log } from "../libraries/Log";
import Paciente, { IPaciente, IPacienteModel } from "../models/Paciente";

class PatientService {
  public createNewPatient = async (
    body: Partial<IPaciente>
  ): Promise<IPacienteModel> => {
    try {
      const patient = await new Paciente({
        _id: new mongoose.Types.ObjectId(),
        firstName: body.firstName,
        lastName: body.lastName,
        birthDate: body.birthDate,
        gender: body.gender,
        email: body.email,
        phone: body.phone,
        address: body?.address ?? "", //optional
        bloodType: body.bloodType,
        allergies: body?.allergies ?? [], //optional string[]
        chronicDiseases: body?.chronicDiseases ?? [], //optional string[]
      });

      patient.save();

      return patient;
    } catch (error) {
      log.error(error);
      throw error;
    }
  };

  public getAllPatients = async (): Promise<IPacienteModel[]> => {
    try {
      const patients = await Paciente.find();

      if (!patients) {
        return [];
      }

      return patients;
    } catch (error) {
      log.error(error);
      throw error;
    }
  };

  public getPatientById = async (
    id: string
  ): Promise<IPacienteModel | null> => {
    try {
      const patient = await Paciente.findById(id);

      if (!patient) {
        return null;
      }

      return patient;
    } catch (error) {
      log.error(error);
      throw error;
    }
  };

  public updatePatient = async (
    id: string,
    body: Partial<IPaciente>
  ): Promise<IPacienteModel | null> => {
    try {
      const patient = Paciente.findByIdAndUpdate(
        id,
        { $set: body },
        { new: true, runValidators: true }
      );

      if (!patient) {
        return null;
      }

      return patient;
    } catch (error) {
      log.error(error);
      throw error;
    }
  };

  public deletePatientById = async (
    id: string
  ): Promise<IPacienteModel | null> => {
    try {
      const patient = await Paciente.findByIdAndDelete(id);

      if (!patient) {
        return null;
      }

      return patient;
    } catch (error) {
      log.error(error);
      throw error;
    }
  };
}

const patientService = new PatientService();
export default patientService;
