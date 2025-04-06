import express from "express";
import doctorController from "../controllers/v1/Doctor";

const doctorRouter = express.Router();

doctorRouter.get(
  "/doctors/availability",
  doctorController.handleDoctorsAvailability
);

export default doctorRouter;
