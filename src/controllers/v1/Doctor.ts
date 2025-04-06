import { Request, Response } from "express";
import { log } from "../../libraries/Log";
import doctorService from "../../services/DoctorService";
import { Controller } from "../../libraries/Controller";

class DoctorController {
  public handleDoctorsAvailability = async (
    _req: Request,
    res: Response
  ): Promise<any> => {
    try {
      const availability = await doctorService.getDoctorsAvailability();

      return Controller.ok(res, availability);
    } catch (error) {
      log.info("Error trying to get doctors availability.");
      Controller.serverError(res, error);
    }
  };
}

const doctorController = new DoctorController();
export default doctorController;
