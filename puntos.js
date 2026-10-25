const PESOS_POR_PUNTO = 1000;
const MULTIPLICADOR_POR_CATEGORIA = new Map([
  ['ESTANDAR', 1],
  ['ORO', 2],
]);

function calcularPuntos(total, categoria) {
  if (!Number.isFinite(total) || total < 0) {
    throw new Error('El total debe ser un número mayor o igual a 0');
  }

  const multiplicador = MULTIPLICADOR_POR_CATEGORIA.get(categoria);
  if (multiplicador === undefined) {
    throw new Error('La categoría debe ser ESTANDAR u ORO');
  }

  return Math.floor(total / PESOS_POR_PUNTO) * multiplicador;
}

module.exports = { calcularPuntos };