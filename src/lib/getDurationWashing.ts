function getDurationWashing(type: 'SIMPLES' | 'COMPLETA') {
  let duration: any;

  if (type === 'SIMPLES') {
    duration = 30;
  } else if (type === 'COMPLETA') {
    duration = 45;
  }

  return duration || 0;
}

export { getDurationWashing };
