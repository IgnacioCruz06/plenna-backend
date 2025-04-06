import mongoose, { Document, Schema } from "mongoose";

export interface IPaciente {
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  medicalInfo: {
    bloodType?: string;
    allergies?: string[];
    chronicDiseases?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface IPacienteModel extends IPaciente, Document {}

const PacienteSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    gender: { type: String, enum: ["F", "M", "Other"], required: true },
    contact: {
      email: { type: String, required: true },
      phone: { type: String },
      address: { type: String },
    },
    medicalInfo: {
      bloodType: String,
      allergies: [String],
      chronicDiseases: [String],
    },
  },
  { timestamps: true }
);

export default mongoose.model<IPacienteModel>("Paciente", PacienteSchema);
