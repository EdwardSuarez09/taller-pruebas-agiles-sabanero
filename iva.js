const TARIFAS_IVA_PERMITIDAS = [0, 5, 19];

function calcularIVA(precio, tarifa, descuento = 0) {
  if (!Number.isFinite(precio) || precio < 0) {
    throw new Error('El precio debe ser un número mayor o igual a 0');
  }

  if (!TARIFAS_IVA_PERMITIDAS.includes(tarifa)) {
    throw new Error('La tarifa de IVA debe ser 0, 5 o 19');
  }

  if (!Number.isFinite(descuento) || descuento < 0 || descuento > 100) {
    throw new Error('El descuento debe estar entre 0 y 100');
  }

  const precioConDescuento = precio * (1 - descuento / 100);
  return Math.round((precioConDescuento * tarifa) / 100);
}

module.exports = { calcularIVA };