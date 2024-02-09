export type IAppointment = {
  id: string;
  plate: string;
  type: 'SIMPLES' | 'COMPLETA';
  date: Date;
  status: 'EM_ABERTO' | 'CONCLUIDO';
};
