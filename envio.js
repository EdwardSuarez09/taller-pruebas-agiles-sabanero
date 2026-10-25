function calcularEnvio(municipio, valorProductosConIVA) {
  if (typeof municipio !== 'string' || municipio.trim() === '') {
    throw new Error('El municipio es obligatorio');
  }

  if (!Number.isFinite(valorProductosConIVA) || valorProductosConIVA < 0) {
    throw new Error(
      'El valor de los productos con IVA debe ser un número mayor o igual a 0'
    );
  }

  if (valorProductosConIVA >= 150000) {
    return 0;
  }

  if (municipio.trim() === 'Sincelejo') {
    return 8000;
  }

  return 15000;
}

module.exports = { calcularEnvio };