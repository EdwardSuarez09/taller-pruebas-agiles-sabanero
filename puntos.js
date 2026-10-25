function calcularPuntos(total, categoria) {
  if (!Number.isFinite(total) || total < 0) {
    throw new Error('El total debe ser un número mayor o igual a 0');
  }

  if (categoria !== 'ESTANDAR' && categoria !== 'ORO') {
    throw new Error('La categoría debe ser ESTANDAR u ORO');
  }

  const puntosBase = Math.floor(total / 1000);
  if (categoria === 'ORO') {
    return puntosBase * 2;
  }

  return puntosBase;
}

module.exports = { calcularPuntos };