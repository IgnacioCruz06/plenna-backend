import mongoose, { Document, Schema } from "mongoose";

export interface IConsultaMedica {
  patientId: mongoose.Types.ObjectId;
  date: Date;
  reason: string;
  diagnosis: string;
  treatment: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IConsultaMedicateModel extends IConsultaMedica, Document {}

const ConsultaMedicaSchema: Schema = new Schema(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    date: { type: Date, required: true },
    reason: { type: String, required: true },
    diagnosis: { type: String },
    treatment: { type: String },
    notes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IConsultaMedicateModel>(
  "ConsultaMedica",
  ConsultaMedicaSchema
);
