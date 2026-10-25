function calcularPuntos(total, categoria) {
  if (!Number.isFinite(total) || total < 0) {
    throw new Error('El total debe ser un número mayor o igual a 0');
  }

  return Math.floor(total / 1000);
}

module.exports = { calcularPuntos };