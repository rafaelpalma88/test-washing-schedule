function formatDate(date: Date): string {
  if (!date) return '';

  const dia = date.getDate();
  const mes = date.getMonth() + 1; // Lembrando que os meses começam de 0, então é necessário adicionar 1
  const ano = date.getFullYear();

  // Formatar o dia e o mês para garantir que tenham sempre dois dígitos
  const diaFormatado = dia < 10 ? `0${dia}` : dia;
  const mesFormatado = mes < 10 ? `0${mes}` : mes;

  // Retornar a data formatada no formato 'dd/mm/aaaa'
  return `${diaFormatado}/${mesFormatado}/${ano}`;
}

export { formatDate };
