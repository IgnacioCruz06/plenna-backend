import { log } from "../libraries/Log";
import doctorsAvailabilityData from "../doctorsAvailability.json";

class DoctorService {
  public getDoctorsAvailability = async (): Promise<any> => {
    try {
      const schedules = await doctorsAvailabilityData.schedules;
      console.log(
        "🚀 ~ DoctorService ~ getDoctorsAvailability= ~ schedules:",
        schedules
      );

      const groupDataByDoctor = schedules.map((data) => {
        //const availability: { sourceEvent: string; dateTime: string }[] = [];
        const slotDates = data.slotdates.filter((dates) => dates?.slots);
        
        return {
          idDoctor: data.idDoctor,
          availabilityByDate: slotDates,
        };
      });
      console.log(
        "🚀 ~ DoctorService ~ getDoctorsAvailability= ~ groupDataByDoctor:",
        JSON.stringify(groupDataByDoctor)
      );
      return schedules;
    } catch (error) {
      log.info("DoctorService: Error when trying to get availability.");
      log.error(error);
      throw error;
    }
  };
}

const doctorService = new DoctorService();
export default doctorService;
