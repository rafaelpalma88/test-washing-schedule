function checkEligibilitySchedule(date: Date, type: 'SIMPLES' | 'COMPLETA') {
  const dayOfTheWeek = date.getDay();

  if (dayOfTheWeek === 0 || dayOfTheWeek === 6) {
    throw new Error('Não é possivel fazer agendamentos no sábado ou domingo');
  }

  const hour = date.getHours();

  if (hour === 12) {
    throw new Error(
      'Não é possivel fazer agendamentos no horário do almoço (12 as 13hs)',
    );
  }

  if (hour >= 18 && hour < 10) {
    throw new Error(
      'Não é possivel fazer agendamentos antes das 10hs e depois das 18hs',
    );
  }

  let duration: any;

  if (type === 'SIMPLES') {
    duration = 30;
  } else if (type === 'COMPLETA') {
    duration = 45;
  }

  const hourWithSum = new Date(date.getTime() + duration * 60000);

  if (hourWithSum.getHours() >= 18) {
    throw new Error(
      'Não é possivel fazer um agendamento que ultrapasse as 18hs do fim do expediente',
    );
  }

  if (hourWithSum.getHours() >= 12 && hourWithSum.getHours() < 13) {
    throw new Error(
      'Não é possivel fazer um agendamento que ocorra no horário de almoço',
    );
  }
}

export { checkEligibilitySchedule };
