function calcularDescuentoVolumen(subtotal) {
  if (!Number.isFinite(subtotal) || subtotal < 0) {
    throw new Error('El subtotal debe ser un número mayor o igual a 0');
  }

  let tarifa = 0;
  if (subtotal >= 500000) {
    tarifa = 10;
  } else if (subtotal >= 200000) {
    tarifa = 5;
  }

  const descuento = (subtotal * tarifa) / 100;

  return {
    tarifa,
    descuento,
    totalConDescuento: subtotal - descuento,
  };
}

module.exports = { calcularDescuentoVolumen };
