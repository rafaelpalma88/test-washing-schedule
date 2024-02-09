function formatTime(date: Date) {
  console.log('XXXXXXXXX ', typeof date);
  const hora = date.getHours();
  const minutos = date.getMinutes();

  // Formatar a hora e os minutos para garantir que tenham sempre dois dígitos
  const horaFormatada = hora < 10 ? `0${hora}` : hora;
  const minutosFormatados = minutos < 10 ? `0${minutos}` : minutos;

  // Retornar a hora formatada no formato 'hh:mm'
  return `${horaFormatada}:${minutosFormatados}`;
}

export { formatTime };
