import { IAppointment } from '../types/appointment';
import { getDurationWashing } from './getDurationWashing';

function checkAlreadyExistentSchedule(
  appointments: IAppointment[],
  appointment: IAppointment,
): void {
  const appointmentInitialTime = appointment.date.getTime();
  const appointmentFinalTime =
    appointmentInitialTime + getDurationWashing(appointment.type);

  // Verifica se há algum compromisso já agendado que se sobrepõe ao novo compromisso
  const overlappingAppointments = appointments.filter(item => {
    const itemInitialTime = item.date.getTime();
    const itemFinalTime = itemInitialTime + getDurationWashing(item.type);

    // Verifica se o novo compromisso se sobrepõe ao compromisso atual
    return (
      (appointmentInitialTime >= itemInitialTime &&
        appointmentInitialTime < itemFinalTime) ||
      (appointmentFinalTime > itemInitialTime &&
        appointmentFinalTime <= itemFinalTime) ||
      (appointmentInitialTime <= itemInitialTime &&
        appointmentFinalTime >= itemFinalTime)
    );
  });

  // Retorna true se houver algum compromisso que se sobreponha ao novo compromisso
  if (overlappingAppointments.length != 0) {
    throw new Error('Este horário já possui um agendamento');
  }
}

export { checkAlreadyExistentSchedule };
