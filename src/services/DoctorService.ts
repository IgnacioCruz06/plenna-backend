import { log } from "../libraries/Log";

interface Slot {
  sourceEvent: string;
  dateTime: string;
}

type DoctorAvailability = {
  idDoctor: string;
  availabilityByDate: Slot[];
};

class DoctorService {
  private assignDuplicatesRandomly(
    data: DoctorAvailability[],
    duplicates: Record<string, string[]>
  ): DoctorAvailability[] {
    const assignments: Record<string, string> = {};

    // Select a doctor per each duplicated datetime randomly
    for (const [dateTime, doctorIds] of Object.entries(duplicates)) {
      const totalAssigmentsByDoctor = Object.values(assignments);

      // First assigment
      if (!totalAssigmentsByDoctor.length) {
        const randomDoctor = doctorIds[0];
        assignments[dateTime] = randomDoctor;
      } else {
        // In order to ensure a fair assignment for each doctor, in each assignment we review which of the doctors who have the same schedule have fewer assignments in this duplicate process.
        const findTotalAssigmentsBydoctor = doctorIds.map((doctorId) => {
          return {
            assignments: totalAssigmentsByDoctor.filter((id) => id === doctorId)
              .length,
            doctorId: doctorId,
          };
        });
        // Sort data by the one with the fewest assignments
        findTotalAssigmentsBydoctor.sort(
          (a, b) => a.assignments - b.assignments
        );
        assignments[dateTime] = findTotalAssigmentsBydoctor[0].doctorId;
      }
    }

    // Filter not assigned dates by doctor
    const result = data.map((doctor) => {
      const filteredAvailability = doctor.availabilityByDate.filter((slot) => {
        const assignedDoctor = assignments[slot.dateTime];
        // If slot is not duplicated or is assigned to this doctor then we keep it
        return !assignedDoctor || assignedDoctor === doctor.idDoctor;
      });

      return {
        ...doctor,
        availabilityByDate: filteredAvailability,
      };
    });

    return result;
  }

  private findDuplicatedDateTimes(
    data: DoctorAvailability[]
  ): Record<string, string[]> {
    const dateTimeToDoctors: Record<string, string[]> = {};

    data.forEach((doctor) => {
      doctor.availabilityByDate.forEach(({ dateTime }) => {
        if (!dateTimeToDoctors[dateTime]) {
          dateTimeToDoctors[dateTime] = [];
        }
        dateTimeToDoctors[dateTime].push(doctor.idDoctor);
      });
    });

    // Filter duplicated dates only (assigned to more than 1 doctor)
    const duplicates: Record<string, string[]> = {};
    for (const [dateTime, doctorIds] of Object.entries(dateTimeToDoctors)) {
      if (doctorIds.length > 1) {
        duplicates[dateTime] = doctorIds;
      }
    }

    return duplicates;
  }

  public getDoctorsAvailability = async (schedules): Promise<any> => {
    try {
      const groupDataByDoctor = schedules.map((data) => {
        const slotDates = data.slotdates.filter((dates) => dates?.slots);
        const joinedSlots = slotDates.map((a) => a.slots).flat();

        return {
          idDoctor: data.idDoctor,
          availabilityByDate: joinedSlots,
        };
      });

      const duplicates = this.findDuplicatedDateTimes(groupDataByDoctor);

      //TODO: review the criteria to assign duplicate randomly in order to improve it according business logic
      const slotsWithoutDuplicates = this.assignDuplicatesRandomly(
        groupDataByDoctor,
        duplicates
      );

      return slotsWithoutDuplicates;
    } catch (error) {
      log.info("DoctorService: Error when trying to get availability.");
      log.error(error);
      throw error;
    }
  };
}

const doctorService = new DoctorService();
export default doctorService;
