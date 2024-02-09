function validateMercosulPlate(plate: string) {
  const regexMercosulPlate = /^[a-zA-Z]{3}\d{1}[a-zA-Z0-9]{1}\d{2}$/;

  return regexMercosulPlate.test(plate);
}

export { validateMercosulPlate };
