import Joi from "joi";
import { IPaciente } from "../models/Paciente";

export const CreatePacienteSchema = Joi.object<IPaciente>({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  birthDate: Joi.date().required(),
  gender: Joi.string().valid("F", "M", "Other").required(),
  email: Joi.string().email().required(),
  phone: Joi.string().length(10).required(),
  address: Joi.string().optional().allow(""), //TODO: check if it could accept null values
  bloodType: Joi.string().required(),
  allergies: Joi.array().items(Joi.string().optional()),
  chronicDiseases: Joi.array().items(Joi.string().optional()),
});

export const UpdatePacienteSchema = Joi.object<IPaciente>({
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  birthDate: Joi.date().optional(),
  gender: Joi.string().valid("F", "M", "Other").optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().length(10).optional(),
  address: Joi.string().optional(),
  bloodType: Joi.string().optional(),
  allergies: Joi.array().items(Joi.string().optional()),
  chronicDiseases: Joi.array().items(Joi.string().optional()),
});
