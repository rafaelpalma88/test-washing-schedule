import { IAppointment } from '../types/appointment';

function sortedAppointments(appointments: IAppointment[]) {
  // Função para ordenar por data e hora
  const sortedAppointments = appointments.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    // Primeiro ordena pela data
    if (dateA > dateB) {
      return 1;
    } else if (dateA < dateB) {
      return -1;
    } else {
      // Se as datas forem iguais, ordena pelos horários
      const timeA = new Date(a.date).getTime(); // Obtém o timestamp
      const timeB = new Date(b.date).getTime(); // Obtém o timestamp

      return timeA - timeB;
    }
  });

  return sortedAppointments; // Retorna os compromissos ordenados
}

export { sortedAppointments };
